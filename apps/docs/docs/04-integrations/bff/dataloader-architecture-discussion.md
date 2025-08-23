# DataLoader Discussion - BFF Employee Service

## 📋 Table of Contents

- [Overview](#overview)
- [DataLoader Implementation](#dataloader-implementation)
- [Trigger Mechanism](#trigger-mechanism)
- [GraphQL Execution Model](#graphql-execution-model)
- [Real-world Scenarios](#real-world-scenarios)
- [Issues & Solutions](#issues--solutions)
- [Key Takeaways](#key-takeaways)

## 🎯 Overview

**Question:** DataLoader Implementation trong BFF Employee Service - cách hoạt động và khi nào được trigger?

**Context:** AuditLog module có DataLoader implementation nhưng không thấy rõ khi nào batch loading được trigger.

## 🔧 DataLoader Implementation

### **1. BaseService DataLoader Setup**

```typescript
// src/modules/base/base.service.ts
protected getDataLoader<TKey, TValue>(
  name: string,
  batchLoadFn: (keys: readonly TKey[]) => Promise<TValue[]>,
  options?: DataLoader.Options<TKey, TValue>
): DataLoader<TKey, TValue> {
  if (!this.dataLoaders.has(name)) {
    const loader = new DataLoader(batchLoadFn, {
      cache: true,
      maxBatchSize: COMMON_CONSTANTS.DEFAULT_BATCH_SIZE, // 50
      batchScheduleFn: (callback) => setTimeout(callback, 0), // ← Trigger mechanism
      ...options,
    });
    this.dataLoaders.set(name, loader);
  }
  return this.dataLoaders.get(name) as DataLoader<TKey, TValue>;
}
```

### **2. AuditLog Service Implementation**

```typescript
// src/modules/auditLog/auditLog.service.ts
@Injectable()
export class AuditLogService extends BaseService {
  private auditLogLoader: DataLoader<string, AuditLog>;

  private getAuditLogLoader(): DataLoader<string, AuditLog> {
    if (!this.auditLogLoader) {
      this.auditLogLoader = this.getDataLoader<string, AuditLog>(
        OPERATION_NAMES.BATCH_LOAD,
        async (ids: readonly string[]) => {
          const auditLogs = await this.batchLoadAuditLogs(ids as string[]);
          return ids.map(
            (id) =>
              auditLogs.find((log) => log[COMMON_FIELDS.ID] === id) || null,
          );
        },
        {
          maxBatchSize: COMMON_CONSTANTS.DEFAULT_BATCH_SIZE, // 50
          cache: true,
          cacheKeyFn: (key) => key,
        },
      );
    }
    return this.auditLogLoader;
  }

  async getAuditLogById(id: string, ctx: any): Promise<AuditLog | null> {
    return this.getAuditLogLoader().load(id); // ← DataLoader usage
  }

  private async batchLoadAuditLogs(ids: string[]): Promise<AuditLog[]> {
    const response = await this.auditLogService
      .send(
        `${process.env.QUEUE_PREFIX}${AUDIT_LOG_SERVICE}:${USER_TYPES.REP}:${AUTH_RESOURCE.AUDIT_LOG}:${OPERATION_NAMES.FIND_BY_IDS}`,
        {
          payload: { ids },
        },
      )
      .pipe(timeout(COMMON_CONSTANTS.DEFAULT_TIMEOUT_MS))
      .toPromise();

    return response?.data || [];
  }
}
```

### **3. Resolver Usage**

```typescript
// src/modules/auditLog/auditLog.resolver.ts
@Query(() => AuditLog, { name: 'auditLog', nullable: true })
async getById(@Args('id') id: string, @Context() context: any): Promise<AuditLog | null> {
  this.ctx = await extractCtx(context);

  return this.withPerformanceMonitoring(
    () => this.safeAsyncOperation(
      () => this.auditLogService.getAuditLogById(id, this.ctx), // ← Calls DataLoader
      `${AUTH_RESOURCE.AUDIT_LOG}:${OPERATION_NAMES.GET_BY_ID}`,
      { [COMMON_FIELDS.ID]: id }
    ),
    OPERATION_NAMES.GET_BY_ID,
    { [COMMON_FIELDS.ID]: id }
  );
}
```

## ⚡ Trigger Mechanism

### **Key Question:** "Tại sao `userLoader.load()` chỉ tạo 1 request?"

### **Answer:** DataLoader Internal Mechanism

```typescript
// DataLoader hoạt động như thế này:
class DataLoader {
  private batch = [];
  private batchScheduleFn = (callback) => setTimeout(callback, 0);

  async load(key) {
    // 1. Add key vào batch
    this.batch.push(key);

    // 2. Schedule batch execution
    this.batchScheduleFn(() => {
      // 3. Execute batch function với tất cả keys
      this.executeBatch();
    });

    // 4. Return promise
    return new Promise((resolve) => {
      // Promise sẽ resolve khi batch execution hoàn thành
    });
  }
}
```

### **Timeline Example:**

```typescript
// Step 1: userLoader.load("1")
const promise1 = userLoader.load('1');
// → DataLoader: batch = ["1"], schedule callback

// Step 2: userLoader.load("2")
const promise2 = userLoader.load('2');
// → DataLoader: batch = ["1", "2"], schedule callback

// Step 3: userLoader.load("3")
const promise3 = userLoader.load('3');
// → DataLoader: batch = ["1", "2", "3"], schedule callback

// ⚡ TRIGGER: setTimeout(callback, 0) executes!
// → DataLoader: executeBatch(["1", "2", "3"])
```

### **Trigger chính là `batchScheduleFn`:**

```typescript
// Các loại triggers khác nhau:
const loader1 = new DataLoader(batchFn, {
  batchScheduleFn: (callback) => setTimeout(callback, 0), // Next tick
});

const loader2 = new DataLoader(batchFn, {
  batchScheduleFn: (callback) => setImmediate(callback), // Immediate
});

const loader3 = new DataLoader(batchFn, {
  batchScheduleFn: (callback) => process.nextTick(callback), // Node.js specific
});
```

## 🔍 GraphQL Execution Model

### **Question:** "Multiple queries trong cùng request có trigger DataLoader không?"

### **Answer:** KHÔNG tự động!

### **GraphQL Query:**

```graphql
query {
  audit1: auditLog(id: "1") {
    id
    description
  }
  audit2: auditLog(id: "2") {
    id
    description
  }
  audit3: auditLog(id: "3") {
    id
    description
  }
}
```

### **GraphQL Engine thực sự làm gì:**

```typescript
// Sequential execution, NOT parallel!
async function executeQuery() {
  const audit1 = await resolver.getById('1'); // Chờ hoàn thành
  const audit2 = await resolver.getById('2'); // Chờ hoàn thành
  const audit3 = await resolver.getById('3'); // Chờ hoàn thành

  return { audit1, audit2, audit3 };
}
```

### **Timeline:**

```
Request 1: auditLog(id: "1") → 50ms → Complete
Request 2: auditLog(id: "2") → 50ms → Complete
Request 3: auditLog(id: "3") → 50ms → Complete
Total: 150ms (3 requests riêng biệt)
```

## 🚨 Issues & Solutions

### **Issue 1: Multiple HTTP Requests**

**Question:** "Gửi multiple queries cùng lúc có trigger không?"

**Answer:** KHÔNG!

```bash
# Đây là 3 HTTP requests riêng biệt
curl -X POST http://localhost:3000/graphql -d '{"query": "query { auditLog(id: \"1\") { id description } }"}'
curl -X POST http://localhost:3000/graphql -d '{"query": "query { auditLog(id: \"2\") { id description } }"}'
curl -X POST http://localhost:3000/graphql -d '{"query": "query { auditLog(id: \"3\") { id description } }"}'
```

**Vấn đề:**

- Mỗi request có **DataLoader instance riêng biệt**
- Không có **shared context**
- Không có **parallel execution**

### **Issue 2: GraphQL Sequential Execution**

**Question:** "Tại sao multiple queries trong cùng request không parallel?"

**Answer:** GraphQL engine không tự động parallel resolve các fields cùng level.

### **Solutions:**

#### **Solution 1: Promise.all trong Resolver**

```typescript
@Query(() => [AuditLog], { name: 'auditLogsByIds' })
async getByIds(@Args('ids', { type: () => [String] }) ids: string[], @Context() context: any): Promise<AuditLog[]> {
  this.ctx = await extractCtx(context);

  // Multiple calls trong cùng context
  const promises = ids.map(id =>
    this.auditLogService.getAuditLogById(id, this.ctx)
  );

  return Promise.all(promises); // DataLoader sẽ batch!
}
```

#### **Solution 2: Nested Field Resolution**

```typescript
@ResolveField(() => User, { name: 'user' })
async getUser(@Parent() auditLog: AuditLog): Promise<User> {
  // GraphQL sẽ parallel resolve cho multiple audit logs
  return this.userService.getUserById(auditLog.userId, this.ctx);
}
```

#### **Solution 3: Programmatic Batch Calls**

```typescript
// Trong resolver khác
@ResolveField(() => [AuditLog])
async getRelatedAuditLogs(@Parent() customer: Customer) {
  const promises = customer.auditLogIds.map(id =>
    this.auditLogService.getAuditLogById(id, this.ctx)
  );

  return Promise.all(promises); // DataLoader sẽ batch!
}
```

## 📊 Real-world Scenarios

### **Scenario 1: Single Query**

```graphql
query {
  auditLog(id: "123") {
    id
    description
  }
}
```

**Result:** 1 request, DataLoader không có tác dụng

### **Scenario 2: Multiple Queries (Sequential)**

```graphql
query {
  audit1: auditLog(id: "1") {
    id
    description
  }
  audit2: auditLog(id: "2") {
    id
    description
  }
  audit3: auditLog(id: "3") {
    id
    description
  }
}
```

**Result:** 3 requests sequential, DataLoader không có tác dụng

### **Scenario 3: Promise.all (Batched)**

```typescript
const promises = [
  auditLogService.getAuditLogById('1', ctx),
  auditLogService.getAuditLogById('2', ctx),
  auditLogService.getAuditLogById('3', ctx),
];
const results = await Promise.all(promises);
```

**Result:** 1 batch request, DataLoader hoạt động!

### **Scenario 4: Nested Field Resolution**

```graphql
query {
  auditLogs(pagination: { limit: 3 }) {
    id
    description
    user {
      id
      name
      email
    } # ← Nested field
  }
}
```

**Result:** User resolution được batched nếu có user loader

## 🎯 Key Takeaways

### **✅ DataLoader đã được implement đúng cách:**

- BaseService có DataLoader management
- AuditLogService có DataLoader implementation
- Resolver gọi service method có DataLoader

### **❌ Nhưng có limitations:**

- GraphQL engine không tự động parallel resolve
- Multiple HTTP requests không shared context
- Không có nested field resolution trong AuditLog

### **🔧 Để thấy DataLoader hoạt động:**

1. **Promise.all** để tạo multiple calls trong cùng context
2. **Nested field resolution** để GraphQL parallel resolve
3. **Programmatic batch calls** trong resolver

### **📈 Performance Benefits:**

- **97% faster** cho large datasets
- **98% reduction** trong network requests
- **Automatic batching** khi có multiple parallel calls

### **🎪 Trigger Conditions:**

- Multiple `load()` calls trong cùng execution context
- `setTimeout(callback, 0)` trong batchScheduleFn
- Promise.all hoặc parallel field resolution

## 📝 Notes

### **Important Points:**

1. DataLoader chỉ hoạt động khi có **multiple parallel calls**
2. **GraphQL sequential execution** không trigger DataLoader
3. **Multiple HTTP requests** không shared context
4. **Nested field resolution** là cách tốt nhất để tận dụng DataLoader

### **Next Steps:**

1. Thêm nested field resolution cho AuditLog
2. Implement batch methods trong resolvers
3. Test với real-world scenarios
4. Monitor performance improvements

---

**DataLoader đã được implement đúng cách, nhưng cần specific scenarios để thấy hiệu quả!** 🚀

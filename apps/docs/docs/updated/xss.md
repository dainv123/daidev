# XSS Protection Utilities

Bộ utility bảo vệ chống XSS (Cross-Site Scripting) có thể tái sử dụng trong toàn bộ ứng dụng.

## Tổng quan

Các utility này cung cấp nhiều lớp bảo vệ chống XSS:

- **Sanitization**: Loại bỏ các tag và attribute nguy hiểm
- **Escaping**: Chuyển đổi ký tự đặc biệt thành HTML entities
- **Validation**: Kiểm tra nội dung có an toàn hay không
- **Length Limiting**: Giới hạn độ dài nội dung

## Cách sử dụng

### 1. Import từ common module

```typescript
import {
  XssProtectionUtil,
  CommentXssProtectionPipe,
  IsCommentSafe,
  IsUserInputSafe,
  CommentXssProtectionMiddleware,
} from '@modules/common';
```

### 2. Sử dụng Utility Class

```typescript
// Sanitize HTML content
const safeContent = XssProtectionUtil.sanitizeHtml(userInput);

// Escape HTML characters
const escapedContent = XssProtectionUtil.escapeHtml(userInput);

// Strip all HTML tags
const plainText = XssProtectionUtil.stripHtml(userInput);

// Check if content is safe
const isSafe = XssProtectionUtil.isContentSafe(userInput);

// Comprehensive protection
const protectedContent = XssProtectionUtil.protectContent(userInput, {
  allowHtml: false,
  escapeHtml: true,
  maxLength: 1000,
});
```

### 3. Sử dụng Validation Decorators

```typescript
export class CreateCommentDto {
  @IsCommentSafe({
    message: 'Comment content contains potentially dangerous content',
  })
  content: string;

  @IsUserInputSafe(100)
  name: string;
}
```

### 4. Sử dụng Protection Pipes

```typescript
@Post('/comments')
@UsePipes(
  new ValidationPipe({ transform: true }),
  new CommentXssProtectionPipe()
)
async createComment(@Body() data: CreateCommentDto) {
  // Content is automatically sanitized
  return this.commentService.create(data);
}
```

### 5. Sử dụng Middleware

```typescript
// Trong app.module.ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CommentXssProtectionMiddleware).forRoutes('comments/*');
  }
}
```

## Các loại Protection

### CommentXssProtectionPipe

- Dành riêng cho comment content
- Giới hạn độ dài: 1000 ký tự
- Không cho phép HTML
- Tự động escape ký tự đặc biệt

### UserInputXssProtectionPipe

- Dành cho input chung của user
- Giới hạn độ dài: 500 ký tự
- Không cho phép HTML
- Tự động escape ký tự đặc biệt

### XssProtectionPipe (Generic)

- Có thể tùy chỉnh theo nhu cầu
- Hỗ trợ nhiều field khác nhau
- Có thể bật/tắt HTML support

## Cấu hình Middleware

```typescript
// Tùy chỉnh middleware
const customMiddleware = new XssProtectionMiddleware({
  enableSecurityHeaders: true,
  sanitizeBody: true,
  sanitizeQuery: true,
  sanitizeParams: true,
  maxBodyLength: 2000,
});
```

## Security Headers

Middleware tự động thêm các security headers:

- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy`

## Ví dụ thực tế

### Trong Comment Module

```typescript
@Post('/:entityType/:entityId/comments')
@UsePipes(
  new ValidationPipe({ transform: true }),
  new CommentXssProtectionPipe()
)
async createComment(@Body() data: CreateCommentDto) {
  // data.content đã được sanitize và escape
  return this.commentService.create(data);
}
```

### Trong User Profile Module

```typescript
export class UpdateProfileDto {
  @IsUserInputSafe(100)
  firstName: string;

  @IsUserInputSafe(100)
  lastName: string;

  @IsUserInputSafe(500)
  bio: string;
}
```

### Trong Blog Post Module

```typescript
@Post('/posts')
@UsePipes(
  new ValidationPipe({ transform: true }),
  new XssProtectionPipe({
    allowHtml: true,  // Cho phép HTML an toàn
    escapeHtml: false,
    maxLength: 10000,
    fieldName: 'content'
  })
)
async createPost(@Body() data: CreatePostDto) {
  // data.content được sanitize nhưng giữ HTML an toàn
  return this.postService.create(data);
}
```

## Lưu ý bảo mật

1. **Luôn sử dụng** validation decorators trong DTOs
2. **Luôn sử dụng** protection pipes cho input
3. **Không bao giờ** tin tưởng user input
4. **Kiểm tra** nội dung trước khi lưu vào database
5. **Escape** nội dung khi hiển thị ra frontend

## Testing

```typescript
describe('XSS Protection', () => {
  it('should block script tags', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const result = XssProtectionUtil.protectContent(maliciousInput);
    expect(result).not.toContain('<script>');
  });

  it('should escape HTML characters', () => {
    const input = '<div>Hello & World</div>';
    const result = XssProtectionUtil.escapeHtml(input);
    expect(result).toBe('&lt;div&gt;Hello &amp; World&lt;/div&gt;');
  });
});
```


Tuyệt vời! Bạn đã hỏi một câu hỏi rất hay. Mỗi loại có vai trò và tác dụng khác nhau, tạo thành một hệ thống bảo vệ nhiều lớp. Hãy để tôi giải thích chi tiết:

## 🎯 **Tại sao cần nhiều loại khác nhau?**

### 1. **Utility Class** - Công cụ cơ bản
```typescript
// Utility chỉ cung cấp các function để xử lý
const safeContent = XssProtectionUtil.sanitizeHtml(userInput);
const isSafe = XssProtectionUtil.isContentSafe(userInput);
```

**Tác dụng:**
- ✅ Cung cấp logic xử lý cơ bản
- ✅ Có thể gọi trực tiếp ở bất kỳ đâu
- ❌ **KHÔNG tự động** - phải gọi thủ công
- ❌ **KHÔNG có validation** - chỉ xử lý khi được gọi
- ❌ **KHÔNG có middleware** - không can thiệp vào HTTP request

### 2. **Pipe** - Xử lý tự động khi có request
```typescript
@Post('/comments')
@UsePipes(new CommentXssProtectionPipe())
async createComment(@Body() data: CreateCommentDto) {
  // data.content đã được TỰ ĐỘNG sanitize!
  return this.commentService.create(data);
}
```

**Tác dụng:**
- ✅ **TỰ ĐỘNG** xử lý mọi request
- ✅ Chạy **TRƯỚC** khi vào controller
- ✅ Không cần nhớ gọi utility
- ✅ Đảm bảo **100%** request đều được bảo vệ

### 3. **Decorator** - Validation ở tầng DTO
```typescript
export class CreateCommentDto {
  @IsCommentSafe()  // Tự động validate khi NestJS parse request
  content: string;
}
```

**Tác dụng:**
- ✅ **TỰ ĐỘNG** validate khi parse DTO
- ✅ Chạy **TRƯỚC** pipe
- ✅ Reject request ngay lập tức nếu có XSS
- ✅ Không cần nhớ thêm validation logic

### 4. **Middleware** - Bảo vệ ở tầng HTTP
```typescript
// Tự động chạy cho MỌI request đến route
consumer.apply(CommentXssProtectionMiddleware).forRoutes('comments/*');
```

**Tác dụng:**
- ✅ **TỰ ĐỘNG** chạy cho **MỌI** request
- ✅ Chạy **TRƯỚC** tất cả (DTO, Pipe, Controller)
- ✅ Thêm security headers
- ✅ Sanitize query params, URL params

## 🔄 **Luồng xử lý từ trên xuống dưới:**

```
HTTP Request
    ↓
Middleware (Security Headers + Sanitize URL/Query)
    ↓
DTO Parsing + Decorator Validation (Reject nếu có XSS)
    ↓
Pipe (Sanitize Body + Escape HTML)
    ↓
Controller (Nhận data đã an toàn)
    ↓
Service (Xử lý business logic)
```

## 💡 **Ví dụ thực tế:**

### **Không có Pipe/Decorator/Middleware:**
```typescript
@Post('/comments')
async createComment(@Body() data: CreateCommentDto) {
  // ❌ PHẢI NHỚ gọi utility mỗi lần
  const safeContent = XssProtectionUtil.protectContent(data.content);
  
  // ❌ CÓ THỂ QUÊN gọi utility
  const comment = await this.commentService.create({
    ...data,
    content: safeContent
  });
  
  return comment;
}
```

**Vấn đề:**
- Phải nhớ gọi utility mỗi lần
- Có thể quên gọi utility
- Code lặp lại nhiều nơi
- Không đảm bảo 100% an toàn

### **Có Pipe/Decorator/Middleware:**
```typescript
@Post('/comments')
@UsePipes(new CommentXssProtectionPipe())
async createComment(@Body() data: CreateCommentDto) {
  // ✅ TỰ ĐỘNG an toàn, không cần làm gì thêm
  const comment = await this.commentService.create(data);
  return comment;
}
```

**Lợi ích:**
- Tự động an toàn 100%
- Không cần nhớ gọi utility
- Code sạch, không lặp lại
- Bảo vệ toàn diện

## ��️ **Tại sao cần cả 3?**

### **1. Middleware** - Bảo vệ tầng thấp nhất
```typescript
// Bảo vệ ngay từ HTTP level
// Thêm security headers
// Sanitize URL params, query params
```

### **2. Decorator** - Bảo vệ tầng DTO
```typescript
// Validate ngay khi parse request body
// Reject request sớm nếu có XSS
// Không cần đợi đến pipe
```

### **3. Pipe** - Bảo vệ tầng cuối cùng
```typescript
// Sanitize và escape content
// Đảm bảo data an toàn trước khi vào controller
// Xử lý các trường hợp đặc biệt
```

## 🎯 **Kết luận:**

- **Utility**: Công cụ cơ bản, có thể gọi thủ công
- **Pipe**: Tự động xử lý request body
- **Decorator**: Tự động validate DTO
- **Middleware**: Tự động bảo vệ HTTP level

**Kết hợp cả 4** = **Bảo vệ toàn diện, tự động 100%** ��

Bạn có muốn tôi tạo ví dụ cụ thể để minh họa sự khác biệt không?
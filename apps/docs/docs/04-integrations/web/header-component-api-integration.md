# Header API Integration

## 📋 **Tổng quan**

Header component đã được tích hợp với API để hiển thị nội dung động từ database thay vì hardcode.

## 🔧 **Cấu trúc**

### 1. **Hook: `useHeaderData`**
- **File**: `src/hooks/useHeaderData.ts`
- **Chức năng**: Quản lý việc fetch và cache dữ liệu header từ API
- **Features**:
  - Loading state
  - Error handling
  - Fallback values
  - Menu items sorting

### 2. **Component: `Header`**
- **File**: `src/components/Header.tsx`
- **Chức năng**: Hiển thị header với dữ liệu động
- **Features**:
  - Dynamic content từ API
  - Loading spinner
  - Error display
  - Typed.js integration
  - Responsive design

### 3. **API Integration**
- **File**: `src/lib/api.ts`
- **Endpoint**: `/api/v1/site-settings`
- **Method**: `getSiteSettings(keys: string[])`

## 📊 **Dữ liệu được quản lý**

### **Header Settings Keys:**
- `header_name` - Tên hiển thị
- `header_title` - Tiêu đề header
- `header_subtitle` - Phụ đề
- `header_avatar` - URL avatar
- `header_typed_strings` - Chuỗi cho typed.js (JSON array)
- `header_menu_items` - Menu items (JSON array)
- `header_copyright` - Copyright text

### **Menu Items Structure:**
```typescript
{
  label: string;      // Text hiển thị
  url: string;        // Link URL
  icon: string;       // FontAwesome icon class
  order: number;      // Thứ tự hiển thị
}
```

### **Default Values:**
```typescript
{
  name: "Dai Nguyen",
  title: "Dai Nguyen",
  subtitle: "Professional Web Developer",
  avatar: "/assets/images/avatar.jpeg",
  typedStrings: [
    "Senior Web Developer",
    "Newbie Mobile Developer",
    "and",
    "Culi in Some Backend Languages"
  ],
  menuItems: [
    { label: "Home", url: "#home", icon: "fas fa-home", order: 1 },
    { label: "About Me", url: "#about-me", icon: "fas fa-user-tie", order: 2 },
    { label: "Resume", url: "#resume", icon: "fas fa-award", order: 3 },
    { label: "Portfolio", url: "#portfolio", icon: "fas fa-business-time", order: 4 },
    { label: "Blog", url: "#blog", icon: "fas fa-book-reader", order: 5 },
    { label: "Contact", url: "#contact", icon: "fas fa-paper-plane", order: 6 }
  ],
  copyright: "© 2024 All rights reserved."
}
```

## 🚀 **Cách sử dụng**

### **1. Chạy API Server:**
```bash
cd apps/api
npm run start:dev
```

### **2. Chạy Web App:**
```bash
cd apps/web
npm run dev
```

### **3. Seed dữ liệu (nếu cần):**
```bash
cd apps/api
npx ts-node src/database/seeds/seed.ts
```

## 🔄 **Cập nhật nội dung**

### **Qua Admin Panel:**
1. Truy cập `/admin`
2. Vào section "Site Settings"
3. Cập nhật các key tương ứng

### **Qua API trực tiếp:**
```bash
# Cập nhật tên
curl -X PUT http://localhost:3001/api/v1/site-settings/header_name \
  -H "Content-Type: application/json" \
  -d '{"value": "New Name"}'

# Cập nhật menu items
curl -X PUT http://localhost:3001/api/v1/site-settings/header_menu_items \
  -H "Content-Type: application/json" \
  -d '{"value": "[{\"label\":\"Home\",\"url\":\"#home\",\"icon\":\"fas fa-home\",\"order\":1}]"}'
```

## 🎨 **Styling**

### **Loading Spinner:**
- CSS class: `.loading-spinner`
- Animation: `spin` keyframe
- Color: `#007bff`

### **Error Display:**
- CSS class: `.alert .alert-danger`
- Auto-hide sau 5 giây

### **Menu Items:**
- Sắp xếp theo `order` field
- Active state cho item đầu tiên
- FontAwesome icons support

## 🔧 **Troubleshooting**

### **Lỗi thường gặp:**

1. **API không kết nối được:**
   - Kiểm tra API server đã chạy chưa
   - Kiểm tra port 3001
   - Kiểm tra CORS settings

2. **Dữ liệu không load:**
   - Kiểm tra database connection
   - Chạy seed script
   - Kiểm tra console errors

3. **Menu items không hiển thị:**
   - Kiểm tra JSON format của `header_menu_items`
   - Kiểm tra `order` field
   - Kiểm tra icon classes

4. **Typed.js không hoạt động:**
   - Kiểm tra `header_typed_strings` format (phải là JSON array)
   - Kiểm tra DOM elements tồn tại

### **Debug:**
```javascript
// Trong browser console
console.log('Header Data:', window.headerData);
console.log('API Response:', await fetch('/api/v1/site-settings').then(r => r.json()));
```

## 📝 **Future Enhancements**

1. **Multi-language**: i18n support cho menu items
2. **Dynamic routing**: Menu items với dynamic routes
3. **User roles**: Different menu items for different user types
4. **Theme support**: Different header styles
5. **Analytics**: Track menu item clicks

## 🔗 **Related Files**

- `src/hooks/useHeaderData.ts` - Custom hook
- `src/components/Header.tsx` - Component
- `src/lib/api.ts` - API client
- `src/types/api.ts` - TypeScript types
- `src/app/globals.css` - Styling
- `apps/api/src/database/seeds/header-settings.seed.ts` - Seed data 
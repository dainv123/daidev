# Home Page API Integration

## 📋 **Tổng quan**

Trang home đã được tích hợp với API để hiển thị nội dung động từ database thay vì hardcode.

## 🔧 **Cấu trúc**

### 1. **Hook: `useHomeData`**
- **File**: `src/hooks/useHomeData.ts`
- **Chức năng**: Quản lý việc fetch và cache dữ liệu từ API
- **Features**:
  - Loading state
  - Error handling
  - Fallback values
  - Auto-refresh

### 2. **Component: `HomeSection`**
- **File**: `src/components/HomeSection.tsx`
- **Chức năng**: Hiển thị nội dung home page
- **Features**:
  - Dynamic content từ API
  - Loading spinner
  - Error display
  - Typed.js integration

### 3. **API Integration**
- **File**: `src/lib/api.ts`
- **Endpoint**: `/api/v1/site-settings`
- **Method**: `getSiteSettings(keys: string[])`

### 4. **Typed.js Animation**
- **File**: `src/hooks/useTypedAnimation.ts`
- **Chức năng**: Quản lý typed.js animation với dữ liệu động
- **Features**:
  - Auto-restart khi strings thay đổi
  - Cleanup instance cũ
  - Dependency checking (jQuery, typed.js)
  - Error handling

## 📊 **Dữ liệu được quản lý**

### **Site Settings Keys:**
- `hero_title` - Tiêu đề chính
- `hero_subtitle` - Phụ đề
- `hero_description` - Mô tả
- `typed_strings` - Chuỗi cho typed.js (JSON array)
- `contact_button_text` - Text nút Contact
- `portfolio_button_text` - Text nút Portfolio

### **Default Values:**
```typescript
{
  heroTitle: "Hello I'm Dai Nguyen",
  heroSubtitle: "Senior Web Developer", 
  heroDescription: "Passionate about creating amazing web experiences",
  typedStrings: [
    "Senior Web Developer",
    "Newbie Mobile Developer",
    "and", 
    "Culi in Some Backend Languages"
  ],
  contactButtonText: "Contact Me",
  portfolioButtonText: "View My Work"
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
# Cập nhật hero title
curl -X PUT http://localhost:3001/api/v1/site-settings/hero_title \
  -H "Content-Type: application/json" \
  -d '{"value": "New Title"}'
```

## 🎨 **Styling**

### **Loading Spinner:**
- CSS class: `.loading-spinner`
- Animation: `spin` keyframe
- Color: `#007bff`

### **Error Display:**
- CSS class: `.alert .alert-danger`
- Auto-hide sau 5 giây

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

3. **Typed.js không hoạt động:**
   - Kiểm tra `typed_strings` format (phải là JSON array)
   - Kiểm tra DOM elements tồn tại

### **Debug:**
```javascript
// Trong browser console
console.log('Home Data:', window.homeData);
console.log('API Response:', await fetch('/api/v1/site-settings').then(r => r.json()));
```

## 📝 **Future Enhancements**

1. **Caching**: Implement Redis cache
2. **Real-time updates**: WebSocket integration
3. **Multi-language**: i18n support
4. **A/B Testing**: Dynamic content variants
5. **Analytics**: Track content performance

## 🔗 **Related Files**

- `src/hooks/useHomeData.ts` - Custom hook
- `src/components/HomeSection.tsx` - Component
- `src/lib/api.ts` - API client
- `src/types/api.ts` - TypeScript types
- `src/app/globals.css` - Styling 
# daidev Documentation Site

Đây là trang tài liệu cho dự án daidev, được xây dựng bằng Docusaurus để cung cấp tài liệu hướng dẫn chi tiết cho người dùng Việt Nam.

## 🚀 Chạy docs site

### Development
```bash
npm start
```
Site sẽ chạy tại `http://localhost:3000`

### Build
```bash
npm run build
```

### Serve build
```bash
npm run serve
```

### Deploy
```bash
npm run deploy
```

## 📁 Cấu trúc

```
docs/
├── intro.md                    # Trang giới thiệu
├── overview/                   # Tổng quan dự án
├── design/                     # Thiết kế hệ thống
├── implementation/             # Hướng dẫn triển khai
├── integrations/               # Tích hợp hệ thống
├── troubleshooting/            # Xử lý sự cố
└── workflows/                  # Quy trình làm việc
```

## 🌟 Tính năng

- **Đa ngôn ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- **Tìm kiếm**: Tìm kiếm nội dung trong tài liệu
- **Navigation**: Sidebar navigation cho từng phần
- **Responsive**: Tương thích với mọi thiết bị
- **Dark/Light mode**: Hỗ trợ chế độ tối/sáng
- **SEO friendly**: Tối ưu cho search engines

## 📝 Thêm tài liệu mới

1. Tạo file markdown trong thư mục phù hợp
2. Cập nhật sidebar trong `sidebars.ts`
3. Chạy `npm start` để preview
4. Commit và push changes

## 🔧 Cấu hình

Cấu hình chính được định nghĩa trong `docusaurus.config.ts`:
- Navigation menu
- Sidebar structure
- Search configuration
- Theme settings
- Internationalization

## 📚 Tài liệu tham khảo

- [Docusaurus Documentation](https://docusaurus.io/)
- [Markdown Guide](https://www.markdownguide.org/)
- [React Documentation](https://react.dev/)

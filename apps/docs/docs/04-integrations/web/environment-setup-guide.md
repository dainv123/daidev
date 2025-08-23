# Environment Variables Setup

## Google Maps API Key

Để sử dụng Google Maps API, bạn cần tạo file `.env.local` trong thư mục `apps/web/` với nội dung sau:

```bash
# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDe7yLyrlvLfv_yN4g6BMj9lwh5FWrFqOo
```

### Cách tạo file .env.local:

1. Tạo file `.env.local` trong thư mục `apps/web/`
2. Thêm nội dung trên vào file
3. Restart development server

### Lưu ý:
- File `.env.local` sẽ được git ignore
- API key hiện tại: `AIzaSyDe7yLyrlvLfv_yN4g6BMj9lwh5FWrFqOo`
- Nếu không có environment variable, sẽ sử dụng API key mặc định

### Cách test:
1. Tạo file `.env.local`
2. Chạy `npm run dev`
3. Kiểm tra Google Maps trong contact section 
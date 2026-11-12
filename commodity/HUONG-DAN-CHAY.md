# Hướng dẫn chạy COMMODITY.

## 1. Yêu cầu

Cài **Node.js phiên bản 20 trở lên** từ [nodejs.org](https://nodejs.org). Sau khi cài, kiểm tra bằng lệnh:

```bash
node -v
```

## 2. Chạy khi phát triển

Dùng khi muốn chỉnh sửa mã nguồn và xem thay đổi ngay lập tức.

```bash
npm install
npm run dev
```

Sau đó mở trình duyệt tại địa chỉ: http://localhost:3000

## 3. Tạo bản tĩnh để nộp hoặc demo offline

```bash
npm run build
```

Lệnh này tạo thư mục `out/` chứa toàn bộ trang web. Lần build đầu tiên **cần có mạng** để tải phông chữ.

## 4. Chạy bản tĩnh không cần mạng

```bash
node serve.mjs
```

Máy chủ sẽ in ra địa chỉ, ví dụ `http://localhost:3000`. Hãy mở địa chỉ đó trên trình duyệt.

**Lưu ý:** không mở trực tiếp file `out/index.html` bằng cách nhấp đúp. Trình duyệt sẽ không tải được các tệp JavaScript khi mở theo kiểu `file://`, khiến trang bị trống hoặc lỗi. Luôn chạy qua `node serve.mjs`.

## 5. Nộp bài

Có hai cách:

- Nén cả thư mục `commodity`, nhưng **bỏ qua** `node_modules` và `.next`.
- Hoặc chỉ nén `out/`, `serve.mjs` và tệp hướng dẫn này. Chạy lệnh sau trong PowerShell, đứng tại thư mục `commodity`:

```bash
Compress-Archive -Path out, serve.mjs, HUONG-DAN-CHAY.md -DestinationPath COMMODITY-ban-nop.zip -Force
```

Người chấm chỉ cần giải nén, cài Node.js, chạy `node serve.mjs` rồi mở địa chỉ được in ra.

## 6. Xử lý sự cố

- **Cổng 3000 đang bận:** `serve.mjs` tự động chuyển sang cổng kế tiếp (3001, 3002, ...). Hãy đọc địa chỉ được in ra để mở đúng. Có thể chọn cổng khác bằng lệnh, ví dụ: `PORT=8080 node serve.mjs`.
- **Trang trắng hoặc không hiển thị đúng:** chạy lại bản build bằng `npm run build`, rồi chạy lại `node serve.mjs`.
- **Phông chữ bị lỗi:** build lại khi có kết nối mạng ổn định.
- **Báo lỗi "Chưa có thư mục out/":** chạy `npm run build` trước khi chạy `node serve.mjs`.

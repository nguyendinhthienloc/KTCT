# COMMODITY.

**Mọi sản phẩm đều có một câu chuyện.**

Website giáo dục tương tác về **Kinh tế chính trị Mác – Lênin**, kể qua hành trình của một chiếc áo thun cotton: bông → sợi → vải → áo → thị trường.

🌐 **Bản online:** https://commodity-ktct.vercel.app

---

## Nội dung

| Chương | Chủ đề | Tương tác |
|---|---|---|
| 00 | Khởi đầu | Hiệu ứng hạt Bông → Sợi → Vải → Áo theo thao tác cuộn |
| 01 | Hàng hóa | Click các điểm trên chiếc áo để xem giá trị sử dụng, giá trị, giá trị trao đổi |
| 02 | Sản xuất | Dòng thời gian 7 công đoạn: lao động cụ thể, tư liệu sản xuất |
| 03 | Giá trị | So sánh 3 nhà máy: thời gian lao động cá biệt và thời gian lao động xã hội cần thiết |
| 04 | Tư bản | Mô phỏng giá trị thặng dư tuyệt đối và tương đối (W = c + v + m, m') |
| 05 | Thị trường | Giá cả dao động quanh giá trị theo cung – cầu; cạnh tranh giữa các nhà sản xuất |
| 06 | Nhìn lại | Sơ đồ vòng đời sản phẩm, bài kiểm tra 10 câu, tài liệu tham khảo |

Ngoài ra còn có:
- **Hỏi chiếc áo:** chat AI, trong đó chiếc áo trả lời và chỉ dựa trên nội dung của website.
- **Thuật ngữ** (`/thuat-ngu`), **AI trong dự án** (`/ai`), **Giới thiệu** (`/gioi-thieu`).

Website không cần đăng nhập, không có database. Tiến độ học chỉ lưu trong trình duyệt của người xem.

---

## Hướng dẫn chạy

### 1. Yêu cầu
- [Node.js](https://nodejs.org) phiên bản **20 trở lên** (đã thử trên Node 24).
- Lần build đầu tiên cần có mạng để tải phông chữ.

### 2. Cài đặt

```bash
cd commodity
```

```bash
npm install
```

### 3. Chạy khi phát triển
```bash
npm run dev
```
Sau đó mở http://localhost:3000.

### 4. Build bản tĩnh và chạy offline (dùng để demo hoặc nộp bài)

```bash
npm run build
```

```bash
node serve.mjs
```

Sau đó mở địa chỉ được in ra (mặc định http://localhost:3000; nếu cổng bận, script tự chuyển sang cổng khác). Bản này chạy **không cần mạng**.

> ⚠️ Không mở thẳng `out/index.html` bằng cách nhấp đúp. Trình duyệt sẽ không tải được JavaScript qua `file://`, nên phải chạy qua `serve.mjs`.

### 5. Bật AI thật cho "Hỏi chiếc áo" (tùy chọn)
Nếu chưa có key, chat chạy **chế độ ngoại tuyến** với 25 câu hỏi–đáp soạn sẵn. Để dùng Gemini:

1. Tạo file `commodity/.env` có nội dung:
   ```
   GEMINI_API_KEY=key_của_bạn
   ```
   File này đã nằm trong `.gitignore`, **không bao giờ commit**.
2. Chạy `npm run build`, rồi `node serve.mjs`.

Khi phát triển (`npm run dev`), chạy thêm `serve.mjs` ở cổng 3001 và tạo `commodity/.env.local` với dòng `NEXT_PUBLIC_API_BASE=http://localhost:3001`. Xem chi tiết ở [commodity/HUONG-DAN-CHAY.md](commodity/HUONG-DAN-CHAY.md).

### 6. Cập nhật bản online (Vercel)

```bash
npm run build
```

```bash
npx vercel deploy out --prod --yes
```

Lần đầu cần chạy `npx vercel login`. Trên Vercel, chat chạy chế độ ngoại tuyến.

### 7. Nén để nộp bài
Chạy trong thư mục `commodity/` (PowerShell):

```bash
Compress-Archive -Path out, serve.mjs, HUONG-DAN-CHAY.md -DestinationPath COMMODITY-ban-nop.zip -Force
```

---

## Sửa nội dung học thuật

Toàn bộ nội dung nằm trong `commodity/content/*.ts`, tách riêng khỏi giao diện. Mỗi định nghĩa đều có trích dẫn slide bài giảng.

- Hướng dẫn cho người không biết code: [docs/HUONG-DAN-SUA-NOI-DUNG.md](docs/HUONG-DAN-SUA-NOI-DUNG.md)
- Bản đọc duyệt toàn bộ nội dung: [docs/noi-dung-hoc-thuat.md](docs/noi-dung-hoc-thuat.md). Tạo lại bằng lệnh `npm run content:export`.

---

## Công nghệ

Next.js 16 (xuất bản tĩnh) · React 19 · TypeScript · Tailwind CSS 4 · GSAP ScrollTrigger · Canvas 2D / SVG (mọi hình ảnh đều tạo bằng code) · Gemini API (tùy chọn).

```text
KTCT/
├── docs/            Yêu cầu, kế hoạch, tiến độ, kịch bản thuyết trình, slide bài giảng
└── commodity/
    ├── app/         Các trang: /, /thuat-ngu, /ai, /gioi-thieu
    ├── components/  sections/ (chương) · interactive/ (mô phỏng) · animations/ · ai/ · ui/
    ├── content/     Nội dung học thuật + schema
    ├── lib/         economics.ts (công thức dùng chung), motion.ts, progress.ts
    ├── scripts/     Xuất nội dung .md, tạo knowledge.json cho chat
    └── serve.mjs    Máy chủ tĩnh offline + /api/hoi
```

## Tài liệu dự án

| Tài liệu | Nội dung |
|---|---|
| [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) | Đặc tả yêu cầu, quyết định D01–D22, ma trận truy vết |
| [docs/PLAN.md](docs/PLAN.md) | Pipeline, phân vai agent, quy ước git |
| [docs/PROGRESS.md](docs/PROGRESS.md) | Nhật ký tiến độ |
| [docs/KICH-BAN-THUYET-TRINH.md](docs/KICH-BAN-THUYET-TRINH.md) | Kịch bản thuyết trình 14 phút + câu hỏi phản biện |

---

*Môn Kinh tế chính trị Mác – Lênin. Mọi số liệu trong các mô phỏng là đơn vị minh họa.*

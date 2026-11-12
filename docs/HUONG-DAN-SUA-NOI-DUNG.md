# Hướng dẫn sửa nội dung (dành cho người không biết lập trình)

Toàn bộ chữ trên website nằm trong thư mục `commodity/content/`. Bạn chỉ cần sửa các file này, không đụng vào thư mục khác.

## 1. File nào chứa chương nào

| File | Nội dung |
|---|---|
| `intro.ts` | Màn mở đầu và chú thích bốn pha: bông, sợi, vải, áo |
| `commodity.ts` | Chương 01 — Hàng hóa |
| `production.ts` | Chương 02 — Sản xuất (bảy công đoạn) |
| `value.ts` | Chương 03 — Giá trị (ba nhà sản xuất) |
| `capital.ts` | Chương 04 — Tư bản và giá trị thặng dư |
| `market.ts` | Chương 05 — Thị trường |
| `recap.ts` | Chương 06 — Nhìn lại, 10 câu kiểm tra, tài liệu tham khảo |
| `glossary.ts` | Trang Thuật ngữ |

**Không sửa** `schema.ts` và `chapters.ts`.

## 2. Sửa một câu chữ an toàn

Mỗi đoạn chữ nằm giữa hai dấu nháy kép, ví dụ:

```
definition: "Giá trị là lao động xã hội kết tinh trong hàng hóa.",
```

Quy tắc:

1. Chỉ sửa chữ **bên trong** hai dấu nháy `" "`.
2. **Giữ nguyên** dấu nháy đóng, dấu phẩy ở cuối dòng và tên trường (như `definition:`).
3. Không dùng dấu nháy kép `"` ở giữa câu. Nếu cần trích dẫn, dùng dấu “ ” (nháy cong).
4. Muốn in đậm, bao từ trong hai dấu sao: `**giá trị**`. Giữ đủ cả hai cặp dấu sao.
5. Không xuống dòng ở giữa câu. Không chèn HTML hay emoji.
6. Không xóa hoặc đổi các trường `id` (ví dụ `id: "gia-tri-su-dung"`), vì các phần khác tham chiếu tới chúng.
7. Các con số trong `capital.ts` và `value.ts` (giờ lao động, c, v, m, sản lượng) gắn với công thức. Nếu đổi số, hãy báo cho người phát triển để kiểm tra lại các câu giải thích.

## 3. Điền số trang giáo trình và bỏ dấu "cần đối chiếu"

Mỗi định nghĩa có một khối `source`, hiện như sau:

```
source: { chapter: "Chương 2", section: "2.1.2. Hàng hóa", page: "?", needsCheck: true },
```

Sau khi đối chiếu với giáo trình PDF:

1. Thay `"?"` bằng số trang thật, ví dụ `page: "38–39"`.
2. Sửa `section` nếu số mục khác giáo trình.
3. Xóa `, needsCheck: true` (giữ lại dấu `}`).

Kết quả:

```
source: { chapter: "Chương 2", section: "2.1.2. Hàng hóa", page: "38–39" },
```

Trong nhiều file, `source` được tạo bằng hàm ngắn ở đầu file (tên `src`). Nếu muốn điền số trang riêng cho từng mục, hãy nhờ người phát triển hỗ trợ lần đầu.

## 4. Xuất bản tài liệu để cả nhóm đọc

Mở terminal trong thư mục `commodity` và chạy:

```
node scripts/export-content.mjs
```

Lệnh này tạo lại file `docs/noi-dung-hoc-thuat.md`, gồm toàn bộ khái niệm, giả định, kịch bản, câu hỏi và thuật ngữ. Các mục còn ghi **(cần đối chiếu)** là những mục chưa kiểm tra với giáo trình.

## 5. Khi nào cần nhờ người phát triển

Sau khi sửa, website cần được build lại thì thay đổi mới hiện lên bản chạy thật. Hãy báo người phát triển "đã sửa nội dung, nhờ build lại". Nếu sau khi sửa mà website báo lỗi, hãy gửi người phát triển file bạn vừa sửa. Nguyên nhân thường là thiếu một dấu nháy hoặc dấu phẩy.

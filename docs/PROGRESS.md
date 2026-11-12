# COMMODITY. — Nhật ký tiến độ

> Cập nhật mỗi khi một bước pipeline đổi trạng thái. Xem [PLAN.md](PLAN.md) để biết định nghĩa các bước.

## Trạng thái pipeline

| Bước | Nội dung | Trạng thái | Ghi chú |
|---|---|---|---|
| S0 | Requirements Engineering | ✅ Xong | Baseline 1.0, D01–D18 |
| S1 | Nền tảng | ✅ Xong | Tokens, phông, nav + tiến độ, schema, `lib/economics.ts` |
| S2 | Hero + FiberMorph | ✅ Xong | Áo SVG dùng chung; hạt Canvas Bông → Sợi → Vải → Áo theo cuộn |
| S3 | Nội dung học thuật | 🔨 Đối chiếu | Bản nháp xong (8 file); đang đối chiếu với slide bài giảng trong `docs/` |
| ⏸1 | Điểm duyệt thị giác | ⏸ Chờ nhóm | Mở `npm run dev` hoặc bản offline để xem |
| ⏸2 | Điểm duyệt học thuật | ⏸ Chờ nhóm | Đọc `docs/noi-dung-hoc-thuat.md` sau khi đối chiếu xong |
| S4 | Dựng chương song song | ✅ Xong | Agent A: Ch.01–02 · Agent B: Ch.03–04 · Agent C: Ch.05–06 + thuật ngữ |
| S5 | Tích hợp & kiểm thử | ✅ Lần 1 | tsc/eslint sạch; không tràn ngang ở 375px; console không lỗi; build tĩnh OK |
| S6 | Bàn giao | 🔨 | `serve.mjs` chạy offline: `/`, `/thuat-ngu/`, `/gioi-thieu/` → 200 |

Ký hiệu: ⏳ chưa làm · 🔨 đang làm · ✅ xong · ⛔ bị chặn · ⏸ chờ duyệt

## Phân công agent (session 2026-11-12)

| Agent | Model | Việc | Kết quả |
|---|---|---|---|
| Lead | Opus | Nền tảng, schema, công thức, Hero + FiberMorph, tích hợp, kiểm thử | ✅ |
| Nội dung | Sonnet | 8 file `content/*.ts`, script xuất `.md`, hướng dẫn sửa | ✅ |
| A | Sonnet | Ch.01 Hàng hóa, Ch.02 Sản xuất | ✅ |
| B | Sonnet | Ch.03 Giá trị + FactoryCompare, Ch.04 Tư bản + SurplusValue | ✅ |
| C | Sonnet | Ch.05 Thị trường + MarketSim, Ch.06 Nhìn lại, danh sách thuật ngữ | ✅ |
| Phụ | Haiku | `serve.mjs`, `HUONG-DAN-CHAY.md`, trang Giới thiệu | ✅ |
| Đối chiếu | Sonnet | Đối chiếu nội dung với slide bài giảng, điền số trang | 🔨 |

## Việc nhóm cần làm

- [x] Bỏ tài liệu bài giảng vào `D:\KTCT\docs\`
- [ ] Điền tên thành viên nhóm + giảng viên ở `components/sections/about/AboutContent.tsx`
- [ ] Duyệt thị giác (⏸1) và học thuật (⏸2)

## Nhật ký

### 2026-11-12
- Phỏng vấn yêu cầu, chốt 18 quyết định (D01–D18). Viết REQUIREMENTS / PLAN / PROGRESS. Khởi tạo git.
- Nền tảng + schema + công thức kinh tế dùng chung.
- 5 agent song song (4 Sonnet + 1 Haiku) dựng nội dung và các chương; Lead dựng Hero + FiberMorph.
- Sửa học thuật: bông thu hoạch là **nguyên liệu** (đối tượng lao động đã qua lao động), không phải "có sẵn trong tự nhiên".
- Kiểm thử trình duyệt 1440×900 và 375×812; build tĩnh thành công; chạy offline bằng `serve.mjs`.

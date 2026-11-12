# COMMODITY. — Nhật ký tiến độ

> Cập nhật mỗi khi một bước pipeline đổi trạng thái. Xem [PLAN.md](PLAN.md) để biết định nghĩa các bước.

## Trạng thái pipeline

| Bước | Nội dung | Trạng thái | Ghi chú |
|---|---|---|---|
| S0 | Requirements Engineering | ✅ Xong | Baseline 1.0, D01–D18 |
| S1 | Nền tảng | 🔨 Đang làm | Đã scaffold Next.js 16.4.6 |
| S2 | Hero + FiberMorph | ⏳ | |
| S3 | Nội dung học thuật | ⛔ Chờ | Chưa có PDF giáo trình trong `docs/` |
| ⏸1 | Điểm duyệt thị giác | ⏳ | |
| ⏸2 | Điểm duyệt học thuật | ⏳ | |
| S4 | Dựng chương song song | ⏳ | |
| S5 | Tích hợp & kiểm thử | ⏳ | |
| S6 | Bàn giao | ⏳ | |

Ký hiệu: ⏳ chưa làm · 🔨 đang làm · ✅ xong · ⛔ bị chặn · ⏸ chờ duyệt

## Việc nhóm cần làm

- [ ] Bỏ PDF giáo trình KTCT Mác–Lênin vào `D:\KTCT\docs\`
- [ ] Điền tên thành viên nhóm cho trang Giới thiệu (sẽ có placeholder)

## Nhật ký

### 2026-11-12
- Phỏng vấn yêu cầu, chốt 18 quyết định (D01–D18).
- Viết `REQUIREMENTS.md`, `PLAN.md`, `PROGRESS.md`.
- Scaffold `commodity/` bằng create-next-app (Next.js 16.4.6, React 19.3, Tailwind 4.3, TypeScript).
- Khởi tạo git tại `D:\KTCT`.

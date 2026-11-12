# COMMODITY. — Kế hoạch triển khai & Pipeline

> Phiên bản 1.0 · 2026-11-12 · Liên kết: [REQUIREMENTS.md](REQUIREMENTS.md) · [PROGRESS.md](PROGRESS.md)

---

## 1. Tổng quan

- **Mục tiêu session:** hoàn thành Giai đoạn 1 → 3 của đề án, ra bản build tĩnh chạy offline.
- **Cách làm:** một session dài. Phần nền tảng làm **tuần tự**. Sau đó các chương được giao cho **sub-agent làm song song**, mỗi agent sở hữu một thư mục riêng.
- **Điểm dừng cho nhóm duyệt:** 2 (xem mục 3).

---

## 2. Pipeline

```text
 ┌──────────────────────────────────────────────────────────────────────┐
 │ S0  Requirements Engineering  →  REQUIREMENTS.md (baseline)          │ ✅
 └──────────────────────────────────────────────────────────────────────┘
                 │
 ┌───────────────▼──────────────────────────────────────────────────────┐
 │ S1  Nền tảng (Lead, tuần tự)                                          │
 │     scaffold · design tokens · phông · layout · nav · progress store  │
 │     · SCHEMA NỘI DUNG (hợp đồng chung cho mọi agent)                  │
 └───────────────┬───────────────────────────────┬──────────────────────┘
                 │                               │ (song song, khi có PDF)
 ┌───────────────▼────────────────┐   ┌──────────▼─────────────────────────┐
 │ S2  Hero + FiberMorph (Lead)   │   │ S3  Agent Nội dung                 │
 │     áo SVG · hạt Canvas        │   │     đọc PDF → content/*.ts         │
 │     bông→sợi→vải→áo            │   │     + glossary + quiz + .md        │
 └───────────────┬────────────────┘   └──────────┬─────────────────────────┘
                 │                               │
          ⏸ ĐIỂM DUYỆT 1                  ⏸ ĐIỂM DUYỆT 2
          (thị giác, localhost)           (học thuật, đọc .md)
                 └───────────────┬───────────────┘
 ┌───────────────────────────────▼──────────────────────────────────────┐
 │ S4  Dựng chương song song                                            │
 │     Agent A: Ch.01 + Ch.02   Agent B: Ch.03 + Ch.04                  │
 │     Agent C: Ch.05 + Ch.06 + Quiz + Thuật ngữ                        │
 └───────────────────────────────┬──────────────────────────────────────┘
 ┌───────────────────────────────▼──────────────────────────────────────┐
 │ S5  Tích hợp & kiểm thử (Lead)                                        │
 │     ghép page · nhịp sáng/tối · mobile · reduced-motion · a11y        │
 │     · kiểm thử trình duyệt · lint/typecheck · build tĩnh · serve.mjs  │
 └───────────────────────────────┬──────────────────────────────────────┘
 ┌───────────────────────────────▼──────────────────────────────────────┐
 │ S6  Bàn giao: zip bản build · cập nhật truy vết · PROGRESS            │
 └──────────────────────────────────────────────────────────────────────┘
```

### Cổng chất lượng (Quality Gates) giữa các bước
| Cổng | Điều kiện để qua |
|---|---|
| G1 sau S1 | `npm run build` thành công; `tsc --noEmit` sạch; schema nội dung đã chốt |
| G2 sau S2 | Điểm duyệt 1 được nhóm chấp nhận; ≥ 50 fps; reduced-motion hoạt động |
| G3 sau S3 | Mọi định nghĩa có `source`; Điểm duyệt 2 được nhóm chấp nhận |
| G4 sau S4 | Mỗi chương đạt tiêu chí chấp nhận FR tương ứng; không sửa file ngoài vùng sở hữu |
| G5 sau S5 | Build tĩnh chạy offline; không cuộn ngang ở 360px; lint/typecheck sạch |

---

## 3. Điểm duyệt

| Điểm | Khi nào | Nhóm kiểm tra gì | Kết quả |
|---|---|---|---|
| ⏸ 1 | Sau S2 | Mở localhost: màn mở đầu, áo, hiệu ứng bông → áo có cảm giác "cao cấp" chưa | Chấp nhận / danh sách sửa |
| ⏸ 2 | Sau S3 | Đọc `docs/noi-dung-hoc-thuat.md`: định nghĩa, ví dụ, câu hỏi có đúng giáo trình | Chấp nhận / danh sách sửa |

Ngoài 2 điểm này, Lead tự chạy liên tục.

---

## 4. Phân vai & vùng sở hữu file

Quy tắc: **mỗi agent chỉ ghi trong vùng của mình**. File dùng chung (cột "Lead") chỉ Lead sửa.

| Vai trò | Ghi được vào | Không được sửa |
|---|---|---|
| **Lead** (session chính) | `app/**`, `components/navigation/**`, `components/ui/**`, `components/sections/Hero*`, `components/animations/**`, `lib/**`, `hooks/**`, `content/schema.ts`, `docs/PLAN.md`, `docs/PROGRESS.md`, `docs/REQUIREMENTS.md` | — |
| **Agent Nội dung** | `content/*.ts` (trừ `schema.ts`), `docs/noi-dung-hoc-thuat.md`, `docs/HUONG-DAN-SUA-NOI-DUNG.md` | component, schema |
| **Agent A** | `components/sections/ch01/**`, `components/sections/ch02/**` | content, nav, lib |
| **Agent B** | `components/sections/ch03/**`, `components/sections/ch04/**`, `components/interactive/factory/**`, `components/interactive/surplus/**` | như trên |
| **Agent C** | `components/sections/ch05/**`, `components/sections/ch06/**`, `components/interactive/market/**`, `components/interactive/quiz/**`, `app/thuat-ngu/**` (chỉ page) | như trên |

Agent cần thay đổi file dùng chung thì **đề xuất trong báo cáo** để Lead sửa, không tự sửa.

---

## 5. Cấu trúc thư mục

```text
KTCT/
├── docs/                       # tài liệu dự án + PDF giáo trình
│   ├── REQUIREMENTS.md
│   ├── PLAN.md
│   ├── PROGRESS.md
│   └── noi-dung-hoc-thuat.md   # (S3)
└── commodity/                  # ứng dụng Next.js
    ├── app/                    # page.tsx, thuat-ngu/, gioi-thieu/
    ├── components/
    │   ├── navigation/  sections/  animations/  interactive/  ui/
    ├── content/                # schema.ts + nội dung từng chương
    ├── hooks/  lib/
    ├── public/
    └── serve.mjs               # (S5) máy chủ tĩnh offline
```

---

## 6. Quy ước Git

- Repo gốc: `D:\KTCT` (gồm `docs/` và `commodity/`).
- Commit sau **mỗi bước pipeline** hoặc mỗi đơn vị việc hoàn chỉnh.
- Định dạng: `<loại>(<phạm vi>): <mô tả>` — loại: `feat`, `fix`, `docs`, `chore`, `refactor`, `content`.
  Ví dụ: `feat(hero): hiệu ứng hạt bông → áo theo cuộn`.
- Sub-agent **không commit**; Lead kiểm tra rồi commit thay.
- Mỗi commit cập nhật `docs/PROGRESS.md` nếu thay đổi trạng thái pipeline.

---

## 7. Định nghĩa "Hoàn thành" (Definition of Done)

Một hạng mục được coi là xong khi:
1. Đạt tiêu chí chấp nhận của các FR/NFR liên quan.
2. `tsc --noEmit` và `npm run lint` sạch.
3. Đã xem trên trình duyệt ở khổ desktop (1440) và mobile (375).
4. Không có chuỗi học thuật viết cứng trong component.
5. Ma trận truy vết (REQUIREMENTS §7) và PROGRESS đã cập nhật.
6. Đã commit.

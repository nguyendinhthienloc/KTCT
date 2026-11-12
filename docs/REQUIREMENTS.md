# COMMODITY. — Đặc tả yêu cầu (Requirements Specification)

> Phiên bản: 1.0 · Ngày: 2026-11-12 · Trạng thái: **Đã chốt (baseline)**
> Nguồn: Đề án "COMMODITY. – Mọi sản phẩm đều có một câu chuyện" + 16 quyết định phỏng vấn (mục 2).
> Mọi thay đổi yêu cầu phải ghi vào mục 8 (Nhật ký thay đổi) và cập nhật bảng truy vết (mục 7).

---

## 1. Phạm vi

### 1.1. Mục tiêu sản phẩm
Website giáo dục tương tác kể câu chuyện kinh tế đằng sau một chiếc áo thun cotton, giúp sinh viên hiểu các khái niệm Kinh tế chính trị Mác – Lênin (hàng hóa, giá trị, tư bản, giá trị thặng dư, thị trường) qua trải nghiệm scrollytelling kiểu quảng cáo sản phẩm cao cấp.

### 1.2. Bên liên quan
| Vai trò | Mối quan tâm |
|---|---|
| Nhóm sinh viên (chủ dự án) | Nộp đúng hạn, demo được, đạt điểm |
| Giảng viên (người chấm) | Chính xác học thuật, trực quan, sáng tạo |
| Người xem (sinh viên khác) | Dễ hiểu, hấp dẫn, không phải đăng nhập |
| Thành viên không biết code | Tự sửa được nội dung học thuật |

### 1.3. Phạm vi phiên bản này
**Trong phạm vi:** Giai đoạn 1 → 3 của đề án (nền tảng thị giác, 6 chương, toàn bộ tương tác học tập), bản build tĩnh chạy offline.
**Ngoài phạm vi:** đăng nhập/tài khoản, database, API phía máy chủ, LMS, dashboard giảng viên, chatbot, deploy online (có thể làm sau), ảnh/video AI, mô hình 3D.

---

## 2. Quyết định đã chốt (từ buổi phỏng vấn yêu cầu)

| Mã | Câu hỏi | Quyết định |
|---|---|---|
| D01 | Nguồn hình ảnh | Tạo hoàn toàn bằng code (SVG/Canvas) |
| D02 | Nguồn học thuật | PDF giáo trình KTCT Mác–Lênin do nhóm cung cấp (dạng có chữ), đặt tại `docs/` |
| D03 | Phạm vi session | Hết Giai đoạn 3 |
| D04 | Bối cảnh | Bài tập nhóm được chấm điểm, hạn gần |
| D05 | Dạng PDF | PDF có chữ, đọc trực tiếp |
| D06 | Kỹ thuật biến đổi | Hạt Canvas 2D + SVG, điều khiển bởi GSAP ScrollTrigger |
| D07 | Hình thức nộp | Static export, chạy offline, nén zip |
| D08 | Điểm duyệt | 2 điểm: sau màn mở đầu; sau khi soạn nội dung học thuật |
| D09 | Mô hình Ch.03 | 3 nhà máy + thị phần |
| D10 | Mô hình Ch.04 | Cả giá trị thặng dư tuyệt đối và tương đối |
| D11 | Mô hình Ch.05 | Giá cả dao động quanh giá trị (quy luật giá trị) |
| D12 | Người sửa nội dung | Có thành viên không biết code → nội dung dễ sửa + bản `.md` |
| D13 | Lưu tiến độ | localStorage, an toàn khi bị chặn |
| D14 | Quiz | 2 câu/chương (01–05) + bài tổng hợp 10 câu |
| D15 | Nhập liệu mô phỏng | Cuộn kể chuyện + click chip đổi kịch bản (không kéo thanh trượt) |
| D16 | Cảm giác cuộn | Cuộn gốc của trình duyệt + ghim cảnh; không Lenis, không snap |
| D17 | Dữ liệu & tài khoản | Không database, không đăng nhập |
| D18 | Mô hình tương tác | Người dùng **chỉ cuộn và click**, phong cách scrollytelling của Apple |
| D19 | Chuyên ngành | Nhóm thuộc CNTT / Khoa học máy tính: nhấn mạnh kiến trúc phần mềm, mô phỏng mô hình kinh tế, quy trình AI nhiều agent, triển khai tĩnh/offline |
| D20 | Tính năng AI "Hỏi chiếc áo" | Chat dùng Gemini, chỉ dựa trên nội dung website; khóa API chỉ nằm trên máy demo, không commit |
| D21 | Tầng 2 học thuật | Thu gọn thành mục "Tìm hiểu thêm" để giảm độ dài trang |
| D22 | Trang `/ai` | Trang riêng "AI trong dự án": quy trình, phân vai, lỗi AI đã bắt, cơ chế kiểm soát, góc nhìn CNTT, rào chắn của chat |

---

## 3. Yêu cầu chức năng (Functional Requirements)

Mức ưu tiên theo MoSCoW: **M** = Must, **S** = Should, **C** = Could.

### 3.1. Khung trang & điều hướng
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-01 | Thanh điều hướng cố định, tối giản: logo COMMODITY., danh sách chương, Thuật ngữ, Giới thiệu | M | Luôn hiển thị; click tên chương cuộn tới đúng chương |
| FR-02 | Chỉ báo chương hiện tại | M | Khi cuộn qua mỗi chương, tên chương trên nav đổi trạng thái trong ≤ 200ms |
| FR-03 | Thanh "Tiến độ khám phá" | M | Hiển thị % chương đã xem; chương được tính "đã xem" khi người dùng cuộn qua ≥ 60% chiều cao chương |
| FR-04 | Lưu tiến độ & điểm quiz bằng localStorage | M | Tải lại trang vẫn còn tiến độ; có nút "Làm lại từ đầu"; nếu localStorage lỗi, trang vẫn chạy bình thường |
| FR-05 | Nút "Chương tiếp theo" / "Quay lại" cuối mỗi chương | M | Click chuyển đúng chương liền kề |
| FR-06 | Menu chương riêng cho điện thoại | M | Ở màn < 768px, danh sách chương mở bằng nút, không tràn ngang |
| FR-07 | Trang Thuật ngữ (`/thuat-ngu`) | M | Liệt kê toàn bộ thuật ngữ, có định nghĩa và số trang giáo trình |
| FR-08 | Trang Giới thiệu (`/gioi-thieu`) | S | Tên dự án, thành viên nhóm (placeholder để nhóm điền), nguồn tham khảo |

### 3.2. Chương 00 – Khởi đầu
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-10 | Màn mở đầu nền gần đen, áo thun trắng giữa màn hình, ánh sáng studio | M | Áo hiện từ bóng tối (opacity + scale + ánh sáng) trong ≤ 1.6s sau khi tải |
| FR-11 | Tiêu đề lớn "MỌI SẢN PHẨM ĐỀU CÓ MỘT CÂU CHUYỆN." xuất hiện theo từng từ | M | Nội dung đọc được ngay cả khi hoạt ảnh chưa chạy (SSR) |
| FR-12 | Nút "Khám phá hành trình" + chỉ dẫn cuộn | M | Click cuộn tới cảnh biến đổi |
| FR-13 | Cảnh biến đổi **Bông → Sợi → Vải → Áo** bằng hạt Canvas, đồng bộ vị trí cuộn | M | Cảnh được ghim; cuộn xuôi/ngược thì biến đổi chạy xuôi/ngược liên tục, không nhảy cóc; mỗi giai đoạn có chú thích khái niệm kinh tế |

### 3.3. Chương 01 – Hàng hóa
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-20 | Khám phá áo qua các điểm click (hotspot): chất liệu, công dụng, nhu cầu, trao đổi | M | Mỗi hotspot mở giải thích gắn với một thuộc tính |
| FR-21 | Phân biệt giá trị sử dụng / giá trị / giá trị trao đổi | M | Có ví dụ áo thun cho từng khái niệm; nêu lý do có ý nghĩa kinh tế |
| FR-22 | 2 câu kiểm tra nhanh | M | Phản hồi đúng/sai + giải thích + số trang |

### 3.4. Chương 02 – Sản xuất
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-30 | Dòng thời gian 7 công đoạn (trồng bông → phân phối) theo cuộn | M | Mỗi công đoạn có hình vẽ code, khái niệm kinh tế, vai trò người lao động & tư liệu sản xuất |
| FR-31 | Giới thiệu: sản xuất, tư liệu sản xuất, sức lao động, lao động cụ thể, lao động trừu tượng, TGLĐXHCT | M | Mỗi khái niệm có định nghĩa có trích dẫn |
| FR-32 | 2 câu kiểm tra nhanh | M | Như FR-22 |

### 3.5. Chương 03 – Giá trị
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-40 | Mô hình 3 nhà máy (A, B, C) với thời gian lao động cá biệt & sản lượng khác nhau | M | Cuộn đi qua các bước giải thích; click chip đổi kịch bản thị phần |
| FR-41 | Hiển thị TGLĐXHCT theo điều kiện sản xuất trung bình/nhà sản xuất chiếm đại bộ phận | M | Số liệu nhất quán với công thức ghi trong phần "Giả định"; phân biệt rõ TGLĐ cá biệt vs xã hội cần thiết |
| FR-42 | Các nhân tố ảnh hưởng lượng giá trị (năng suất, cường độ, lao động giản đơn/phức tạp) | M | Có giải thích có trích dẫn |
| FR-43 | 2 câu kiểm tra nhanh | M | Như FR-22 |

### 3.6. Chương 04 – Tư bản
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-50 | Mô phỏng tạo giá trị thặng dư với c = 60, v = 20, m = 20, W = 100 | M | Hiển thị W = c + v + m; giá trị mới = v + m = 40; m' = m/v × 100% |
| FR-51 | Chế độ **tuyệt đối**: kéo dài ngày lao động, tiền công không đổi | M | Thời gian tất yếu cố định, thời gian thặng dư tăng; m, m' cập nhật đúng |
| FR-52 | Chế độ **tương đối**: ngày lao động không đổi, thời gian tất yếu giảm do tăng năng suất lao động xã hội | M | Như trên; ghi rõ giả định |
| FR-53 | Phân biệt: tư bản bất biến/khả biến; lao động/sức lao động; giá trị thặng dư/lợi nhuận | M | Mỗi cặp có khối so sánh riêng; **không** đánh đồng m với lợi nhuận |
| FR-54 | Khối "Giả định của mô hình" | M | Liệt kê đủ giả định dùng trong ví dụ |
| FR-55 | 2 câu kiểm tra nhanh | M | Như FR-22 |

### 3.7. Chương 05 – Thị trường
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-60 | Biểu đồ giá cả dao động quanh đường giá trị | M | Click chip "Cung > Cầu", "Cung = Cầu", "Cung < Cầu" làm giá lệch dưới/bằng/trên giá trị |
| FR-61 | So sánh nhà sản xuất: năng suất cao có lãi & tích lũy, năng suất thấp thua lỗ | M | Nhất quán với Ch.03 (cùng nhà máy A/B/C) |
| FR-62 | Giới thiệu tiền tệ, trao đổi, giá cả, cung cầu, cạnh tranh, tích lũy tư bản | M | Nêu rõ giá cả ≠ giá trị nhưng có quan hệ |
| FR-63 | 2 câu kiểm tra nhanh | M | Như FR-22 |

### 3.8. Chương 06 – Nhìn lại
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-70 | Sơ đồ vòng đời sản phẩm, click từng mắt xích quay về chương tương ứng | M | Mỗi mắt xích dẫn đúng chương |
| FR-71 | Bài kiểm tra tổng hợp 10 câu | M | Chấm điểm, giải thích từng câu, lưu điểm (FR-04) |
| FR-72 | Tài liệu tham khảo | M | Có thông tin xuất bản đầy đủ của giáo trình |
| FR-73 | Thông điệp kết "GIỜ ĐÂY, HÃY NHÌN MỘT CHIẾC ÁO THUN THEO MỘT CÁCH KHÁC." | M | Hiển thị cuối trang |

### 3.9. Nội dung học thuật
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-80 | Nội dung tách khỏi giao diện, đặt trong `content/*.ts` | M | Không có câu học thuật nào viết cứng trong component |
| FR-81 | Mỗi định nghĩa có trích dẫn (chương, mục, số trang giáo trình) | M | Trường `source` bắt buộc trong schema; build lỗi nếu thiếu |
| FR-82 | Mỗi chương có 3 tầng: Khám phá trực quan / Giải thích học thuật / Tương tác & kiểm tra | M | Schema chương có đủ 3 khối |
| FR-83 | Xuất bản `.md` để cả nhóm dò học thuật | M | `docs/noi-dung-hoc-thuat.md` sinh từ cùng dữ liệu |
| FR-84 | Hướng dẫn sửa nội dung cho người không biết code | S | `docs/HUONG-DAN-SUA-NOI-DUNG.md` |


### 3.10. Hỏi chiếc áo (AI) và trang AI
| Mã | Yêu cầu | Ưu tiên | Tiêu chí chấp nhận |
|---|---|---|---|
| FR-90 | Trợ lý chỉ trả lời dựa trên nội dung của website (grounding) | M | Câu trả lời bám dữ liệu `content/*`; không bổ sung kiến thức ngoài |
| FR-91 | Từ chối câu hỏi ngoài chủ đề | M | Hỏi chủ đề không liên quan → từ chối lịch sự, gợi ý hỏi về nội dung website |
| FR-92 | Mỗi câu trả lời kèm liên kết tới chương liên quan | M | Click liên kết cuộn/chuyển tới đúng chương |
| FR-93 | Nhãn "AI-generated" và nút "Báo sai" trên mỗi câu trả lời | M | Nhãn luôn hiển thị; "Báo sai" ghi nhận phản hồi cục bộ, không gửi dữ liệu cá nhân |
| FR-94 | Dự phòng ngoại tuyến bằng FAQ | M | Khi không có mạng/khóa hoặc lỗi API, chat chuyển sang FAQ soạn sẵn, trang vẫn chạy |
| FR-95 | Khóa API không nằm trong mã nguồn hay git | M | Không có khóa trong repo, bản build và zip nộp; khóa chỉ nạp trên máy demo |
| FR-96 | Trang `/ai` "AI trong dự án" | S | Có sơ đồ quy trình, bảng "AI làm / Con người kiểm soát", lỗi AI đã bắt, cơ chế kiểm soát, góc nhìn CNTT, rào chắn của chat; hiển thị tốt ở 375px |

---

## 4. Yêu cầu phi chức năng (Non-functional Requirements)

| Mã | Nhóm | Yêu cầu | Tiêu chí đo |
|---|---|---|---|
| NFR-01 | Thẩm mỹ | Điện ảnh, tối giản, cao cấp; xen kẽ chương nền tối/sáng | Được nhóm chấp nhận tại Điểm duyệt 1 |
| NFR-02 | Màu | Đen than `#101010`, Trắng ngà `#F1EEE7`, Vàng đồng `#B59A73`, Xám đá `#77746D` | Chỉ dùng token, không mã màu rời rạc |
| NFR-03 | Chữ | Be Vietnam Pro (tiêu đề/nội dung), Inter (UI), Cormorant Garamond (điểm nhấn) | Hiển thị đúng dấu tiếng Việt; phông tự lưu trong bản build |
| NFR-04 | Bố cục | Max-width 1440px, lưới 12 cột trên desktop; bố cục riêng cho mobile | Không cuộn ngang ở 360px |
| NFR-05 | Tương tác | Chỉ cuộn và click; không kéo thả, không hover bắt buộc | Mọi chức năng dùng được bằng chạm |
| NFR-06 | Cuộn | Cuộn gốc của trình duyệt; ghim cảnh bằng ScrollTrigger; không chiếm quyền cuộn | Không dùng thư viện smooth-scroll, không snap |
| NFR-07 | Hiệu năng | Hoạt ảnh mượt | ≥ 50 fps trên laptop phổ thông; số hạt giảm trên mobile |
| NFR-08 | Giảm chuyển động | Tôn trọng `prefers-reduced-motion` | Bật chế độ này: không có hoạt ảnh lớn, nội dung vẫn đầy đủ |
| NFR-09 | Truy cập | Tương phản đủ, điều hướng bằng bàn phím, nhãn ARIA cho canvas & chip | Mọi nút focus được bằng Tab |
| NFR-10 | Offline | Bản build tĩnh chạy không cần mạng | `node serve.mjs` mở được toàn bộ site khi tắt mạng |
| NFR-11 | Ngôn ngữ | 100% giao diện & nội dung tiếng Việt tự nhiên | Không còn chuỗi tiếng Anh hiển thị |
| NFR-12 | Không chờ hoạt ảnh | Nội dung đọc được không phụ thuộc hoạt ảnh | Văn bản có trong HTML tĩnh |
| NFR-13 | Bảo trì | Tách nội dung / logic hoạt ảnh / UI | Đúng cấu trúc thư mục ở `docs/PLAN.md` |

---

## 5. Ràng buộc (Constraints)

| Mã | Ràng buộc |
|---|---|
| C-01 | Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + GSAP/ScrollTrigger |
| C-02 | `output: 'export'` — không dùng tính năng cần máy chủ |
| C-03 | Không database, không đăng nhập, không API |
| C-04 | Không tài nguyên ảnh/video bên ngoài; mọi hình ảnh do code tạo |
| C-05 | Nội dung học thuật chỉ lấy từ giáo trình do nhóm cung cấp; không tự suy diễn thiếu căn cứ |

---

## 6. Giả định & rủi ro

| Mã | Nội dung | Ứng phó |
|---|---|---|
| A-01 | Nhóm cung cấp PDF giáo trình dạng có chữ | Nếu chậm: dựng nền tảng trước; Agent Nội dung chờ |
| R-01 | Áo vẽ bằng code chưa đạt cảm giác cao cấp | Điểm duyệt 1 ngay sau hero |
| R-02 | Thuật ngữ trong đề án khác giáo trình | Ưu tiên giáo trình; ghi chú khác biệt trong `.md` |
| R-03 | Sub-agent ghi đè file của nhau | Mỗi agent sở hữu thư mục riêng (xem PLAN mục 4) |
| R-04 | Mở bản build bằng file:// không chạy | Cung cấp `serve.mjs` + hướng dẫn |
| R-05 | Build cần mạng để tải phông | Build trước khi demo; khi demo không cần mạng |

---

## 7. Ma trận truy vết (Traceability)

| Mục đề án | Yêu cầu | Giai đoạn | Thành phần dự kiến | Trạng thái |
|---|---|---|---|---|
| §2 Ch.00, §4.1–4.3 | FR-10…13 | GĐ1 | `components/sections/Hero`, `components/animations/FiberMorph` | ⏳ |
| §8 Điều hướng | FR-01…08 | GĐ1–2 | `components/navigation/*`, `lib/progress.ts` | ⏳ |
| §2 Ch.01 | FR-20…22 | GĐ2–3 | `components/sections/Commodity`, `content/commodity.ts` | ⏳ |
| §2 Ch.02 | FR-30…32 | GĐ2–3 | `components/sections/Production`, `content/production.ts` | ⏳ |
| §2 Ch.03 | FR-40…43 | GĐ3 | `components/interactive/FactoryCompare`, `content/value.ts` | ⏳ |
| §2 Ch.04 | FR-50…55 | GĐ3 | `components/interactive/SurplusValue`, `content/capital.ts` | ⏳ |
| §2 Ch.05 | FR-60…63 | GĐ3 | `components/interactive/MarketSim`, `content/market.ts` | ⏳ |
| §2 Ch.06 | FR-70…73 | GĐ3 | `components/sections/Recap`, `components/interactive/Quiz` | ⏳ |
| §7 Học thuật | FR-80…84 | GĐ2–3 | `content/*`, `docs/noi-dung-hoc-thuat.md` | ⏳ |
| §3 Thiết kế, §4.5 | NFR-01…13 | Xuyên suốt | `app/globals.css`, `lib/motion.ts` | ⏳ |
| D19–D20 | FR-90…95 | Bổ sung 2026-11-13 | Chat "Hỏi chiếc áo", FAQ ngoại tuyến | ⏳ |
| D19, D22 | FR-96 | Bổ sung 2026-11-13 | `app/ai/page.tsx`, `components/sections/ai/AiContent.tsx` | 🔨 |
| D19–D22 | Kịch bản thuyết trình | Bổ sung 2026-11-13 | `docs/KICH-BAN-THUYET-TRINH.md` | ✅ |

Ký hiệu: ⏳ chưa làm · 🔨 đang làm · ✅ đạt tiêu chí · ⚠️ đạt một phần

---

## 8. Nhật ký thay đổi yêu cầu

| Ngày | Thay đổi | Lý do |
|---|---|---|
| 2026-11-12 | Baseline 1.0 | Chốt sau phỏng vấn yêu cầu (D01–D18) |
| 2026-11-13 | Thêm D19–D22, FR-90…96 (Hỏi chiếc áo, trang /ai, chuyên ngành CNTT/KHMT, Tầng 2 thu gọn) và kịch bản thuyết trình | Bám barem chấm điểm: ứng dụng AI, liên hệ chuyên ngành, trải nghiệm người dùng khi thuyết trình |

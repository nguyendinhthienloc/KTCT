/**
 * Danh sách chương — dùng chung cho thanh điều hướng, tiến độ và bố cục trang.
 * Chủ sở hữu: Lead. Nội dung học thuật từng chương nằm ở content/<chương>.ts.
 */

export type ChapterTheme = "dark" | "light";

export interface ChapterMeta {
  /** id dùng làm anchor (#hang-hoa) và khóa lưu tiến độ */
  id: string;
  /** "00" … "06" */
  number: string;
  /** Tên ngắn hiển thị trên nav */
  title: string;
  /** Câu hỏi trung tâm của chương */
  question: string;
  /** Nền tối/sáng xen kẽ — NFR-01 */
  theme: ChapterTheme;
}

export const CHAPTERS: readonly ChapterMeta[] = [
  { id: "khoi-dau", number: "00", title: "Khởi đầu", question: "Điều gì thực sự nằm phía sau một chiếc áo thun?", theme: "dark" },
  { id: "hang-hoa", number: "01", title: "Hàng hóa", question: "Điều gì khiến một chiếc áo thun trở thành hàng hóa?", theme: "light" },
  { id: "san-xuat", number: "02", title: "Sản xuất", question: "Một chiếc áo thun được tạo ra như thế nào?", theme: "dark" },
  { id: "gia-tri", number: "03", title: "Giá trị", question: "Giá trị của một chiếc áo thun được hình thành từ đâu?", theme: "light" },
  { id: "tu-ban", number: "04", title: "Tư bản", question: "Giá trị thặng dư được tạo ra như thế nào trong quá trình sản xuất chiếc áo?", theme: "dark" },
  { id: "thi-truong", number: "05", title: "Thị trường", question: "Điều gì xảy ra khi chiếc áo được đưa ra thị trường?", theme: "light" },
  { id: "nhin-lai", number: "06", title: "Nhìn lại", question: "Giờ đây, hãy nhìn một chiếc áo thun theo một cách khác.", theme: "dark" },
];

export function chapterIndex(id: string): number {
  return CHAPTERS.findIndex((c) => c.id === id);
}

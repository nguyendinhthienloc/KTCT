/**
 * SCHEMA NỘI DUNG — hợp đồng chung giữa Agent Nội dung và các agent giao diện.
 * Chủ sở hữu: Lead. Agent khác KHÔNG sửa file này; cần thay đổi thì đề xuất.
 *
 * Quy tắc (REQUIREMENTS FR-80…FR-82):
 *  - Mọi định nghĩa / khẳng định học thuật phải có `source` (bắt buộc về kiểu).
 *  - Văn bản là chuỗi thuần tiếng Việt. Được dùng **đậm** để nhấn mạnh; component hiển thị bằng <RichText>.
 *  - Mỗi chương có 3 tầng: `visual` (khám phá trực quan), `academic` (giải thích), `check` (kiểm tra).
 */

/* ───────────────────────── Nguồn trích dẫn ───────────────────────── */

export interface Source {
  /** Ví dụ: "Chương 2" */
  chapter: string;
  /** Ví dụ: "2.1.2. Thuộc tính của hàng hóa" */
  section?: string;
  /** Số trang trong giáo trình, ví dụ "38–39". Chưa đối chiếu PDF thì để "?" */
  page: string;
  /** true khi chưa đối chiếu với PDF giáo trình */
  needsCheck?: boolean;
  /** Ghi chú khi diễn đạt lại hoặc khi đề án dùng thuật ngữ khác giáo trình */
  note?: string;
}

/* ───────────────────────── Khối dùng chung ───────────────────────── */

export interface Concept {
  /** kebab-case, duy nhất toàn site, ví dụ "gia-tri-su-dung" */
  id: string;
  term: string;
  /** Định nghĩa bám sát giáo trình */
  definition: string;
  /** Giải thích dễ hiểu, 1–3 câu */
  explanation: string;
  /** Ví dụ gắn với chiếc áo thun */
  tshirtExample: string;
  source: Source;
}

/** Khối so sánh hai khái niệm dễ nhầm (FR-53, FR-62) */
export interface Distinction {
  id: string;
  title: string;
  left: { term: string; points: string[] };
  right: { term: string; points: string[] };
  /** Một câu chốt điểm khác biệt cốt lõi */
  takeaway: string;
  source: Source;
}

export interface Assumption {
  id: string;
  text: string;
}

export interface QuizOption {
  id: "a" | "b" | "c" | "d";
  text: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correct: QuizOption["id"];
  /** Giải thích vì sao đáp án đúng và vì sao các phương án khác sai */
  explanation: string;
  source: Source;
}

/** Một bước kể chuyện khi cuộn (Tầng 1) */
export interface StoryBeat {
  id: string;
  /** Tiêu đề ngắn, lớn */
  heading: string;
  body: string;
  /** Khái niệm liên kết (Concept.id), nếu có */
  conceptId?: string;
}

export interface ChapterContent {
  chapterId: string;
  /** Tầng 1 — khám phá trực quan */
  visual: { lead: string; beats: StoryBeat[] };
  /** Tầng 2 — giải thích học thuật */
  academic: {
    concepts: Concept[];
    distinctions?: Distinction[];
  };
  /** Tầng 3 — kiểm tra nhanh (đúng 2 câu) */
  check: QuizQuestion[];
}

/* ───────────────────────── Chương 01 – Hàng hóa ───────────────────────── */

export interface Hotspot {
  id: string;
  /** Vị trí trên hình áo, % theo khung 0–100 (x: trái→phải, y: trên→dưới) */
  x: number;
  y: number;
  label: string;
  /** Thuộc tính kinh tế gắn với điểm này (Concept.id) */
  conceptId: string;
  body: string;
}

export interface CommodityContent extends ChapterContent {
  hotspots: Hotspot[];
}

/* ───────────────────────── Chương 02 – Sản xuất ───────────────────────── */

export interface ProductionStage {
  id: string;
  /** 1…7 */
  order: number;
  name: string;
  description: string;
  /** Người lao động làm gì ở công đoạn này (lao động cụ thể) */
  labor: string;
  /** Tư liệu sản xuất: đối tượng lao động + tư liệu lao động */
  meansOfProduction: { objects: string; instruments: string };
  conceptId: string;
}

export interface ProductionContent extends ChapterContent {
  stages: ProductionStage[];
}

/* ───────────────────────── Chương 03 – Giá trị ───────────────────────── */

export interface Factory {
  id: "A" | "B" | "C";
  name: string;
  /** Thời gian lao động cá biệt, giờ / áo */
  hoursPerShirt: number;
}

export interface ShareScenario {
  id: string;
  /** Nhãn chip, ví dụ "B chiếm đại bộ phận" */
  label: string;
  /** Sản lượng (số áo) mỗi nhà máy cung cấp ra thị trường */
  output: Record<Factory["id"], number>;
  /** Lời giải thích kịch bản */
  note: string;
}

export interface ValueContent extends ChapterContent {
  factories: Factory[];
  scenarios: ShareScenario[];
  /** Cách mô hình tính thời gian lao động xã hội cần thiết, ghi bằng lời */
  method: string;
  assumptions: Assumption[];
  /** Các nhân tố ảnh hưởng lượng giá trị (FR-42) */
  factors: Concept[];
}

/* ───────────────────────── Chương 04 – Tư bản ───────────────────────── */

export interface SurplusBaseline {
  /** Tư bản bất biến */
  c: number;
  /** Tư bản khả biến */
  v: number;
  /** Giá trị thặng dư */
  m: number;
  /** Độ dài ngày lao động, giờ */
  workdayHours: number;
  /** Thời gian lao động tất yếu, giờ */
  necessaryHours: number;
}

export interface SurplusScenario {
  id: string;
  mode: "absolute" | "relative";
  label: string;
  workdayHours: number;
  necessaryHours: number;
  note: string;
}

export interface CapitalContent extends ChapterContent {
  baseline: SurplusBaseline;
  scenarios: SurplusScenario[];
  assumptions: Assumption[];
  /** Cách tính các đại lượng, viết bằng lời */
  formulas: { id: string; expression: string; meaning: string; source: Source }[];
}

/* ───────────────────────── Chương 05 – Thị trường ───────────────────────── */

export interface MarketScenario {
  id: string;
  label: string;
  /** Độ lệch giá so với giá trị, % (âm = dưới giá trị) */
  priceDeviation: number;
  note: string;
}

export interface MarketContent extends ChapterContent {
  /** Giá trị một chiếc áo dùng làm đường chuẩn (đơn vị minh họa) */
  valuePerShirt: number;
  scenarios: MarketScenario[];
  /** Giải thích so sánh nhà sản xuất, dùng lại Factory của Ch.03 */
  competitionNote: string;
  assumptions: Assumption[];
}

/* ───────────────────────── Chương 06 – Nhìn lại ───────────────────────── */

export interface LifecycleNode {
  id: string;
  label: string;
  /** ChapterMeta.id để quay lại */
  chapterId: string;
  summary: string;
}

export interface RecapContent {
  lifecycle: LifecycleNode[];
  /** Đúng 10 câu */
  finalQuiz: QuizQuestion[];
  references: { id: string; citation: string }[];
  closing: string;
}

/* ───────────────────────── Mở đầu (Ch.00) ───────────────────────── */

export interface IntroContent {
  headline: string;
  intro: string[];
  /** Chú thích cho 4 pha biến đổi: bông, sợi, vải, áo */
  morphCaptions: { phase: "cotton" | "thread" | "fabric" | "shirt"; title: string; body: string; conceptId?: string }[];
}

/* ───────────────────────── Thuật ngữ ───────────────────────── */

export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
  chapterId: string;
  source: Source;
}

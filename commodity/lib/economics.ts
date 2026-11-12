/**
 * Công thức kinh tế dùng chung — NGUỒN DUY NHẤT cho các mô phỏng Ch.03, Ch.04, Ch.05.
 * Chủ sở hữu: Lead. Component chỉ gọi các hàm này, không tự tính lại.
 * Mọi giả định phải khớp với `assumptions` trong content/value.ts, capital.ts, market.ts.
 */

import type { Factory, ShareScenario, SurplusBaseline, SurplusScenario } from "@/content/schema";

/* ───────────── Ch.03 — Thời gian lao động xã hội cần thiết ───────────── */

export interface SnltResult {
  /** Thời gian lao động xã hội cần thiết, giờ/áo (bình quân gia quyền theo sản lượng) */
  snlt: number;
  totalOutput: number;
  /** Nhà máy cung cấp nhiều áo nhất và tỷ trọng của nó */
  dominant: { id: Factory["id"]; share: number };
  rows: {
    id: Factory["id"];
    name: string;
    hours: number;
    output: number;
    share: number;
    /** Chênh lệch so với TGLĐXHCT: dương = hao phí ít hơn mức xã hội (có lợi) */
    advantage: number;
  }[];
}

/**
 * Mô hình: TGLĐXHCT ≈ bình quân gia quyền thời gian lao động cá biệt theo sản lượng.
 * Khi một nhà sản xuất cung cấp đại bộ phận hàng hóa, kết quả tiến gần thời gian
 * lao động cá biệt của nhà sản xuất đó — đúng với nhận định của giáo trình.
 */
export function computeSnlt(factories: Factory[], scenario: ShareScenario): SnltResult {
  const totalOutput = factories.reduce((s, f) => s + scenario.output[f.id], 0);
  const snlt =
    totalOutput === 0
      ? 0
      : factories.reduce((s, f) => s + f.hoursPerShirt * scenario.output[f.id], 0) / totalOutput;
  const rows = factories.map((f) => {
    const output = scenario.output[f.id];
    return {
      id: f.id,
      name: f.name,
      hours: f.hoursPerShirt,
      output,
      share: totalOutput === 0 ? 0 : output / totalOutput,
      advantage: snlt - f.hoursPerShirt,
    };
  });
  const top = rows.reduce((a, b) => (b.share > a.share ? b : a));
  return { snlt, totalOutput, dominant: { id: top.id, share: top.share }, rows };
}

/* ───────────── Ch.04 — Giá trị thặng dư ───────────── */

export interface SurplusResult {
  workdayHours: number;
  necessaryHours: number;
  surplusHours: number;
  /** Giá trị mới tạo ra trong một giờ lao động (không đổi giữa các kịch bản) */
  valuePerHour: number;
  /** Giá trị tư liệu sản xuất được chuyển vào sản phẩm */
  c: number;
  /** Giá trị sức lao động (tiền công) */
  v: number;
  /** Giá trị thặng dư */
  m: number;
  /** Giá trị mới = v + m */
  newValue: number;
  /** Giá trị hàng hóa W = c + v + m */
  W: number;
  /** Tỷ suất giá trị thặng dư m' = m / v × 100 */
  rate: number;
}

/**
 * Giả định:
 *  1. Mỗi giờ lao động tạo ra cùng một lượng giá trị mới: valuePerHour = (v + m) / ngày lao động gốc.
 *  2. Giá trị thặng dư tuyệt đối: thời gian tất yếu & v giữ nguyên, ngày lao động dài thêm.
 *     Lượng tư liệu sản xuất tiêu dùng tăng theo số giờ ⇒ c tăng tỷ lệ với ngày lao động.
 *  3. Giá trị thặng dư tương đối: ngày lao động giữ nguyên, năng suất lao động xã hội tăng làm
 *     giá trị sức lao động giảm ⇒ thời gian tất yếu giảm, v = valuePerHour × thời gian tất yếu.
 *     c giữ nguyên (cùng độ dài ngày lao động, cùng lượng nguyên liệu trong mô hình).
 */
export function computeSurplus(base: SurplusBaseline, sc?: SurplusScenario): SurplusResult {
  const valuePerHour = (base.v + base.m) / base.workdayHours;
  const workdayHours = sc?.workdayHours ?? base.workdayHours;
  const necessaryHours = sc?.necessaryHours ?? base.necessaryHours;
  const surplusHours = workdayHours - necessaryHours;
  const v = valuePerHour * necessaryHours;
  const m = valuePerHour * surplusHours;
  const c = base.c * (workdayHours / base.workdayHours);
  const newValue = v + m;
  return {
    workdayHours,
    necessaryHours,
    surplusHours,
    valuePerHour,
    c,
    v,
    m,
    newValue,
    W: c + newValue,
    rate: v === 0 ? 0 : (m / v) * 100,
  };
}

/* ───────────── Ch.05 — Giá cả và giá trị ───────────── */

/** Giá cả = giá trị × (1 + độ lệch%). Giá cả lên xuống quanh giá trị do cung – cầu. */
export function priceFromDeviation(value: number, deviationPct: number): number {
  return value * (1 + deviationPct / 100);
}

/**
 * Chuỗi giá dao động quanh giá trị dùng để vẽ biểu đồ (đơn vị minh họa).
 * Độ lệch trung bình bằng `deviationPct`, có dao động nhỏ để thể hiện giá luôn biến động.
 * Xác định (không ngẫu nhiên) để server và client render giống nhau.
 */
export function priceSeries(value: number, deviationPct: number, points = 48): number[] {
  return Array.from({ length: points }, (_, i) => {
    const wobble = Math.sin(i * 0.55) * 4 + Math.sin(i * 1.7 + 1) * 2;
    return priceFromDeviation(value, deviationPct + wobble);
  });
}

/**
 * Lợi thế cạnh tranh: hàng hóa bán theo giá trị xã hội (TGLĐXHCT), nên nhà sản xuất có
 * thời gian lao động cá biệt thấp hơn thu về nhiều hơn mức hao phí của mình.
 * Trả về chênh lệch theo "giờ lao động" mỗi áo (dương = có lợi, âm = bất lợi).
 */
export function producerMargin(snlt: number, individualHours: number): number {
  return snlt - individualHours;
}

export const fmt = (n: number, digits = 1) =>
  n.toLocaleString("vi-VN", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

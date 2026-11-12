"use client";

/**
 * Nhóm chip chọn kịch bản — cách nhập liệu duy nhất ngoài cuộn (D15, D18).
 * Dùng role="radiogroup" để điều hướng bằng bàn phím.
 */
export function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  tone = "dark",
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  /** nền đang đặt chip: "dark" (nền ink) hay "light" (nền ivory) */
  tone?: "dark" | "light";
}) {
  const base =
    tone === "dark"
      ? "border-ivory/20 text-ivory/70 hover:border-ivory/50"
      : "border-ink/20 text-ink/70 hover:border-ink/50";
  const on = tone === "dark" ? "border-bronze bg-bronze text-ink" : "border-ink bg-ink text-ivory";
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const selected = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.id)}
            className={`rounded-full border px-4 py-2 text-[0.8rem] transition-colors duration-300 ${
              selected ? on : base
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const LABELS = {
  A: "Minh họa xưởng thủ công: căn xưởng nhỏ mái dốc, một người ngồi bên khung dệt",
  B: "Minh họa nhà máy hiện đại: nhà xưởng dài mái răng cưa, hai ống khói và băng chuyền áo",
  C: "Minh họa xưởng trung bình: nhà gạch mái răng cưa, một ống khói và vài cỗ máy",
} as const;

const SHIRT = "M-4 -6 L-2 -7 Q0 -5 2 -7 L4 -6 L6 -3 L4 -2 L3 -3 V2 H-3 V-3 L-4 -2 L-6 -3 Z";

/** Tranh nét tay ba quy mô xưởng — dùng currentColor, điểm nhấn đồng bằng text-bronze. */
export function FactoryArt({ id, className }: { id: "A" | "B" | "C"; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      role="img"
      aria-label={LABELS[id]}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 90 H152" />
      {id === "A" && <Workshop />}
      {id === "C" && <Medium />}
      {id === "B" && <Plant />}
    </svg>
  );
}

function Workshop() {
  return (
    <g>
      <path d="M42 90 V54 H118 V90" fill="currentColor" fillOpacity="0.06" />
      <path d="M34 55 L80 26 L126 55 Z" fill="currentColor" fillOpacity="0.06" />
      {/* cửa mở */}
      <path d="M50 90 V60 H86 V90" />
      {/* cửa sổ duy nhất */}
      <rect x="97" y="64" width="14" height="14" />
      <path d="M104 64 V78 M97 71 H111" strokeWidth="0.9" />
      {/* người + khung dệt */}
      <circle cx="62" cy="66" r="3.4" />
      <path d="M62 70 V82 M62 74 L70 78 M62 82 L58 90 M62 82 L66 90" />
      <g className="text-bronze">
        <circle cx="76" cy="81" r="7" />
        <path d="M76 74 V88 M69 81 H83" strokeWidth="0.9" />
      </g>
    </g>
  );
}

function Medium() {
  return (
    <g>
      <path d="M30 90 V48 H130 V90" fill="currentColor" fillOpacity="0.06" />
      {/* mái răng cưa 2 răng */}
      <path d="M30 48 V32 L80 48 V32 L130 48" fill="currentColor" fillOpacity="0.06" />
      {/* ống khói */}
      <path d="M116 46 V20 H126 V46" />
      <path d="M115 20 H127" />
      {/* gạch */}
      <path d="M30 56 H44 M30 62 H40 M120 56 H130 M124 62 H130 M30 82 H42 M122 82 H130" strokeWidth="0.7" strokeOpacity="0.55" />
      {/* cửa sổ + bóng máy */}
      {[46, 72, 98].map((x) => (
        <g key={x}>
          <rect x={x} y="58" width="18" height="22" />
          <path d={`M${x + 3} 80 V70 H${x + 8} V66 H${x + 11} V70 H${x + 15} V80`} strokeWidth="0.9" />
        </g>
      ))}
      <g className="text-bronze">
        <path d="M121 18 q4 -5 0 -9" strokeWidth="0.9" />
      </g>
    </g>
  );
}

function Plant() {
  const w = 26.4;
  const teeth = Array.from({ length: 5 }, (_, i) => `L${14 + w * i} 40 L${14 + w * (i + 1)} 52`).join(" ");
  return (
    <g>
      <path d="M14 90 V52 H146 V90" fill="currentColor" fillOpacity="0.06" />
      <path d={`M14 52 ${teeth}`} fill="currentColor" fillOpacity="0.06" />
      {/* hai ống khói cao */}
      <path d="M22 46 V10 H29 V46 M35 46 V14 H42 V46" />
      <path d="M21 10 H30 M34 14 H43" />
      <g className="text-bronze" strokeWidth="0.9">
        <path d="M25 8 q4 -4 0 -7" />
        <path d="M38 12 q4 -4 0 -7" />
      </g>
      {/* dải cửa sổ */}
      <path d="M22 60 H138 V70 H22 Z" strokeWidth="0.9" />
      <path d="M41 60 V70 M60 60 V70 M79 60 V70 M98 60 V70 M117 60 V70" strokeWidth="0.7" strokeOpacity="0.6" />
      {/* băng chuyền + áo */}
      <path d="M20 83 H140" />
      {[28, 52, 76, 100, 124].map((x) => (
        <circle key={x} cx={x - 8} cy="86" r="2" strokeWidth="0.9" />
      ))}
      <g className="text-bronze">
        {[34, 62, 90, 118].map((x) => (
          <path key={x} d={SHIRT} transform={`translate(${x} 81)`} strokeWidth="1" />
        ))}
      </g>
    </g>
  );
}

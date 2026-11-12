/** Hình minh họa nét vẽ tay cho 7 công đoạn. Phần tử có class "draw" được GSAP vẽ dần. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Boll({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path className="draw" pathLength={1} d={`M${x - 14} ${y + 12} Q${x - 24} ${y - 6} ${x - 8} ${y - 14} Q${x - 4} ${y - 30} ${x + 8} ${y - 18} Q${x + 24} ${y - 20} ${x + 20} ${y - 2} Q${x + 28} ${y + 14} ${x + 12} ${y + 14}`} />
      <path className="draw" pathLength={1} d={`M${x - 16} ${y + 10} L${x - 10} ${y + 30} L${x + 14} ${y + 30} L${x + 14} ${y + 12}`} />
    </g>
  );
}

function Art({ order }: { order: number }) {
  switch (order) {
    case 1:
      return (
        <g>
          <path className="draw" pathLength={1} d="M150 280 V110" />
          <path className="draw" pathLength={1} d="M150 220 Q110 205 90 170" />
          <path className="draw" pathLength={1} d="M150 190 Q192 175 214 140" />
          <path className="draw" pathLength={1} d="M150 250 Q190 240 220 215" />
          <path className="draw" pathLength={1} d="M60 280 H240" />
          <Boll x={150} y={92} />
          <Boll x={84} y={152} />
          <Boll x={220} y={122} />
          <path className="draw" pathLength={1} d="M150 160 Q124 140 112 150 Q124 168 150 160" />
        </g>
      );
    case 2:
      return (
        <g>
          <path className="draw" pathLength={1} d="M50 150 L190 120 L250 150 L110 182 Z" />
          <path className="draw" pathLength={1} d="M50 150 V168 L110 200 V182" />
          <path className="draw" pathLength={1} d="M110 200 L250 168 V150" />
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} className="draw" pathLength={1} d={`M${70 + i * 18} ${150 - i * 3} l-4 -14`} />
          ))}
          <path className="draw" pathLength={1} d="M118 120 Q140 60 190 70 Q232 80 244 52" />
          <path className="draw" pathLength={1} d="M150 128 Q176 92 214 100" />
          <path className="draw" pathLength={1} d="M70 238 Q100 222 130 238 T190 238 T250 238" />
          <path className="draw" pathLength={1} d="M70 258 Q100 242 130 258 T190 258 T250 258" />
        </g>
      );
    case 3:
      return (
        <g>
          <path className="draw" pathLength={1} d="M150 30 V270" />
          <path className="draw" pathLength={1} d="M130 200 Q150 190 170 200 Q150 216 130 200 Z" />
          <path className="draw" pathLength={1} d="M138 120 L162 120 L158 190 L142 190 Z" />
          <path className="draw" pathLength={1} d="M150 120 Q90 96 70 60" />
          <path className="draw" pathLength={1} d="M150 130 Q96 140 52 110 Q36 100 40 84" />
          <path className="draw" pathLength={1} d="M150 150 Q210 160 232 210 Q246 240 218 262" />
          <path className="draw" pathLength={1} d="M30 270 H270" />
        </g>
      );
    case 4:
      return (
        <g>
          <rect className="draw" pathLength={1} x="40" y="40" width="220" height="220" {...S} />
          {Array.from({ length: 11 }).map((_, i) => (
            <path key={i} className="draw" pathLength={1} d={`M${60 + i * 18} 52 V248`} strokeOpacity={0.55} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i}>
              {Array.from({ length: 5 }).map((__, j) => (
                <path
                  key={j}
                  className="draw"
                  pathLength={1}
                  d={`M${60 + (j * 2 + (i % 2)) * 18 - 14} ${150 + i * 18} H${60 + (j * 2 + (i % 2)) * 18 + 14}`}
                  strokeWidth={3}
                />
              ))}
            </g>
          ))}
          <path className="draw" pathLength={1} d="M60 140 H240" strokeDasharray="1" />
          <path className="draw" pathLength={1} d="M60 40 V20 H240 V40" />
        </g>
      );
    case 5:
      return (
        <g>
          <path className="draw" pathLength={1} d="M70 80 L100 70 Q130 90 170 70 L200 80 L220 110 L196 124 L186 108 V196 H84 V108 L74 124 L50 110 Z" strokeDasharray="1" />
          <path d="M70 80 L100 70 Q130 90 170 70 L200 80 L220 110 L196 124 L186 108 V196 H84 V108 L74 124 L50 110 Z" strokeDasharray="4 4" strokeOpacity={0.6} />
          <circle className="draw" pathLength={1} cx="226" cy="246" r="18" />
          <circle className="draw" pathLength={1} cx="262" cy="228" r="18" />
          <path className="draw" pathLength={1} d="M214 232 L146 170" />
          <path className="draw" pathLength={1} d="M250 214 L150 160" />
          <path className="draw" pathLength={1} d="M146 170 L150 160" />
        </g>
      );
    case 6:
      return (
        <g>
          <path className="draw" pathLength={1} d="M40 160 H260 V250 H40 Z" />
          <path d="M40 205 H260" strokeDasharray="5 5" strokeOpacity={0.7} />
          <path className="draw" pathLength={1} d="M150 40 L226 150" />
          <path className="draw" pathLength={1} d="M158 40 L232 150" />
          <path className="draw" pathLength={1} d="M150 40 Q154 30 158 40" />
          <path className="draw" pathLength={1} d="M154 52 Q96 70 124 110 Q150 140 96 180 Q60 206 46 205" />
          <path className="draw" pathLength={1} d="M232 150 L226 150" />
        </g>
      );
    default:
      return (
        <g>
          <path className="draw" pathLength={1} d="M40 130 L150 100 L260 130 V230 L150 262 L40 230 Z" />
          <path className="draw" pathLength={1} d="M40 130 L150 162 L260 130" />
          <path className="draw" pathLength={1} d="M150 162 V262" />
          <path className="draw" pathLength={1} d="M80 138 L120 116 L150 128 L180 116 L220 138 L220 170 L150 188 L80 170 Z" />
          <path className="draw" pathLength={1} d="M130 118 Q150 142 170 118" />
          <path className="draw" pathLength={1} d="M92 150 L128 138 M208 150 L172 138" />
        </g>
      );
  }
}

export function StageArt({ order, label }: { order: number; label: string }) {
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label={label} className="h-full w-full text-ivory" {...S}>
      <Art order={order} />
    </svg>
  );
}

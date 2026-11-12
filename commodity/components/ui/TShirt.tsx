import { useId } from "react";

/**
 * Chiếc áo thun dùng chung toàn site — đề án §5.4: cùng hình dáng, tỷ lệ, ánh sáng.
 * SHIRT_PATH cũng được FiberMorph dùng để lấy mẫu hạt, nên áo hạt và áo vẽ trùng khớp.
 */
export const SHIRT_BOX = { w: 400, h: 440 } as const;

export const SHIRT_PATH =
  "M155 38 C170 64 230 64 245 38 L300 58 L372 128 L330 170 L300 142 L300 410 Q200 420 100 410 L100 142 L70 170 L28 128 L100 58 Z";

const COLLAR_BAND = "M155 38 C170 64 230 64 245 38 L252 43 C233 76 167 76 148 43 Z";

/** Tối đi 12% (nhân từng kênh với 0.88) */
function darken(hex: string, amount = 0.12) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) =>
    Math.round(c * (1 - amount)).toString(16).padStart(2, "0"),
  );
  return `#${ch.join("")}`;
}

export function TShirt({
  className = "",
  label = "Chiếc áo thun cotton trắng",
  shadow = true,
  tint,
}: {
  className?: string;
  label?: string;
  shadow?: boolean;
  /** màu vải (hex); bỏ trống = trắng ngà mặc định */
  tint?: string;
}) {
  const deep = tint ? darken(tint) : undefined;
  const uid = useId().replace(/:/g, "");
  const fabric = `fabric-${uid}`;
  const light = `light-${uid}`;
  const clip = `clip-${uid}`;
  const blur = `blur-${uid}`;

  return (
    <svg
      viewBox={`0 0 ${SHIRT_BOX.w} ${SHIRT_BOX.h + 30}`}
      role="img"
      aria-label={label}
      className={className}
    >
      <defs>
        <linearGradient id={fabric} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: tint ?? "var(--color-ivory)" }} />
          <stop offset="100%" style={{ stopColor: deep ?? "var(--color-ivory-deep)" }} />
        </linearGradient>
        <radialGradient id={light} cx="0.38" cy="0.22" r="0.85">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </radialGradient>
        <clipPath id={clip}>
          <path d={SHIRT_PATH} />
        </clipPath>
        <filter id={blur} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {shadow && (
        <ellipse cx="200" cy={SHIRT_BOX.h + 8} rx="140" ry="9" fill="#000" opacity="0.55" filter={`url(#${blur})`} />
      )}

      <path d={SHIRT_PATH} fill={`url(#${fabric})`} />

      <g clipPath={`url(#${clip})`}>
        <rect width={SHIRT_BOX.w} height={SHIRT_BOX.h} fill={`url(#${light})`} />
        {/* nếp vải */}
        <g fill="none" stroke="#000" strokeOpacity="0.07" strokeWidth="1.2" strokeLinecap="round">
          <path d="M142 168 Q152 270 136 402" />
          <path d="M262 176 Q250 276 266 402" />
          <path d="M100 142 Q122 152 128 176" />
          <path d="M300 142 Q278 152 272 176" />
          <path d="M190 120 Q200 240 196 300" strokeOpacity="0.035" />
        </g>
      </g>

      {/* cổ áo bo */}
      <path d={COLLAR_BAND} style={{ fill: deep ?? "var(--color-ivory-deep)" }} stroke="#000" strokeOpacity="0.08" />

      {/* đường may */}
      <g fill="none" stroke="#000" strokeOpacity="0.16" strokeWidth="0.9" strokeDasharray="3 3">
        <path d="M104 398 Q200 408 296 398" />
        <path d="M34.4 121.6 L76.4 163.6" />
        <path d="M365.6 121.6 L323.6 163.6" />
        <path d="M100 60 L100 142" strokeOpacity="0.08" />
        <path d="M300 60 L300 142" strokeOpacity="0.08" />
      </g>
    </svg>
  );
}

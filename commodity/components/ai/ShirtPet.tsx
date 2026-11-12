"use client";

import { useId } from "react";

interface ShirtPetProps {
  className?: string;
  isThinking?: boolean;
  isOpen?: boolean;
  isHovered?: boolean;
}

/**
 * Mascot Bé Áo AI - "The Shirt Pet"
 * Phong cách vector kawaii/tech-pet (tương tự Claude / Codex mascot)
 * nhưng mang linh hồn chiếc áo thun cotton cổ tròn đặc trưng của dự án.
 */
export function ShirtPet({
  className = "",
  isThinking = false,
  isOpen = false,
  isHovered = false,
}: ShirtPetProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className={`relative select-none ${className}`}>
      {/* Vòng aura ánh sáng vàng đồng / bronze pulse khi active */}
      <div
        className={`absolute -inset-2 rounded-full bg-bronze/20 blur-md transition-opacity duration-500 pointer-events-none ${
          isHovered || isOpen || isThinking ? "opacity-100 scale-110" : "opacity-30 scale-95"
        }`}
      />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient thân áo: màu ngà kem ivory ánh bronze nhạt */}
          <linearGradient id={`shirt-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAF7F2" />
            <stop offset="60%" stopColor="#EFECE5" />
            <stop offset="100%" stopColor="#DFD8C9" />
          </linearGradient>

          {/* Gradient cổ áo & viền: màu bronze đặc trưng của dự án */}
          <linearGradient id={`bronze-grad-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="100%" stopColor="#C48E58" />
          </linearGradient>

          {/* Bóng đổ nhẹ dưới đáy */}
          <radialGradient id={`shadow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Bóng dưới chân lơ lửng */}
        <ellipse
          cx="50"
          cy="92"
          rx={isHovered ? "22" : "18"}
          ry="4"
          fill={`url(#shadow-${uid})`}
          className="transition-all duration-300"
        />

        {/* Group chứa linh thú có chuyển động nhẹ */}
        <g className="transition-transform duration-300">
          {/* Tay áo trái & phải (vẫy nhẹ khi hover) */}
          {/* Tay trái */}
          <path
            d="M 28 32 L 12 44 C 9 47 11 52 15 54 L 22 56 L 27 48 Z"
            fill="url(#shirt-grad-"
            style={{ fill: `url(#shirt-grad-${uid})` }}
            stroke="#1A1816"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className={`origin-[28px_32px] transition-transform duration-300 ${
              isHovered || isOpen ? "-rotate-12 translate-y-[-2px]" : ""
            }`}
          />
          {/* Tay phải */}
          <path
            d="M 72 32 L 88 44 C 91 47 89 52 85 54 L 78 56 L 73 48 Z"
            fill="url(#shirt-grad-"
            style={{ fill: `url(#shirt-grad-${uid})` }}
            stroke="#1A1816"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className={`origin-[72px_32px] transition-transform duration-300 ${
              isHovered || isOpen ? "rotate-12 translate-y-[-2px]" : ""
            }`}
          />

          {/* Thân áo mũm mĩm bo tròn đáng yêu */}
          <path
            d="M 33 26 
               C 38 31 62 31 67 26 
               L 74 33 
               C 76 45 74 65 72 79 
               C 71 83 67 85 62 85 
               L 38 85 
               C 33 85 29 83 28 79 
               C 26 65 24 45 26 33 
               Z"
            style={{ fill: `url(#shirt-grad-${uid})` }}
            stroke="#1A1816"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* Nếp vải xinh xắn hai bên sườn áo */}
          <path
            d="M 30 60 Q 34 68 33 76"
            fill="none"
            stroke="#C5BEB1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 70 60 Q 66 68 67 76"
            fill="none"
            stroke="#C5BEB1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Bo cổ áo (Collar) hình thuyền màu đồng */}
          <path
            d="M 33 26 C 40 33 60 33 67 26 C 63 36 37 36 33 26 Z"
            style={{ fill: `url(#bronze-grad-${uid})` }}
            stroke="#1A1816"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Gương mặt của bé Áo */}
          {/* Mắt trái & Mắt phải */}
          {isOpen ? (
            /* Khi mở bảng: mắt cười hình cung ^_^ */
            <g stroke="#1A1816" strokeWidth="2.8" strokeLinecap="round" fill="none">
              <path d="M 40 50 Q 43 45 46 50" />
              <path d="M 54 50 Q 57 45 60 50" />
            </g>
          ) : isThinking ? (
            /* Khi đang suy nghĩ: mắt chớp nhấp nháy >_< */
            <g stroke="#1A1816" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 39 48 L 46 52 M 46 48 L 39 52" />
              <path d="M 54 48 L 61 52 M 61 48 L 54 52" />
            </g>
          ) : (
            /* Bình thường: 2 mắt đen to tròn lấp lánh như pet Claude/Codex */
            <g>
              <ellipse cx="43" cy="50" rx="3.5" ry="4.5" fill="#1A1816" />
              <circle cx="44.2" cy="48.5" r="1.4" fill="#FFFFFF" />

              <ellipse cx="57" cy="50" rx="3.5" ry="4.5" fill="#1A1816" />
              <circle cx="58.2" cy="48.5" r="1.4" fill="#FFFFFF" />
            </g>
          )}

          {/* Má hồng cute */}
          <ellipse cx="36" cy="55" rx="3.2" ry="2" fill="#E29578" opacity="0.65" />
          <ellipse cx="64" cy="55" rx="3.2" ry="2" fill="#E29578" opacity="0.65" />

          {/* Miệng cười chúm chím */}
          {isOpen ? (
            <path
              d="M 47 54 Q 50 60 53 54"
              fill="#D4A373"
              stroke="#1A1816"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M 47 54 Q 50 57 53 54"
              fill="none"
              stroke="#1A1816"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {/* Biểu tượng tia sáng AI / Sparkle nhỏ phía trên đầu vai */}
          <g
            className={`transition-all duration-300 origin-[72px_20px] ${
              isHovered || isOpen || isThinking ? "scale-110 opacity-100" : "scale-75 opacity-70"
            }`}
          >
            <path
              d="M 72 14 Q 72 20 78 20 Q 72 20 72 26 Q 72 20 66 20 Q 72 20 72 14 Z"
              fill="#D4A373"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

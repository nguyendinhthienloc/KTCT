"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Factory, MarketContent, ShareScenario } from "@/content/schema";
import { computeSnlt, fmt, priceSeries, producerMargin } from "@/lib/economics";
import { gsap, useReducedMotion } from "@/lib/motion";
import { ChipGroup } from "@/components/ui/ChipGroup";

const W = 800;
const H = 360;
const PAD = { l: 64, r: 24, t: 24, b: 44 };

export function MarketSim({
  content,
  factories,
  baseScenario,
  tone,
}: {
  content: MarketContent;
  factories: Factory[];
  baseScenario: ShareScenario;
  tone: "light" | "dark";
}) {
  const { valuePerShirt: value, scenarios } = content;
  const initial = (scenarios.find((s) => s.priceDeviation === 0) ?? scenarios[0]).id;
  const [active, setActive] = useState(initial);
  const scenario = scenarios.find((s) => s.id === active) ?? scenarios[0];
  const reduced = useReducedMotion();

  const yMin = value * 0.5;
  const yMax = value * 1.5;
  const x = (i: number, n: number) => PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) =>
    PAD.t + (1 - (Math.min(Math.max(v, yMin), yMax) - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);

  const series = useMemo(() => priceSeries(value, scenario.priceDeviation), [value, scenario.priceDeviation]);
  const avg = series.reduce((s, v) => s + v, 0) / series.length;
  const gapPct = ((avg - value) / value) * 100;

  const linePath = (vals: number[]) =>
    vals.map((v, i) => `${i ? "L" : "M"}${x(i, vals.length).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const areaPath = (vals: number[]) =>
    `${linePath(vals)} L${x(vals.length - 1, vals.length).toFixed(1)} ${y(value).toFixed(1)} L${x(0, vals.length).toFixed(1)} ${y(value).toFixed(1)} Z`;

  const lineRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);
  const shown = useRef<number[]>(series);

  useEffect(() => {
    const from = shown.current.slice();
    const to = series;
    const draw = (vals: number[]) => {
      lineRef.current?.setAttribute("d", linePath(vals));
      areaRef.current?.setAttribute("d", areaPath(vals));
    };
    if (reduced) {
      shown.current = to;
      draw(to);
      return;
    }
    const state = { t: 0 };
    const tw = gsap.to(state, {
      t: 1,
      duration: 0.9,
      ease: "power2.inOut",
      onUpdate: () => {
        const cur = to.map((v, i) => from[i] + (v - from[i]) * state.t);
        shown.current = cur;
        draw(cur);
      },
    });
    return () => {
      tw.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, reduced]);

  const snlt = computeSnlt(factories, baseScenario);
  const margins = factories.map((f) => ({ f, m: producerMargin(snlt.snlt, f.hoursPerShirt) }));
  const maxAbs = Math.max(0.0001, ...margins.map((r) => Math.abs(r.m)));

  const light = tone === "light";
  const muted = light ? "text-ink/60" : "text-ivory/60";
  const rule = light ? "border-ink/15" : "border-ivory/15";
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((p) => yMin + p * (yMax - yMin));

  return (
    <div className="grid gap-16 lg:gap-24">
      <div>
        <ChipGroup
          label="Quan hệ cung – cầu"
          options={scenarios.map((s) => ({ id: s.id, label: s.label }))}
          value={active}
          onChange={setActive}
          tone={tone}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label={`Biểu đồ giá cả theo thời gian dao động quanh giá trị ${fmt(value)} đơn vị minh họa; kịch bản hiện tại: ${scenario.label}.`}
              className="h-auto w-full"
            >
              {ticks.map((t) => (
                <g key={t}>
                  <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="currentColor" strokeOpacity="0.1" />
                  <text
                    x={PAD.l - 10}
                    y={y(t) + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="currentColor"
                    fillOpacity="0.6"
                  >
                    {fmt(t, 0)}
                  </text>
                </g>
              ))}
              <text x={PAD.l} y={14} fontSize="10" letterSpacing="2" fill="currentColor" fillOpacity="0.6">
                ĐƠN VỊ MINH HỌA
              </text>
              <text
                x={W - PAD.r}
                y={H - 10}
                textAnchor="end"
                fontSize="10"
                letterSpacing="2"
                fill="currentColor"
                fillOpacity="0.6"
              >
                THỜI GIAN →
              </text>
              <path ref={areaRef} d={areaPath(series)} fill="var(--color-bronze)" fillOpacity="0.16" stroke="none" />
              <line
                x1={PAD.l}
                x2={W - PAD.r}
                y1={y(value)}
                y2={y(value)}
                stroke="var(--color-bronze)"
                strokeWidth="1.5"
                strokeDasharray="6 5"
              />
              <text x={W - PAD.r} y={y(value) - 8} textAnchor="end" fontSize="11" fill="var(--color-bronze)">
                Giá trị · {fmt(value)}
              </text>
              <path
                ref={lineRef}
                d={linePath(series)}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            <div className={`mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs ${muted}`}>
              <span className="flex items-center gap-2">
                <svg width="22" height="2" aria-hidden>
                  <line x1="0" x2="22" y1="1" y2="1" stroke="var(--color-bronze)" strokeWidth="2" strokeDasharray="5 3" />
                </svg>
                Giá trị
              </span>
              <span className="flex items-center gap-2">
                <svg width="22" height="2" aria-hidden>
                  <line x1="0" x2="22" y1="1" y2="1" stroke="currentColor" strokeWidth="2" />
                </svg>
                Giá cả
              </span>
            </div>
          </div>

          <div className="lg:col-span-4" aria-live="polite">
            <p className="eyebrow text-bronze">Giá cả trung bình</p>
            <p className="mt-3 font-display text-6xl font-700 leading-none tracking-tight tabular-nums">{fmt(avg)}</p>
            <p className={`mt-3 text-sm tabular-nums ${muted}`}>
              so với giá trị {fmt(value)} ·{" "}
              <span className={light ? "text-ink" : "text-ivory"}>
                {gapPct > 0.05 ? "+" : ""}
                {fmt(gapPct)}%
              </span>
            </p>
            <p className="mt-6 font-serif text-xl italic leading-snug">{scenario.note}</p>
          </div>
        </div>

        <p className={`mt-10 max-w-3xl border-t ${rule} pt-6 text-base leading-relaxed`}>
          Giá cả xoay quanh giá trị; cung – cầu làm giá cả lệch khỏi giá trị nhưng không quyết định giá trị.
        </p>
      </div>

      <div className={`border-t ${rule} pt-10`}>
        <p className="eyebrow text-bronze">Cạnh tranh giữa các nhà sản xuất</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ul
            className="grid gap-6 lg:col-span-7"
            aria-label="Lợi thế của từng nhà máy so với thời gian lao động xã hội cần thiết"
          >
            {margins.map(({ f, m }) => {
              const pct = (Math.abs(m) / maxAbs) * 50;
              const good = m >= 0;
              return (
                <li key={f.id} className="grid grid-cols-[5.5rem_1fr_5rem] items-center gap-4">
                  <span className="text-sm">
                    <span className="font-display font-700">{f.id}</span>
                    <span className={`ml-2 text-xs tabular-nums ${muted}`}>{fmt(f.hoursPerShirt)} giờ</span>
                  </span>
                  <span className="relative block h-3">
                    <span aria-hidden className="absolute left-1/2 top-[-6px] h-6 w-px bg-current opacity-40" />
                    <span
                      aria-hidden
                      className={`absolute top-0 h-3 ${good ? "bg-bronze" : "bg-stone"}`}
                      style={good ? { left: "50%", width: `${pct}%` } : { right: "50%", width: `${pct}%` }}
                    />
                  </span>
                  <span className="text-right text-xs tabular-nums">
                    {good ? "+" : "−"}
                    {fmt(Math.abs(m), 2)} giờ
                    <span className={`block ${muted}`}>{good ? "có lợi" : "bất lợi"}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="lg:col-span-5">
            <p className={`text-xs tabular-nums ${muted}`}>
              Thời gian lao động xã hội cần thiết ≈ {fmt(snlt.snlt, 2)} giờ / áo
            </p>
            <p className="mt-4 text-base leading-relaxed">{content.competitionNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

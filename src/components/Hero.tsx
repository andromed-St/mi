import type { FC } from "react";
import { MARQUEE_ITEMS } from "../lib/data";
import {
  IWifiOff,
  IKey,
  IShield,
  IHeadset,
  IScan,
  ICashbox,
  ICheckCircle,
} from "./icons";
import { IconTile, Reveal } from "./kit";
import { scrollToId } from "./Header";

const TRUST = [
  { icon: IWifiOff, label: "Офлайн-работа" },
  { icon: IKey, label: "Локальная лицензия" },
  { icon: IShield, label: "Соответствие требованиям РБ" },
  { icon: IHeadset, label: "2 месяца бесплатной поддержки" },
];

const POS_ROWS = [
  { name: "Молоко «Беллакт» 1л", qty: "×2", sum: "4,86" },
  { name: "Хлеб «Нарочанский»", qty: "×1", sum: "1,64" },
  { name: "Сыр «Радивил» 350 г", qty: "×1", sum: "12,90" },
];

const Barcode: FC = () => (
  <svg viewBox="0 0 120 22" className="h-[22px] w-[120px] text-ink/70" aria-hidden="true">
    {[2, 5, 7, 11, 15, 17, 21, 26, 29, 33, 37, 40, 44, 49, 52, 55, 60, 63, 67, 72, 75, 79, 84, 87, 91, 96, 99, 103, 108, 111, 115].map(
      (x, i) => (
        <rect key={x} x={x} y="0" width={i % 3 === 0 ? 2.4 : 1.2} height="22" fill="currentColor" />
      )
    )}
  </svg>
);

const Hero: FC = () => (
  <section id="top" className="relative overflow-hidden">
    {/* свечения */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-32 left-[8%] h-[420px] w-[420px] rounded-full opacity-[0.13] blur-3xl"
      style={{ background: "radial-gradient(circle, #22D3EE 0%, transparent 65%)" }}
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 top-40 h-[460px] w-[460px] rounded-full opacity-[0.1] blur-3xl"
      style={{ background: "radial-gradient(circle, #818CF8 0%, transparent 65%)" }}
    />

    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:pb-24">
      {/* левая колонка */}
      <div>
        <Reveal>
          <p className="eyebrow flex items-center gap-2.5">
            <span className="inline-block h-px w-8 bg-cyan/60" />
            локальные IT-решения · беларусь
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="h1 mt-5">
            Автоматизация торговли и&nbsp;общепита{" "}
            <span className="relative whitespace-nowrap text-lime">
              без&nbsp;обязательных
            </span>{" "}
            <span className="text-lime">облачных подписок</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-mut">
            Локальные решения для магазинов, кафе, салонов и сервисных компаний
            в Беларуси. Работает без интернета. Соответствует требованиям РБ.
          </p>
        </Reveal>
        <Reveal delay={230}>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => scrollToId("calculator")} className="btn btn-primary">
              Рассчитать стоимость
            </button>
            <button onClick={() => scrollToId("compare")} className="btn btn-secondary">
              Сравнить с облачными системами
            </button>
          </div>
        </Reveal>
        <Reveal delay={310}>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <IconTile icon={t.icon} size="sm" />
                <span className="text-[13px] font-medium leading-tight text-mut">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* макет POS-интерфейса */}
      <Reveal delay={200} className="relative lg:justify-self-end">
        <div className="relative w-full max-w-[520px] lg:ml-auto">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-10 rounded-[40px] opacity-[0.16] blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, #22D3EE 0%, transparent 55%), radial-gradient(circle at 75% 80%, #A3E635 0%, transparent 55%)",
            }}
          />

          <div className="mi-card relative rotate-[-1.2deg] overflow-hidden p-0 shadow-[0_36px_80px_-24px_rgba(0,0,0,.85)]">
            {/* шапка окна */}
            <div className="flex items-center gap-2 border-b border-line bg-panel px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-err/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
              <span className="ml-3 font-mono text-[11px] tracking-wide text-dim">
                microinvest · касса №1
              </span>
              <span className="pill pill-offline ml-auto">
                <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-ok" />
                офлайн
              </span>
            </div>
            {/* чек */}
            <div className="px-5 py-4">
              <div className="flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                <span>чек #004712</span>
                <span>14:32:07</span>
              </div>
              <div className="mt-3 space-y-2.5">
                {POS_ROWS.map((r) => (
                  <div key={r.name} className="flex items-baseline justify-between gap-3 text-[13.5px]">
                    <span className="text-ink">
                      {r.name} <span className="font-mono text-[11px] text-dim">{r.qty}</span>
                    </span>
                    <span className="flex-1 translate-y-[-3px] border-b border-dotted border-line" />
                    <span className="font-mono text-[12.5px] text-mut">{r.sum}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">итого</span>
                <span className="font-mono text-[22px] font-bold text-lime">19,40 BYN</span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <Barcode />
                <div className="text-right font-mono text-[10px] leading-relaxed text-dim">
                  <p>КСА Титан-А · connected</p>
                  <p>обмен с 1С: 12:00 ✓</p>
                </div>
              </div>
            </div>
            {/* нижняя строка терминала */}
            <div className="flex items-center gap-2 border-t border-line bg-panel px-4 py-2.5 font-mono text-[10.5px] text-dim">
              <span className="text-cyan">▸</span>
              <span>
                база: локальная · записей 48 213
                <span className="blink-cursor ml-1 inline-block h-3 w-[7px] translate-y-[2px] bg-cyan/80" />
              </span>
            </div>
          </div>

          {/* плавающие плашки */}
          <div className="floaty absolute -right-3 -top-6 sm:-right-8">
            <div className="mi-card flex items-center gap-2.5 px-3.5 py-2.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,.7)]">
              <IconTile icon={IScan} size="sm" tone="lime" />
              <div className="leading-tight">
                <p className="text-[12.5px] font-semibold">Honeywell 1450g</p>
                <p className="font-mono text-[10px] text-ok">код считан · 0,3 с</p>
              </div>
            </div>
          </div>
          <div className="floaty-slow absolute -bottom-7 -left-2 sm:-left-8">
            <div className="mi-card flex items-center gap-2.5 px-3.5 py-2.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,.7)]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-vio/25 bg-vio/10 text-vio">
                <ICashbox size={17} />
              </span>
              <div className="leading-tight">
                <p className="text-[12.5px] font-semibold">ТН № 0412087</p>
                <p className="font-mono text-[10px] text-vio">сформирована · реестр РБ</p>
              </div>
            </div>
          </div>
          <div className="floaty-slow absolute -left-4 top-16 hidden md:block lg:-left-14">
            <div className="mi-card flex items-center gap-2 px-3 py-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,.7)]">
              <ICheckCircle size={15} className="text-ok" />
              <p className="font-mono text-[10.5px] text-mut">инвентаризация: 6 ч</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>

    {/* бегущая строка отраслей */}
    <div className="marquee relative overflow-hidden border-y border-line/70 bg-panel/40 py-3">
      <div className="marquee-track flex w-max items-center gap-8">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((m, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-dim">
              {m}
            </span>
            <span className="text-lime/70">◆</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;

import type { FC } from "react";
import { NICHES, TIMELINE, type BizType } from "../lib/data";
import { ICONS, IArrow } from "./icons";
import { Reveal, SectionHead } from "./kit";

const NichesTimeline: FC<{ onPickNiche: (t: BizType) => void }> = ({ onPickNiche }) => (
  <>
    {/* -------- ниши -------- */}
    <section id="solutions" className="scroll-mt-24 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          eyebrow="[ 03 ] — решения"
          title="Готовые решения для вашего бизнеса"
          desc="Каждое решение собирается из продуктов каталога под процессы конкретной ниши."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NICHES.map((n, i) => {
            const Icon = ICONS[n.icon];
            return (
              <Reveal key={n.title} delay={(i % 3) * 90}>
                <article className="mi-card mi-card-hover group flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-cyan/25 bg-cyan/10 text-cyan transition-colors group-hover:border-cyan/60 group-hover:bg-cyan/15">
                      <Icon size={23} />
                    </span>
                    <span className="pill pill-mut">{n.tag}</span>
                  </div>
                  <h3 className="mt-5 text-[19px] font-bold tracking-tight">{n.title}</h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-mut">
                    {n.desc}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-line/70 pt-4">
                    <span className="font-mono text-[11px] text-dim">
                      /resheniya/{n.title.toLowerCase().replace(/[^а-яa-z]+/gi, "-")}
                    </span>
                    <button
                      onClick={() => onPickNiche(n.id)}
                      className="group/btn flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan transition hover:text-limehi"
                    >
                      Подробнее
                      <IArrow size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* -------- таймлайн -------- */}
    <section id="process" className="scroll-mt-24 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          eyebrow="[ 05 ] — внедрение"
          title="Запуск за 7 дней"
          desc="Фиксированный план работ: от заявки до первой смены с поддержкой инженера."
        />

        {/* desktop: горизонтальный */}
        <div className="relative hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[22px] h-px bg-gradient-to-r from-transparent via-line to-transparent"
          />
          <div className="grid grid-cols-5 gap-6">
            {TIMELINE.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={i * 110}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-lime/40 bg-bg font-mono text-[15px] font-bold text-lime shadow-[0_0_0_6px_rgba(163,230,53,0.07)]">
                      {i + 1}
                    </div>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan">
                      {s.day}
                    </p>
                    <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-card text-mut">
                      <Icon size={19} />
                    </span>
                    <h3 className="mt-3 text-[15.5px] font-bold leading-snug">{s.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-mut">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* mobile: вертикальный */}
        <div className="relative ml-1 lg:hidden">
          <div aria-hidden="true" className="absolute bottom-4 left-[21px] top-4 w-px bg-line" />
          <div className="space-y-8">
            {TIMELINE.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={i * 70}>
                  <div className="relative flex gap-5">
                    <div className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-lime/40 bg-bg font-mono text-[15px] font-bold text-lime">
                      {i + 1}
                    </div>
                    <div className="mi-card flex-1 p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan">
                        {s.day}
                      </p>
                      <h3 className="mt-1.5 flex items-center gap-2.5 text-[16px] font-bold">
                        <Icon size={18} className="text-mut" />
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-mut">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default NichesTimeline;

import type { FC } from "react";
import { WHY_LOCAL, COMPARE_ROWS } from "../lib/data";
import { ICONS } from "./icons";
import { Reveal, SectionHead, MarkIcon, cx } from "./kit";

const WhyCompare: FC<{ onFullCompare: () => void }> = ({ onFullCompare }) => (
  <>
    {/* -------- почему локальное -------- */}
    <section id="why" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          eyebrow="[ 01 ] — преимущества"
          title="Почему бизнес выбирает локальную автоматизацию"
          desc="Четыре причины, по которым владельцы магазинов и кафе в Беларуси отказываются от арендных моделей."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {WHY_LOCAL.map((w, i) => {
            const Icon = ICONS[w.icon];
            return (
              <Reveal key={w.title} delay={i * 90}>
                <article className="mi-card mi-card-hover group flex h-full gap-5 p-6">
                  <div className="flex flex-col items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-cyan/25 bg-cyan/10 text-cyan transition-colors group-hover:border-cyan/60">
                      <Icon size={23} />
                    </span>
                    <span className="font-mono text-[11px] text-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[19px] font-bold tracking-tight">{w.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-mut">{w.desc}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* -------- сравнение -------- */}
    <section id="compare" className="scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
        <SectionHead
          eyebrow="[ 02 ] — сравнение"
          title="Локальная лицензия против облачной подписки"
          desc="Без привязки к конкретным вендорам — только модель владения и эксплуатации."
        />
        <Reveal>
          <div className="mi-card overflow-hidden p-0">
            <div className="table-scroll">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-panel">
                    <th className="border-b border-line px-5 py-4 text-[13px] font-semibold uppercase tracking-wider text-dim">
                      Параметр
                    </th>
                    <th className="border-b border-line px-5 py-4">
                      <span className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-lime">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
                        Локальное решение
                      </span>
                    </th>
                    <th className="border-b border-line px-5 py-4 text-[13px] font-semibold uppercase tracking-wider text-mut">
                      Облачная подписка
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r, i) => (
                    <tr
                      key={r.param}
                      className={cx(
                        "transition-colors hover:bg-panel/50",
                        i !== COMPARE_ROWS.length - 1 && "border-b border-line/70"
                      )}
                    >
                      <td className="px-5 py-4 text-[14.5px] font-semibold text-ink">
                        {r.param}
                      </td>
                      <td className="bg-lime/[0.035] px-5 py-4">
                        <span className="flex items-start gap-2.5 text-[14px] text-ink">
                          <MarkIcon mark={r.local.mark} />
                          {r.local.text}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="flex items-start gap-2.5 text-[14px] text-mut">
                          <MarkIcon mark={r.cloud.mark} />
                          {r.cloud.text}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 border-t border-line bg-panel/50 px-5 py-4 sm:flex-row sm:items-center">
              <p className="font-mono text-[11.5px] text-dim">
                * сравнение по типовым сценариям розницы и общепита в РБ
              </p>
              <button onClick={onFullCompare} className="btn btn-secondary btn-sm">
                Посмотреть полное сравнение
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default WhyCompare;

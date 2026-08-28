import { useEffect, useState, type FC } from "react";
import { CASES, REVIEWS } from "../lib/data";
import { IArrow, IStar } from "./icons";
import { Pill, Reveal, SectionHead, cx } from "./kit";

const CasesReviews: FC<{
  onCaseOpen: (id: string) => void;
  onAllCases: () => void;
}> = ({ onCaseOpen, onAllCases }) => {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const featured = CASES.slice(0, 3);

  return (
    <>
      {/* -------- кейсы -------- */}
      <section id="cases" className="scroll-mt-24 border-t border-line/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            eyebrow="[ 07 ] — кейсы"
            title="Кейсы внедрения"
            desc="Реальные проекты в Беларуси: задача, решение и результат в цифрах."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.id} delay={i * 90}>
                <article className="mi-card mi-card-hover group flex h-full flex-col overflow-hidden">
                  {c.photo && (
                    <div className="relative h-44 overflow-hidden border-b border-line">
                      <img
                        src={c.photo}
                        alt={c.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 via-transparent to-transparent" />
                      <span className="pill pill-new absolute left-3 top-3">{c.biz}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[16.5px] font-bold leading-snug tracking-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-mut">{c.task}</p>
                    <div className="mt-4 border-t border-line pt-4">
                      <p className="font-mono text-[26px] font-bold leading-none text-lime">
                        {c.metric}
                      </p>
                      <p className="mt-1 text-[12.5px] text-mut">{c.metricNote}</p>
                    </div>
                    <button
                      onClick={() => onCaseOpen(c.id)}
                      className="group/btn mt-4 flex items-center gap-1.5 self-start text-[13.5px] font-semibold text-cyan transition hover:text-limehi"
                    >
                      Подробнее
                      <IArrow size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <button onClick={onAllCases} className="btn btn-secondary">
              Смотреть все кейсы
              <span className="font-mono text-[12px] opacity-70">{CASES.length}</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* -------- отзывы -------- */}
      <section id="reviews" className="scroll-mt-24 border-t border-line/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <SectionHead
            eyebrow="[ 08 ] — отзывы"
            title="Отзывы клиентов"
            desc="Что говорят владельцы и IT-специалисты после внедрения."
          />
          <Reveal>
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="relative"
            >
              <div className="overflow-hidden rounded-[14px]">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${slide * 100}%)` }}
                >
                  {REVIEWS.map((r) => (
                    <div key={r.name} className="w-full shrink-0 px-0.5">
                      <figure className="mi-card grid gap-6 p-7 sm:p-9 md:grid-cols-[auto_1fr] md:gap-8">
                        <div className="flex items-start gap-5 md:block">
                          <img
                            src={r.photo}
                            alt={r.name}
                            loading="lazy"
                            className="h-20 w-20 rounded-[14px] border border-line object-cover md:h-24 md:w-24"
                          />
                          <div className="mt-0 md:mt-4">
                            <div className="flex gap-1 text-lime" aria-label={`Оценка ${r.stars} из 5`}>
                              {Array.from({ length: r.stars }).map((_, i) => (
                                <IStar key={i} size={15} />
                              ))}
                            </div>
                            <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                              {r.year}
                            </p>
                          </div>
                        </div>
                        <div>
                          <blockquote className="text-[16.5px] font-medium leading-relaxed text-ink sm:text-[18px]">
                            «{r.text}»
                          </blockquote>
                          <figcaption className="mt-5 border-t border-line pt-4">
                            <p className="text-[15px] font-bold">{r.name}</p>
                            <p className="text-[13.5px] text-mut">
                              {r.role} · {r.company}
                            </p>
                          </figcaption>
                        </div>
                      </figure>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      aria-label={`Отзыв ${i + 1}`}
                      className={cx(
                        "h-2 rounded-full transition-all",
                        i === slide ? "w-8 bg-lime" : "w-2 bg-line hover:bg-dim"
                      )}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSlide((slide - 1 + REVIEWS.length) % REVIEWS.length)}
                    aria-label="Предыдущий отзыв"
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-card text-mut transition hover:border-cyan/60 hover:text-cyan"
                  >
                    <IArrow size={16} className="rotate-180" />
                  </button>
                  <button
                    onClick={() => setSlide((slide + 1) % REVIEWS.length)}
                    aria-label="Следующий отзыв"
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-card text-mut transition hover:border-cyan/60 hover:text-cyan"
                  >
                    <IArrow size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default CasesReviews;

import { useEffect, useRef, useState, type FC, type FormEvent } from "react";
import {
  FAQ,
  BIZ_LABEL,
  CONTACTS,
  type BizType,
} from "../lib/data";
import { IPlus, IPhone, ISend } from "./icons";
import { Reveal, SectionHead, cx } from "./kit";
import type { CalcSummary } from "./Calculator";

/* ------------------------- FAQ ------------------------- */

const Faq: FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          eyebrow="[ 09 ] — faq"
          title="Частые вопросы"
          desc="Не нашли ответа? Позвоните — инженер ответит сразу, без скриптов колл-центра."
        />
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div
                  className={cx(
                    "mi-card overflow-hidden transition-colors",
                    isOpen && "border-cyan/45"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[11.5px] text-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15.5px] font-semibold leading-snug">{f.q}</span>
                    </span>
                    <span
                      className={cx(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-cyan/60 bg-cyan/10 text-cyan"
                          : "border-line text-dim"
                      )}
                    >
                      <IPlus size={15} />
                    </span>
                  </button>
                  <div className={cx("acc-body", isOpen && "open")}>
                    <div>
                      <p className="px-6 pb-5 pl-[4.4rem] text-[14.5px] leading-relaxed text-mut">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ----------------------- финальный CTA ------------------------- */

interface LeadProps {
  prefill: CalcSummary & { ts: number } | null;
  notify: (msg: string) => void;
}

const LeadForm: FC<LeadProps> = ({ prefill, notify }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<BizType>("magazin");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<number>(0);

  useEffect(() => {
    if (prefill) {
      setComment(prefill.comment);
      setType(prefill.type);
      setDone(false);
    }
  }, [prefill]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Укажите имя";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) next.phone = "Укажите корректный номер телефона";
    if (!consent) next.consent = "Необходимо согласие на обработку данных";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    timer.current = window.setTimeout(() => {
      setLoading(false);
      setDone(true);
      notify("Заявка отправлена — менеджер свяжется в течение 30 минут");
    }, 900);
  };

  return (
    <div className="mi-card relative overflow-hidden p-7 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-[0.12] blur-2xl"
        style={{ background: "radial-gradient(circle, #A3E635 0%, transparent 70%)" }}
      />
      {done ? (
        <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-lime/40 bg-lime/10">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#A3E635" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path className="draw-check" d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h3 className="mt-5 text-[20px] font-bold">Заявка отправлена</h3>
          <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-mut">
            Менеджер свяжется в течение 30 минут в рабочее время и подготовит точную смету.
          </p>
          <button
            onClick={() => {
              setDone(false);
              setName("");
              setPhone("");
              setComment("");
              setConsent(false);
            }}
            className="btn btn-ghost btn-sm mt-6"
          >
            Отправить ещё одну заявку
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
            заявка на расчёт
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lead-name" className="mb-1.5 block text-[13.5px] font-semibold">
                Имя
              </label>
              <input
                id="lead-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                className={cx("field", errors.name && "field-err")}
              />
              {errors.name && <p className="mt-1.5 text-[12px] text-err">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="lead-phone" className="mb-1.5 block text-[13.5px] font-semibold">
                Телефон
              </label>
              <input
                id="lead-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+375 (__) ___-__-__"
                inputMode="tel"
                className={cx("field", errors.phone && "field-err")}
              />
              {errors.phone && <p className="mt-1.5 text-[12px] text-err">{errors.phone}</p>}
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="lead-type" className="mb-1.5 block text-[13.5px] font-semibold">
              Тип бизнеса
            </label>
            <select
              id="lead-type"
              value={type}
              onChange={(e) => setType(e.target.value as BizType)}
              className="field"
            >
              {(Object.keys(BIZ_LABEL) as BizType[]).map((k) => (
                <option key={k} value={k}>
                  {BIZ_LABEL[k]}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="lead-comment" className="mb-1.5 block text-[13.5px] font-semibold">
              Комментарий
            </label>
            <textarea
              id="lead-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Например: магазин 60 м², около 3 000 позиций, нужна касса и перенос из Excel"
              className={cx("field resize-none", comment && "text-[13px] font-mono leading-relaxed")}
            />
          </div>
          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4.5 w-4.5 accent-[#A3E635]"
            />
            <span className="text-[12.5px] leading-relaxed text-mut">
              Согласен(на) на обработку персональных данных в соответствии с политикой
              конфиденциальности
            </span>
          </label>
          {errors.consent && <p className="mt-1.5 text-[12px] text-err">{errors.consent}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary mt-6 w-full disabled:opacity-70">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" />
                Отправляем…
              </span>
            ) : (
              <>
                <ISend size={17} />
                Получить расчёт
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

const CtaSection: FC<LeadProps> = ({ prefill, notify }) => (
  <section id="lead" className="scroll-mt-24 border-t border-line/60">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p className="eyebrow mb-3">[ 10 ] — заявка</p>
          <h2 className="h2">Получите расчёт стоимости под ваш бизнес</h2>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-mut">
            Опишите задачу — подготовим смету с точностью до позиции: лицензии,
            оборудование, перенос данных, обучение. Аудит бесплатный.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={CONTACTS.phoneHref}
              className="mi-card mi-card-hover flex items-center gap-4 p-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-lime/30 bg-lime/10 text-lime">
                <IPhone size={20} />
              </span>
              <span>
                <span className="block text-[13px] text-mut">Позвонить</span>
                <span className="font-mono text-[16.5px] font-bold text-ink">
                  {CONTACTS.phone}
                </span>
              </span>
              <span className="ml-auto font-mono text-[11px] text-dim">{CONTACTS.hours}</span>
            </a>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mi-card mi-card-hover flex items-center gap-3 p-4"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Z" />
                  <path d="M9 8.8c0 3.4 2.8 6.2 6.2 6.2l.8-1.6-2-1.2-1 .8a4.6 4.6 0 0 1-2.2-2.2l.8-1-1.2-2L9 8.8Z" />
                </svg>
                <span>
                  <span className="block text-[13px] text-mut">Написать в WhatsApp</span>
                  <span className="font-mono text-[13px] font-semibold text-ok">онлайн</span>
                </span>
              </a>
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mi-card mi-card-hover flex items-center gap-3 p-4"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20.5 4.5 3.5 11l5.5 2 2 6 3-4 5 3.5 1.5-14Z" />
                  <path d="m9 13 8.5-6.5" />
                </svg>
                <span>
                  <span className="block text-[13px] text-mut">Написать в Telegram</span>
                  <span className="font-mono text-[13px] font-semibold text-cyan">@microinvest_by</span>
                </span>
              </a>
            </div>
          </div>

          <p className="mt-6 font-mono text-[12px] leading-relaxed text-dim">
            Среднее время ответа — 28 минут в рабочие часы.
            <br />
            Без навязывания: если автоматизация не окупится — скажем прямо.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <LeadForm prefill={prefill} notify={notify} />
        </Reveal>
      </div>
    </div>
  </section>
);

export { Faq, CtaSection };

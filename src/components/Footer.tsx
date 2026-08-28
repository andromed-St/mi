import type { FC } from "react";
import { NICHES, PRODUCTS, CONTACTS, type BizType } from "../lib/data";
import { LogoMark, IPhone, IMail, IPin, IClock } from "./icons";
import { scrollToId } from "./Header";

const SOCIALS = [
  {
    label: "Telegram",
    href: CONTACTS.telegram,
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 4.5 3.5 11l5.5 2 2 6 3-4 5 3.5 1.5-14Z" />
        <path d="m9 13 8.5-6.5" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/microinvest_by",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <path d="M16.8 7.2h.01" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@microinvest_by",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12.5" rx="3.5" />
        <path d="m10.5 9.7 4.5 2.5-4.5 2.5v-5Z" />
      </svg>
    ),
  },
  {
    label: "ВКонтакте",
    href: "https://vk.com/microinvest_by",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3.5 7.5c.5 5 3.5 9.5 8 9.5v-3c2 0 3.5 1.6 4.5 3h4c-1-2.2-2.5-3.8-3.8-4.5 1.3-.9 2.6-2.6 3.3-5h-3.7c-.6 2-2 3.8-3.3 4V7.5H9v6.8C7.7 13.5 6.5 10.5 6.2 7.5H3.5Z" />
      </svg>
    ),
  },
];

const MiniMap: FC = () => (
  <div className="relative mt-4 h-24 overflow-hidden rounded-[10px] border border-line bg-panel">
    <svg viewBox="0 0 300 96" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="300" height="96" fill="#121922" />
      <g stroke="#1f2a36" strokeWidth="1">
        <path d="M0 24h300M0 48h300M0 72h300M40 0v96M90 0v96M150 0v96M205 0v96M255 0v96" />
      </g>
      <g stroke="#2c3a49" strokeWidth="3" strokeLinecap="round">
        <path d="M-5 66 90 52l70 8 90-16 60 10" />
        <path d="M60 -4l24 50 10 54" />
        <path d="M180 -4l-16 44 6 60" />
      </g>
      <circle cx="150" cy="48" r="16" fill="rgba(163,230,53,0.12)" />
      <circle cx="150" cy="48" r="7" fill="#A3E635" />
      <circle cx="150" cy="48" r="3" fill="#0D1117" />
    </svg>
    <span className="absolute bottom-2 left-2 rounded-md border border-line bg-bg/85 px-2 py-1 font-mono text-[9.5px] text-mut">
      Минск · Притыцкого 62Б
    </span>
  </div>
);

const Footer: FC<{
  onPickNiche: (t: BizType) => void;
  onPrivacy: () => void;
  onKnowledge: () => void;
}> = ({ onPickNiche, onPrivacy, onKnowledge }) => (
  <footer id="contacts" className="scroll-mt-24 border-t border-line bg-[#0a0e14]">
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        {/* бренд */}
        <div>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2.5">
            <LogoMark size={34} />
            <span className="text-[17px] font-extrabold tracking-tight">
              micro<span className="text-lime">invest</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-mut">
            Автоматизация торговли и общепита в Беларуси: локальные лицензии,
            работа без интернета, соответствие требованиям РБ.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-card text-mut transition hover:-translate-y-0.5 hover:border-cyan/60 hover:text-cyan"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* продукты */}
        <nav aria-label="Продукты">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Продукты</p>
          <ul className="mt-4 space-y-2.5">
            {PRODUCTS.filter((p) => p.cat === "program").map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => scrollToId("catalog")}
                  className="text-left text-[13.5px] text-mut transition hover:text-lime"
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* решения */}
        <nav aria-label="Решения">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Решения</p>
          <ul className="mt-4 space-y-2.5">
            {NICHES.map((n) => (
              <li key={n.title}>
                <button
                  onClick={() => onPickNiche(n.id)}
                  className="text-left text-[13.5px] text-mut transition hover:text-lime"
                >
                  {n.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* контакты */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Контакты</p>
          <ul className="mt-4 space-y-3 text-[13.5px]">
            <li>
              <a href={CONTACTS.phoneHref} className="flex items-center gap-2.5 font-mono text-[15px] font-bold text-ink transition hover:text-lime">
                <IPhone size={15} className="text-cyan" /> {CONTACTS.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5 text-mut">
              <IClock size={15} className="text-cyan" /> {CONTACTS.hours}
            </li>
            <li>
              <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-2.5 text-mut transition hover:text-cyan">
                <IMail size={15} className="text-cyan" /> {CONTACTS.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-mut">
              <IPin size={15} className="mt-0.5 shrink-0 text-cyan" /> {CONTACTS.address}
            </li>
            <li className="flex gap-2">
              <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="pill pill-offline transition hover:opacity-80">
                WhatsApp
              </a>
              <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="pill pill-new transition hover:opacity-80">
                Telegram
              </a>
            </li>
          </ul>
          <MiniMap />
        </div>
      </div>

      {/* нижняя строка */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/70 pt-6 md:flex-row">
        <p className="text-center text-[12.5px] text-dim md:text-left">
          © 2016–2026 ООО «Микроинвест» · УНП 192745831 · Все цены указаны в белорусских рублях
        </p>
        <div className="flex items-center gap-5">
          <button onClick={onPrivacy} className="text-[12.5px] text-dim transition hover:text-cyan">
            Политика конфиденциальности
          </button>
          <button onClick={onKnowledge} className="text-[12.5px] text-dim transition hover:text-cyan">
            База знаний
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

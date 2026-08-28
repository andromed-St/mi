import { useEffect, useRef, useState, type FC } from "react";
import {
  NICHES,
  PRODUCTS,
  CONTACTS,
  type BizType,
  type Cat,
} from "../lib/data";
import {
  LogoMark,
  IBurger,
  IClose,
  IChevron,
  ICart,
  IPhone,
  IMail,
  IPin,
} from "./icons";
import { cx } from "./kit";

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

interface Props {
  cartCount: number;
  bumpKey: number;
  onOpenCart: () => void;
  onPickNiche: (t: BizType) => void;
  onCatalogFilter: (c: Cat) => void;
  onKnowledge: () => void;
}

interface NavChild {
  label: string;
  hint?: string;
  action: () => void;
}
interface NavItem {
  label: string;
  children?: NavChild[];
  action?: () => void;
}

const EQUIPMENT_GROUPS = [
  "КСА (кассовые аппараты)",
  "Сканеры штрих-кодов",
  "Весы",
  "Принтеры чеков",
  "POS-терминалы",
];

const Header: FC<Props> = ({
  cartCount,
  bumpKey,
  onOpenCart,
  onPickNiche,
  onCatalogFilter,
  onKnowledge,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>("Решения");
  const navRef = useRef<HTMLElement>(null);

  const nav: NavItem[] = [
    {
      label: "Решения",
      children: NICHES.map((n) => ({
        label: n.title,
        action: () => onPickNiche(n.id),
      })),
    },
    {
      label: "Продукты",
      children: PRODUCTS.filter((p) => p.cat === "program").map((p) => ({
        label: p.name,
        action: () => onCatalogFilter("program"),
      })),
    },
    {
      label: "Оборудование",
      children: EQUIPMENT_GROUPS.map((g) => ({
        label: g,
        action: () => onCatalogFilter("equipment"),
      })),
    },
    { label: "Комплекты", action: () => onCatalogFilter("bundle") },
    { label: "Калькулятор", action: () => scrollToId("calculator") },
    { label: "Кейсы", action: () => scrollToId("cases") },
    { label: "База знаний", action: onKnowledge },
    { label: "Контакты", action: () => scrollToId("contacts") },
  ];

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const runAnd = (fn: () => void) => {
    setOpenMenu(null);
    setMobileOpen(false);
    fn();
  };

  return (
    <>
      {/* верхняя контактная полоса */}
      <div className="relative z-50 hidden border-b border-line/70 bg-[#0a0e14] md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 font-mono text-[11.5px] tracking-wide text-dim">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <IPin size={13} className="text-cyan" />
              Минск · работаем по всей Беларуси
            </span>
            <span className="hidden items-center gap-1.5 lg:flex">
              <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-ok" />
              офлайн-решения: кассы работают без интернета
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-1.5 transition hover:text-cyan">
              <IMail size={13} /> {CONTACTS.email}
            </a>
            <a href={CONTACTS.phoneHref} className="flex items-center gap-1.5 transition hover:text-lime">
              <IPhone size={13} /> {CONTACTS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* основная шапка */}
      <header
        ref={navRef}
        className="sticky top-0 z-50 border-b border-line/80 bg-bg/88 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
          <a
            href="#top"
            className="flex items-center gap-2.5"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <LogoMark size={32} />
            <span className="leading-none">
              <span className="block text-[16.5px] font-extrabold tracking-tight">
                micro<span className="text-lime">invest</span>
              </span>
              <span className="mt-0.5 block font-mono text-[9.5px] uppercase tracking-[0.22em] text-dim">
                автоматизация · BY
              </span>
            </span>
          </a>

          {/* desktop nav */}
          <nav className="ml-6 hidden items-center gap-0.5 lg:flex" aria-label="Основное меню">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    className={cx(
                      "flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium transition",
                      openMenu === item.label
                        ? "bg-panel text-cyan"
                        : "text-mut hover:bg-panel/70 hover:text-ink"
                    )}
                    onClick={() =>
                      setOpenMenu(openMenu === item.label ? null : item.label)
                    }
                    aria-expanded={openMenu === item.label}
                  >
                    {item.label}
                    <IChevron
                      size={13}
                      className={cx(
                        "transition-transform duration-200",
                        openMenu === item.label && "rotate-180"
                      )}
                    />
                  </button>
                  {openMenu === item.label && (
                    <div className="pop-in absolute left-0 top-full mt-2 min-w-[240px] rounded-xl border border-line bg-card p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,.75)]">
                      {item.children.map((c) => (
                        <button
                          key={c.label}
                          onClick={() => runAnd(c.action)}
                          className="group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] text-mut transition hover:bg-panel hover:text-ink"
                        >
                          {c.label}
                          <span className="font-mono text-[11px] text-cyan opacity-0 transition group-hover:opacity-100">
                            →
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => runAnd(item.action!)}
                  className="rounded-lg px-3 py-2 text-[13.5px] font-medium text-mut transition hover:bg-panel/70 hover:text-ink"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onOpenCart}
              aria-label={`Корзина, позиций: ${cartCount}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-card text-mut transition hover:border-cyan/60 hover:text-cyan"
            >
              <ICart size={19} />
              {cartCount > 0 && (
                <span
                  key={bumpKey}
                  className="cart-bump absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1 font-mono text-[10.5px] font-bold text-bg"
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => scrollToId("calculator")}
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Открыть меню"
              className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-card text-ink lg:hidden"
            >
              <IBurger size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* мобильное меню */}
      {mobileOpen && (
        <div className="fade-in fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-line px-4">
            <span className="flex items-center gap-2.5">
              <LogoMark size={30} />
              <span className="text-[16px] font-extrabold tracking-tight">
                micro<span className="text-lime">invest</span>
              </span>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Закрыть меню"
              className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line text-ink"
            >
              <IClose size={20} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Мобильное меню">
            {nav.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-line/60">
                  <button
                    className="flex w-full items-center justify-between py-3.5 text-[15px] font-semibold"
                    onClick={() =>
                      setMobileGroup(mobileGroup === item.label ? null : item.label)
                    }
                    aria-expanded={mobileGroup === item.label}
                  >
                    {item.label}
                    <IChevron
                      size={16}
                      className={cx(
                        "text-dim transition-transform",
                        mobileGroup === item.label && "rotate-180 text-cyan"
                      )}
                    />
                  </button>
                  <div className={cx("acc-body", mobileGroup === item.label && "open")}>
                    <div>
                      <div className="pb-3">
                        {item.children.map((c) => (
                          <button
                            key={c.label}
                            onClick={() => runAnd(c.action)}
                            className="block w-full rounded-lg px-3 py-2.5 text-left text-[14px] text-mut transition active:bg-panel"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => runAnd(item.action!)}
                  className="block w-full border-b border-line/60 py-3.5 text-left text-[15px] font-semibold"
                >
                  {item.label}
                </button>
              )
            )}
            <div className="mt-5 space-y-2 font-mono text-[12.5px] text-dim">
              <a href={CONTACTS.phoneHref} className="flex items-center gap-2 py-1 text-mut">
                <IPhone size={14} className="text-cyan" /> {CONTACTS.phone}
              </a>
              <p className="flex items-center gap-2 py-1">
                <IMail size={14} className="text-cyan" /> {CONTACTS.email}
              </p>
              <p className="flex items-start gap-2 py-1">
                <IPin size={14} className="mt-0.5 text-cyan" /> {CONTACTS.address}
              </p>
            </div>
          </nav>
          <div className="border-t border-line bg-card p-4">
            <button
              onClick={() => runAnd(() => scrollToId("calculator"))}
              className="btn btn-primary w-full"
            >
              Рассчитать стоимость
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

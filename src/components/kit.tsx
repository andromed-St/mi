import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FC,
} from "react";
import { BADGE_LABEL, type BadgeKind, type Mark } from "../lib/data";
import { ICheckCircle, IWarn, IXCircle, IClose } from "./icons";

export const cx = (...a: (string | false | null | undefined)[]) =>
  a.filter(Boolean).join(" ");

/* ---------------- Reveal: появление при скролле ------------------- */

export const Reveal: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx("reveal", inView && "is-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

/* ---------------- Заголовок секции ---------------- */

export const SectionHead: FC<{
  eyebrow: string;
  title: string;
  desc?: string;
  id?: string;
}> = ({ eyebrow, title, desc }) => (
  <Reveal className="mb-10 md:mb-12">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="h2">{title}</h2>
      </div>
      {desc && <p className="max-w-sm text-[15px] leading-relaxed text-mut">{desc}</p>}
    </div>
  </Reveal>
);

/* ---------------- Бейджи ---------------- */

const PILL_CLASS: Record<BadgeKind, string> = {
  hit: "pill-hit",
  new: "pill-new",
  sale: "pill-sale",
  offline: "pill-offline",
  local: "pill-local",
};

export const Pill: FC<{ kind: BadgeKind; className?: string }> = ({ kind, className }) => (
  <span className={cx("pill", PILL_CLASS[kind], className)}>{BADGE_LABEL[kind]}</span>
);

/* ---------------- Маркер сравнения ---------------- */

export const MarkIcon: FC<{ mark: Mark }> = ({ mark }) => {
  if (mark === "ok")
    return <ICheckCircle size={19} className="mt-0.5 shrink-0 text-ok" />;
  if (mark === "warn") return <IWarn size={19} className="mt-0.5 shrink-0 text-warn" />;
  return <IXCircle size={19} className="mt-0.5 shrink-0 text-err" />;
};

/* ---------------- Модальное окно ---------------- */

export const Modal: FC<{
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  label: string;
}> = ({ onClose, children, wide, label }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fade-in fixed inset-0 z-[70] flex items-end justify-center bg-[#060a0f]/78 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className={cx(
          "pop-in relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-line bg-card shadow-[0_40px_90px_-20px_rgba(0,0,0,.8)] sm:rounded-[16px]",
          wide ? "sm:max-w-3xl" : "sm:max-w-xl"
        )}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-panel text-mut transition hover:border-cyan/60 hover:text-ink"
        >
          <IClose size={16} />
        </button>
        {children}
      </div>
    </div>
  );
};

/* ---------------- Тосты ---------------- */

export interface ToastItem {
  id: number;
  msg: string;
  kind: "ok" | "info";
}

export const ToastStack: FC<{ items: ToastItem[]; onClose: (id: number) => void }> = ({
  items,
  onClose,
}) => (
  <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-[min(360px,calc(100vw-40px))] flex-col gap-2.5">
    {items.map((t) => (
      <div
        key={t.id}
        className={cx(
          "toast-in pointer-events-auto flex items-start gap-3 rounded-xl border bg-panel/95 p-3.5 pr-3 shadow-[0_16px_40px_-10px_rgba(0,0,0,.7)] backdrop-blur",
          t.kind === "ok" ? "border-lime/35" : "border-cyan/35"
        )}
        role="status"
      >
        <span
          className={cx(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
            t.kind === "ok" ? "bg-lime/15 text-lime" : "bg-cyan/15 text-cyan"
          )}
        >
          <ICheckCircle size={15} />
        </span>
        <p className="flex-1 text-[13.5px] leading-snug text-ink">{t.msg}</p>
        <button
          onClick={() => onClose(t.id)}
          aria-label="Скрыть уведомление"
          className="text-dim transition hover:text-ink"
        >
          <IClose size={14} />
        </button>
      </div>
    ))}
  </div>
);

/* ---------------- Иконка-плитка ---------------- */

export const IconTile: FC<{
  icon: FC<{ size?: number; className?: string }>;
  tone?: "cyan" | "lime" | "vio";
  size?: "sm" | "md";
}> = ({ icon: Icon, tone = "cyan", size = "md" }) => (
  <span
    className={cx(
      "flex shrink-0 items-center justify-center rounded-[10px] border",
      size === "md" ? "h-11 w-11" : "h-9 w-9",
      tone === "cyan" && "border-cyan/25 bg-cyan/10 text-cyan",
      tone === "lime" && "border-lime/25 bg-lime/10 text-lime",
      tone === "vio" && "border-vio/25 bg-vio/10 text-vio"
    )}
  >
    <Icon size={size === "md" ? 21 : 17} />
  </span>
);

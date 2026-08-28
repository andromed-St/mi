import type { FC } from "react";
import {
  COMPARE_ROWS,
  COMPARE_ROWS_EXTRA,
  CASES,
  PRODUCTS,
  byn,
  type CaseItem,
} from "../lib/data";
import { Modal, MarkIcon, Pill, cx } from "./kit";
import { ICart, IMinus, IPlus, ITrash, IClose, IArrow } from "./icons";
import { scrollToId } from "./Header";

/* ------------------- полное сравнение ------------------- */

export const CompareModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const rows = [...COMPARE_ROWS, ...COMPARE_ROWS_EXTRA];
  return (
    <Modal onClose={onClose} wide label="Полное сравнение локального и облачного решения">
      <div className="p-7 sm:p-8">
        <p className="eyebrow">полное сравнение</p>
        <h3 className="mt-2 text-[22px] font-bold tracking-tight sm:text-[24px]">
          Локальная лицензия против облачной подписки
        </h3>
        <div className="table-scroll mt-6 rounded-[10px] border border-line">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-panel">
                <th className="border-b border-line px-4 py-3 text-[12px] font-semibold uppercase tracking-wider text-dim">
                  Параметр
                </th>
                <th className="border-b border-line px-4 py-3 text-[12px] font-bold uppercase tracking-wider text-lime">
                  Локальное
                </th>
                <th className="border-b border-line px-4 py-3 text-[12px] font-semibold uppercase tracking-wider text-mut">
                  Облачная подписка
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.param} className={cx(i !== rows.length - 1 && "border-b border-line/70")}>
                  <td className="px-4 py-3 text-[13.5px] font-semibold">{r.param}</td>
                  <td className="bg-lime/[0.035] px-4 py-3">
                    <span className="flex items-start gap-2 text-[13px]">
                      <MarkIcon mark={r.local.mark} />
                      {r.local.text}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-start gap-2 text-[13px] text-mut">
                      <MarkIcon mark={r.cloud.mark} />
                      {r.cloud.text}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11.5px] text-dim">
            Хотите посчитать экономию на 3 года для вашей сети?
          </p>
          <button
            onClick={() => {
              onClose();
              scrollToId("calculator");
            }}
            className="btn btn-primary btn-sm"
          >
            Рассчитать стоимость
          </button>
        </div>
      </div>
    </Modal>
  );
};

/* ----------------------- кейс ------------------- */

export const CaseModal: FC<{ item: CaseItem; onClose: () => void }> = ({ item, onClose }) => (
  <Modal onClose={onClose} wide label={`Кейс: ${item.title}`}>
    {item.photo && (
      <div className="relative h-52 overflow-hidden rounded-t-2xl border-b border-line sm:h-64 sm:rounded-t-[16px]">
        <img src={item.photo} alt={item.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11161d] via-transparent to-transparent" />
      </div>
    )}
    <div className="p-7 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="pill pill-new">{item.biz}</span>
        <span className="pill pill-offline">локальное решение</span>
      </div>
      <h3 className="mt-3 text-[22px] font-bold tracking-tight">{item.title}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-mut">
        <span className="font-semibold text-ink">Задача: </span>
        {item.task}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {item.results.map((r) => (
          <div key={r.label} className="rounded-[12px] border border-line bg-panel p-4">
            <p className="font-mono text-[24px] font-bold leading-none text-lime">{r.value}</p>
            <p className="mt-1.5 text-[12px] leading-snug text-mut">{r.label}</p>
          </div>
        ))}
      </div>

      <blockquote className="mt-6 border-l-2 border-cyan/60 pl-4 text-[14.5px] italic leading-relaxed text-mut">
        «{item.quote}»
      </blockquote>

      <button
        onClick={() => {
          onClose();
          scrollToId("lead");
        }}
        className="btn btn-primary mt-7 w-full sm:w-auto"
      >
        Обсудить похожий проект
        <IArrow size={16} />
      </button>
    </div>
  </Modal>
);

/* -------------------- все кейсы ------------------- */

export const AllCasesModal: FC<{
  onClose: () => void;
  onCaseOpen: (id: string) => void;
}> = ({ onClose, onCaseOpen }) => (
  <Modal onClose={onClose} wide label="Все кейсы внедрения">
    <div className="p-7 sm:p-8">
      <p className="eyebrow">кейсы внедрения</p>
      <h3 className="mt-2 text-[22px] font-bold tracking-tight sm:text-[24px]">Все проекты</h3>
      <div className="mt-6 space-y-3">
        {CASES.map((c) => (
          <button
            key={c.id}
            onClick={() => onCaseOpen(c.id)}
            className="mi-card mi-card-hover flex w-full items-center gap-4 p-4 text-left"
          >
            <span className="pill pill-new shrink-0">{c.biz}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14.5px] font-semibold">{c.title}</span>
              <span className="block text-[12.5px] text-mut">{c.metricNote}</span>
            </span>
            <span className="shrink-0 font-mono text-[17px] font-bold text-lime">{c.metric}</span>
            <IArrow size={15} className="shrink-0 text-dim" />
          </button>
        ))}
      </div>
    </div>
  </Modal>
);

/* -------------------- политика ------------------- */

export const PrivacyModal: FC<{ onClose: () => void }> = ({ onClose }) => (
  <Modal onClose={onClose} label="Политика конфиденциальности">
    <div className="p-7 sm:p-8">
      <p className="eyebrow">документ</p>
      <h3 className="mt-2 text-[22px] font-bold tracking-tight">Политика конфиденциальности</h3>
      <div className="mt-5 space-y-4 text-[14px] leading-relaxed text-mut">
        <p>
          ООО «Микроинвест» обрабатывает персональные данные (имя, телефон, комментарий)
          исключительно для подготовки коммерческого предложения и связи по заявке —
          в соответствии с Законом РБ № 99-З «О защите персональных данных».
        </p>
        <p>
          Данные не передаются третьим лицам, не используются для рассылок без согласия
          и удаляются по первому запросу на {`info@microinvest.by`}.
        </p>
        <p>
          Продолжая пользоваться сайтом и отправляя формы, вы даёте согласие на обработку
          указанных данных. Согласие можно отозвать в любой момент.
        </p>
      </div>
      <button onClick={onClose} className="btn btn-secondary btn-sm mt-6">
        Понятно
      </button>
    </div>
  </Modal>
);

/* --------------------- корзина ------------------- */

export interface CartLine {
  id: string;
  qty: number;
}

export const CartDrawer: FC<{
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
  onGoCatalog: () => void;
}> = ({ open, lines, onClose, onQty, onRemove, onClear, onCheckout, onGoCatalog }) => {
  if (!open) return null;

  const items = lines
    .map((l) => ({ line: l, product: PRODUCTS.find((p) => p.id === l.id)! }))
    .filter((x) => x.product);
  const total = items.reduce((s, x) => s + (x.product.price ?? 0) * x.line.qty, 0);

  return (
    <div
      className="fade-in fixed inset-0 z-[65] bg-[#060a0f]/70 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Корзина"
    >
      <aside className="pop-in absolute right-0 top-0 flex h-full w-full max-w-[400px] flex-col border-l border-line bg-card shadow-[-30px_0_80px_-20px_rgba(0,0,0,.8)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h3 className="flex items-center gap-2.5 text-[17px] font-bold">
            <ICart size={19} className="text-lime" />
            Корзина
            <span className="font-mono text-[12px] font-normal text-dim">
              {items.length} поз.
            </span>
          </h3>
          <button
            onClick={onClose}
            aria-label="Закрыть корзину"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mut transition hover:text-ink"
          >
            <IClose size={15} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-panel text-dim">
              <ICart size={26} />
            </span>
            <p className="text-[14.5px] leading-relaxed text-mut">
              Корзина пуста. Добавьте лицензии или оборудование из каталога.
            </p>
            <button
              onClick={() => {
                onClose();
                onGoCatalog();
              }}
              className="btn btn-secondary btn-sm"
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map(({ line, product }) => (
                <div key={line.id} className="rounded-[12px] border border-line bg-panel p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13.5px] font-semibold leading-snug">{product.name}</p>
                    <button
                      onClick={() => onRemove(line.id)}
                      aria-label={`Убрать ${product.name}`}
                      className="text-dim transition hover:text-err"
                    >
                      <ITrash size={15} />
                    </button>
                  </div>
                  <p className="mt-0.5 font-mono text-[10.5px] text-dim">SKU: {product.sku}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onQty(line.id, -1)}
                        aria-label="Меньше"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-mut transition hover:border-cyan/50 hover:text-ink"
                      >
                        <IMinus size={13} />
                      </button>
                      <span className="w-8 text-center font-mono text-[14px] font-bold">
                        {line.qty}
                      </span>
                      <button
                        onClick={() => onQty(line.id, 1)}
                        aria-label="Больше"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-mut transition hover:border-cyan/50 hover:text-ink"
                      >
                        <IPlus size={13} />
                      </button>
                    </div>
                    <span className="font-mono text-[14.5px] font-bold text-lime">
                      {byn((product.price ?? 0) * line.qty)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-line bg-panel/60 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[13.5px] text-mut">Итого</span>
                <span className="font-mono text-[22px] font-bold text-lime">{byn(total)}</span>
              </div>
              <p className="mt-1 text-[11.5px] text-dim">
                Счёт с реквизитами и договором — в течение часа
              </p>
              <button onClick={onCheckout} className="btn btn-primary mt-4 w-full">
                Запросить счёт
              </button>
              <button onClick={onClear} className="btn btn-ghost btn-sm mt-2 w-full">
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

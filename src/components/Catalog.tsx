import { useMemo, useState, type FC } from "react";
import { PRODUCTS, byn, type Cat, type Product } from "../lib/data";
import { ICONS, ICart, IPlus } from "./icons";
import { Pill, Reveal, SectionHead, cx } from "./kit";

export type CatFilter = Cat | "all";

const CATS: { value: CatFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "program", label: "Программы" },
  { value: "equipment", label: "Оборудование" },
  { value: "bundle", label: "Комплекты" },
];

type Sort = "default" | "cheap" | "expensive" | "new";

const SORTS: { value: Sort; label: string }[] = [
  { value: "default", label: "По умолчанию" },
  { value: "cheap", label: "Сначала дешёвые" },
  { value: "expensive", label: "Сначала дорогие" },
  { value: "new", label: "По новизне" },
];

interface Props {
  filter: CatFilter;
  onFilter: (c: CatFilter) => void;
  onAdd: (p: Product) => void;
  onRequest: (p: Product) => void;
  onPriceList: () => void;
}

const Catalog: FC<Props> = ({ filter, onFilter, onAdd, onRequest, onPriceList }) => {
  const [sort, setSort] = useState<Sort>("default");

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) => filter === "all" || p.cat === filter);
    if (sort === "cheap") list = [...list].sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
    if (sort === "expensive") list = [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    if (sort === "new")
      list = [...list].sort(
        (a, b) =>
          Number(b.badges?.includes("new") ?? false) - Number(a.badges?.includes("new") ?? false)
      );
    return list;
  }, [filter, sort]);

  return (
    <section id="catalog" className="scroll-mt-24 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          eyebrow="[ 04 ] — каталог"
          title="Продукты и лицензии"
          desc="Разовые лицензии и оборудование с гарантией. Цены указаны с установкой базовой настройки."
        />

        {/* панель управления каталогом */}
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Фильтр по типу">
              {CATS.map((c) => (
                <button
                  key={c.value}
                  role="tab"
                  aria-selected={filter === c.value}
                  onClick={() => onFilter(c.value)}
                  className={cx(
                    "rounded-full border px-4 py-2 text-[13.5px] font-semibold transition",
                    filter === c.value
                      ? "border-lime bg-lime text-bg shadow-[0_8px_22px_-8px_rgba(163,230,53,.5)]"
                      : "border-line bg-card text-mut hover:border-cyan/50 hover:text-ink"
                  )}
                >
                  {c.label}
                  <span
                    className={cx(
                      "ml-2 font-mono text-[11px]",
                      filter === c.value ? "text-bg/70" : "text-dim"
                    )}
                  >
                    {c.value === "all"
                      ? PRODUCTS.length
                      : PRODUCTS.filter((p) => p.cat === c.value).length}
                  </span>
                </button>
              ))}
            </div>
            <label className="flex items-center gap-3 text-[13px] text-mut">
              Сортировка
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="field w-auto min-w-[190px] py-2.5! text-[13.5px]"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>

        {/* сетка товаров */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <article className="mi-card mi-card-hover group flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-14 w-14 items-center justify-center rounded-[12px] border border-line bg-panel text-cyan transition-colors group-hover:border-cyan/50">
                      <Icon size={26} />
                    </span>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {p.badges?.map((b) => <Pill key={b} kind={b} />)}
                    </div>
                  </div>

                  <h3 className="mt-4 text-[17.5px] font-bold leading-snug tracking-tight">
                    {p.name}
                  </h3>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
                    SKU: {p.sku}
                  </p>
                  <p className="clamp-2 mt-2.5 flex-1 text-[13.5px] leading-relaxed text-mut">
                    {p.desc}
                  </p>

                  <div className="mt-4 flex items-baseline gap-2.5">
                    {p.price !== null ? (
                      <>
                        <span className="font-mono text-[21px] font-bold text-lime">
                          {p.price ? `от ${byn(p.price)}` : "—"}
                        </span>
                        {p.old && (
                          <span className="font-mono text-[13px] text-dim line-through">
                            {byn(p.old)}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="font-mono text-[15px] font-semibold text-cyan">
                        цена по запросу
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => (p.price !== null ? onAdd(p) : onRequest(p))}
                    className={cx("btn btn-sm mt-4 w-full", p.price !== null ? "btn-primary" : "btn-secondary")}
                  >
                    {p.price !== null ? (
                      <>
                        <ICart size={16} /> В корзину
                      </>
                    ) : (
                      <>
                        <IPlus size={16} /> Запросить цену
                      </>
                    )}
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-3">
          <p className="font-mono text-[12px] text-dim">
            показано {items.length} из {PRODUCTS.length} позиций · оборудование в наличии на складе в Минске
          </p>
          <button onClick={onPriceList} className="btn btn-ghost btn-sm">
            Не нашли нужное? Запросить прайс-лист
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export default Catalog;

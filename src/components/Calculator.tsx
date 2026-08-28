import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FC,
} from "react";
import {
  CALC_CONFIG,
  CALC_INCLUDED_BASE,
  BIZ_LABEL,
  byn,
  plural,
  type BizType,
} from "../lib/data";
import { ICheck } from "./icons";
import { Reveal, SectionHead, cx } from "./kit";

export interface CalcPreset {
  type: BizType;
  ts: number;
}
export interface CalcSummary {
  comment: string;
  type: BizType;
}

/* плавная анимация числа результата */
const useAnimatedNumber = (target: number) => {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 520;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value;
};

const CheckRow: FC<{
  checked: boolean;
  onChange: () => void;
  label: string;
  price: number;
}> = ({ checked, onChange, label, price }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={onChange}
    className={cx(
      "flex w-full items-center gap-3 rounded-[10px] border px-3.5 py-3 text-left transition",
      checked
        ? "border-lime/50 bg-lime/[0.06]"
        : "border-line bg-panel hover:border-cyan/40"
    )}
  >
    <span
      className={cx(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition",
        checked ? "border-lime bg-lime text-bg" : "border-line bg-card text-transparent"
      )}
    >
      <ICheck size={13} strokeWidth={3} />
    </span>
    <span className="flex-1 text-[14px] font-medium">{label}</span>
    <span className={cx("font-mono text-[12.5px]", checked ? "text-lime" : "text-dim")}>
      +{byn(price)}
    </span>
  </button>
);

const TYPES = Object.entries(CALC_CONFIG.typePrices) as [
  BizType,
  { price: number; product: string }
][];

const Calculator: FC<{ preset: CalcPreset | null; onSubmit: (s: CalcSummary) => void }> = ({
  preset,
  onSubmit,
}) => {
  const [type, setType] = useState<BizType>("magazin");
  const [locations, setLocations] = useState(1);
  const [equipment, setEquipment] = useState<Set<string>>(new Set(["kassa", "scanner"]));
  const [options, setOptions] = useState<Set<string>>(new Set());
  const [workplaces, setWorkplaces] = useState(2);

  useEffect(() => {
    if (preset) setType(preset.type);
  }, [preset]);

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  };

  const calc = useMemo(() => {
    const base = CALC_CONFIG.typePrices[type].price;
    const eq = CALC_CONFIG.equipment.filter((e) => equipment.has(e.id));
    const op = CALC_CONFIG.options.filter((o) => options.has(o.id));
    const eqSum = eq.reduce((s, e) => s + e.price, 0);
    const opSum = op.reduce((s, o) => s + o.price, 0);
    const wpSum = Math.max(0, workplaces - 1) * CALC_CONFIG.workplacePrice;
    const perPoint = base + eqSum + opSum + wpSum;
    const total = perPoint * locations;

    const included: string[] = [CALC_CONFIG.typePrices[type].product];
    eq.forEach((e) => included.push(e.label));
    op.forEach((o) => included.push(o.label));
    if (workplaces > 1)
      included.push(
        `Дополнительные рабочие места × ${workplaces - 1}`
      );
    included.push(...CALC_INCLUDED_BASE);

    return { base, eq, op, eqSum, opSum, wpSum, perPoint, total, included };
  }, [type, locations, equipment, options, workplaces]);

  const animated = useAnimatedNumber(calc.total);

  const handleSubmit = () => {
    const eqTxt = calc.eq.length ? calc.eq.map((e) => e.label).join("; ") : "без доп. оборудования";
    const opTxt = calc.op.length ? calc.op.map((o) => o.label).join("; ") : "без доп. опций";
    onSubmit({
      type,
      comment: `Заявка из калькулятора: ${BIZ_LABEL[type]}, точек — ${locations}, рабочих мест — ${workplaces}. Оборудование: ${eqTxt}. Опции: ${opTxt}. Предварительно: от ${byn(
        calc.total
      )}.`,
    });
  };

  const locPct = ((locations - 1) / 9) * 100;
  const wpClamp = (v: number) => Math.min(20, Math.max(1, v));

  return (
    <section id="calculator" className="scroll-mt-24 border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionHead
          eyebrow="[ 06 ] — калькулятор"
          title="Рассчитайте предварительную стоимость автоматизации"
          desc="Пересчёт в реальном времени. Точную смету подготовим после бесплатного аудита задач."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* форма */}
          <Reveal>
            <div className="mi-card space-y-7 p-6 sm:p-8">
              {/* тип бизнеса */}
              <div>
                <label htmlFor="calc-type" className="mb-2 block text-[14px] font-semibold">
                  Тип бизнеса
                </label>
                <select
                  id="calc-type"
                  value={type}
                  onChange={(e) => setType(e.target.value as BizType)}
                  className="field"
                >
                  {TYPES.map(([key, v]) => (
                    <option key={key} value={key}>
                      {BIZ_LABEL[key]} — база от {byn(v.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* точки */}
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label htmlFor="calc-loc" className="text-[14px] font-semibold">
                    Количество точек
                  </label>
                  <output
                    htmlFor="calc-loc"
                    className="font-mono text-[22px] font-bold text-lime"
                  >
                    {locations}
                  </output>
                </div>
                <input
                  id="calc-loc"
                  type="range"
                  min={1}
                  max={10}
                  value={locations}
                  onChange={(e) => setLocations(Number(e.target.value))}
                  className="range"
                  style={{ "--fill": `${locPct}%` } as CSSProperties}
                />
                <div className="mt-1.5 flex justify-between font-mono text-[10.5px] text-dim">
                  <span>1 точка</span>
                  <span>10 точек</span>
                </div>
              </div>

              {/* оборудование */}
              <fieldset>
                <legend className="mb-2.5 text-[14px] font-semibold">
                  Оборудование{" "}
                  <span className="font-normal text-dim">— на каждую точку</span>
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CALC_CONFIG.equipment.map((e) => (
                    <CheckRow
                      key={e.id}
                      checked={equipment.has(e.id)}
                      onChange={() => setEquipment(toggle(equipment, e.id))}
                      label={e.label}
                      price={e.price}
                    />
                  ))}
                </div>
              </fieldset>

              {/* опции */}
              <fieldset>
                <legend className="mb-2.5 text-[14px] font-semibold">
                  Дополнительные опции
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CALC_CONFIG.options.map((o) => (
                    <CheckRow
                      key={o.id}
                      checked={options.has(o.id)}
                      onChange={() => setOptions(toggle(options, o.id))}
                      label={o.label}
                      price={o.price}
                    />
                  ))}
                </div>
              </fieldset>

              {/* рабочие места */}
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <label htmlFor="calc-wp" className="mb-2 block text-[14px] font-semibold">
                    Количество рабочих мест{" "}
                    <span className="font-normal text-dim">(на точку)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Меньше рабочих мест"
                      onClick={() => setWorkplaces((w) => wpClamp(w - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-panel text-mut transition hover:border-cyan/50 hover:text-ink"
                    >
                      −
                    </button>
                    <input
                      id="calc-wp"
                      type="number"
                      min={1}
                      max={20}
                      value={workplaces}
                      onChange={(e) => setWorkplaces(wpClamp(Number(e.target.value) || 1))}
                      className="field w-20 text-center font-mono text-[16px] font-bold"
                    />
                    <button
                      type="button"
                      aria-label="Больше рабочих мест"
                      onClick={() => setWorkplaces((w) => wpClamp(w + 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-line bg-panel text-mut transition hover:border-cyan/50 hover:text-ink"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="max-w-[240px] font-mono text-[11px] leading-relaxed text-dim">
                  первое рабочее место включено в лицензию, каждое следующее +
                  {byn(CALC_CONFIG.workplacePrice)}
                </p>
              </div>
            </div>
          </Reveal>

          {/* результат */}
          <Reveal delay={120}>
            <aside className="mi-card sticky top-24 overflow-hidden">
              <div className="border-b border-line bg-panel px-6 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                  предварительная стоимость
                </p>
                <p className="mt-1.5 flex items-baseline gap-2">
                  <span className="font-mono text-[13px] text-mut">от</span>
                  <span
                    key={animated}
                    className="font-mono text-[34px] font-bold leading-none text-lime sm:text-[38px]"
                  >
                    {byn(animated)}
                  </span>
                </p>
                <p className="mt-1.5 text-[12.5px] text-mut">
                  разовый платёж · {locations}{" "}
                  {plural(locations, ["точка", "точки", "точек"])} ×{" "}
                  {workplaces} {plural(workplaces, ["рабочее место", "рабочих места", "рабочих мест"])}
                </p>
              </div>

              <div className="space-y-2 px-6 py-5 font-mono text-[12.5px]">
                <div className="flex justify-between gap-4 text-mut">
                  <span>{CALC_CONFIG.typePrices[type].product}</span>
                  <span className="text-ink">{byn(calc.base)}</span>
                </div>
                {calc.eq.map((e) => (
                  <div key={e.id} className="flex justify-between gap-4 text-mut">
                    <span>{e.label}</span>
                    <span className="text-ink">+{byn(e.price)}</span>
                  </div>
                ))}
                {calc.op.map((o) => (
                  <div key={o.id} className="flex justify-between gap-4 text-mut">
                    <span>{o.label}</span>
                    <span className="text-ink">+{byn(o.price)}</span>
                  </div>
                ))}
                {calc.wpSum > 0 && (
                  <div className="flex justify-between gap-4 text-mut">
                    <span>Рабочие места +{workplaces - 1}</span>
                    <span className="text-ink">+{byn(calc.wpSum)}</span>
                  </div>
                )}
                {locations > 1 && (
                  <div className="flex justify-between gap-4 border-t border-dashed border-line pt-2 text-cyan">
                    <span>× {locations} {plural(locations, ["точка", "точки", "точек"])}</span>
                    <span>{byn(calc.total)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-line bg-card px-6 py-5">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
                  в состав входит
                </p>
                <ul className="space-y-2">
                  {calc.included.map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-mut">
                      <ICheck size={14} className="mt-0.5 shrink-0 text-lime" strokeWidth={2.6} />
                      {line}
                    </li>
                  ))}
                </ul>
                <button onClick={handleSubmit} className="btn btn-primary mt-6 w-full">
                  Получить точный расчёт
                </button>
                <p className="mt-3 text-center text-[12px] leading-relaxed text-dim">
                  Смета после аудита — бесплатно и без обязательств
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Calculator;

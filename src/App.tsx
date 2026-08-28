import { useCallback, useRef, useState } from "react";
import Header, { scrollToId } from "./components/Header";
import Hero from "./components/Hero";
import WhyCompare from "./components/WhyCompare";
import NichesTimeline from "./components/NichesTimeline";
import Catalog, { type CatFilter } from "./components/Catalog";
import Calculator, { type CalcPreset, type CalcSummary } from "./components/Calculator";
import CasesReviews from "./components/CasesReviews";
import { Faq, CtaSection } from "./components/FaqCta";
import Footer from "./components/Footer";
import {
  CompareModal,
  CaseModal,
  AllCasesModal,
  PrivacyModal,
  CartDrawer,
  type CartLine,
} from "./components/Modals";
import { ToastStack, type ToastItem } from "./components/kit";
import { CASES, type BizType, type Product } from "./lib/data";

type ModalState =
  | { kind: "compare" }
  | { kind: "case"; id: string }
  | { kind: "cases" }
  | { kind: "privacy" }
  | null;

export default function App() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [bumpKey, setBumpKey] = useState(0);
  const [calcPreset, setCalcPreset] = useState<CalcPreset | null>(null);
  const [catalogFilter, setCatalogFilter] = useState<CatFilter>("all");
  const [leadPrefill, setLeadPrefill] = useState<(CalcSummary & { ts: number }) | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const toastId = useRef(0);

  /* ---------- уведомления ---------- */
  const notify = useCallback((msg: string, kind: "ok" | "info" = "ok") => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, msg, kind }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  /* ---------- корзина ---------- */
  const addToCart = (p: Product) => {
    setCart((lines) => {
      const existing = lines.find((l) => l.id === p.id);
      return existing
        ? lines.map((l) => (l.id === p.id ? { ...l, qty: l.qty + 1 } : l))
        : [...lines, { id: p.id, qty: 1 }];
    });
    setBumpKey((k) => k + 1);
    notify(`«${p.name}» добавлен в корзину`);
  };

  const changeQty = (id: string, delta: number) =>
    setCart((lines) =>
      lines
        .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );

  const removeLine = (id: string) => setCart((lines) => lines.filter((l) => l.id !== id));

  const checkout = () => {
    setCart([]);
    setCartOpen(false);
    notify("Запрос на счёт отправлен — менеджер вышлет счёт и договор в течение часа");
  };

  /* ---------- навигационные действия ---------- */
  const pickNiche = (t: BizType) => {
    setCalcPreset({ type: t, ts: Date.now() });
    scrollToId("calculator");
  };

  const goCatalog = (c: CatFilter) => {
    setCatalogFilter(c);
    scrollToId("catalog");
  };

  const requestPrice = (p: Product) => {
    setLeadPrefill({
      type: "other",
      comment: `Интересует цена и сроки: ${p.name} (SKU: ${p.sku}).`,
      ts: Date.now(),
    });
    scrollToId("lead");
    notify("Добавили позицию в заявку — уточним цену и сроки");
  };

  const priceList = () => {
    setLeadPrefill({
      type: "other",
      comment: "Прошу выслать актуальный прайс-лист на программы и оборудование.",
      ts: Date.now(),
    });
    scrollToId("lead");
  };

  const calcSubmit = (s: CalcSummary) => {
    setLeadPrefill({ ...s, ts: Date.now() });
    scrollToId("lead");
    notify("Расчёт перенесён в форму заявки — укажите контакты");
  };

  const openCase = (id: string) => setModal({ kind: "case", id });

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const activeCase = modal?.kind === "case" ? CASES.find((c) => c.id === modal.id) : undefined;

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* амбиентные фоновые слои */}
      <div aria-hidden="true" className="bg-grid-layer pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="bg-noise pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10">
        <Header
          cartCount={cartCount}
          bumpKey={bumpKey}
          onOpenCart={() => setCartOpen(true)}
          onPickNiche={pickNiche}
          onCatalogFilter={goCatalog}
          onKnowledge={() =>
            notify("База знаний с инструкциями и видео доступна клиентам после внедрения", "info")
          }
        />

        <main>
          <Hero />
          <WhyCompare onFullCompare={() => setModal({ kind: "compare" })} />
          <NichesTimeline onPickNiche={pickNiche} />
          <Catalog
            filter={catalogFilter}
            onFilter={setCatalogFilter}
            onAdd={addToCart}
            onRequest={requestPrice}
            onPriceList={priceList}
          />
          <Calculator preset={calcPreset} onSubmit={calcSubmit} />
          <CasesReviews onCaseOpen={openCase} onAllCases={() => setModal({ kind: "cases" })} />
          <Faq />
          <CtaSection prefill={leadPrefill} notify={(m) => notify(m)} />
        </main>

        <Footer
          onPickNiche={pickNiche}
          onPrivacy={() => setModal({ kind: "privacy" })}
          onKnowledge={() =>
            notify("База знаний с инструкциями и видео доступна клиентам после внедрения", "info")
          }
        />
      </div>

      {/* модальные окна */}
      {modal?.kind === "compare" && <CompareModal onClose={() => setModal(null)} />}
      {modal?.kind === "cases" && (
        <AllCasesModal
          onClose={() => setModal(null)}
          onCaseOpen={(id) => {
            setModal({ kind: "case", id });
          }}
        />
      )}
      {activeCase && <CaseModal item={activeCase} onClose={() => setModal(null)} />}
      {modal?.kind === "privacy" && <PrivacyModal onClose={() => setModal(null)} />}

      <CartDrawer
        open={cartOpen}
        lines={cart}
        onClose={() => setCartOpen(false)}
        onQty={changeQty}
        onRemove={removeLine}
        onClear={() => {
          setCart([]);
          notify("Корзина очищена", "info");
        }}
        onCheckout={checkout}
        onGoCatalog={() => goCatalog("all")}
      />

      <ToastStack items={toasts} onClose={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
    </div>
  );
}

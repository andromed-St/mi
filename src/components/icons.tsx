import type { FC, SVGProps, ReactNode } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (p: P, children: ReactNode) => {
  const { size = 20, ...rest } = p;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
};

const mk = (children: ReactNode): FC<P> => (p: P) => base(p, children);

/* ---------- brand ---------- */

export const LogoMark: FC<P> = (p) => {
  const { size = 30, ...rest } = p;
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" {...rest}>
      <rect width="32" height="32" rx="8" fill="#161D26" />
      <rect width="32" height="32" rx="8" stroke="#26303C" strokeWidth="1" fill="none" />
      <path
        d="M8 22V10l8 6 8-6v12"
        stroke="#A3E635"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="1.6" fill="#22D3EE" />
    </svg>
  );
};

/* ---------- status marks ---------- */

export const ICheck = mk(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const ICheckCircle = mk(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.2 2.4 2.4 4.8-5" />
  </>
);
export const IWarn = mk(
  <>
    <path d="M12 3.5 2.8 19.5h18.4L12 3.5Z" />
    <path d="M12 10v4" />
    <path d="M12 16.8h.01" />
  </>
);
export const IXCircle = mk(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m9.2 9.2 5.6 5.6M14.8 9.2l-5.6 5.6" />
  </>
);

/* ---------- ui ---------- */

export const ICart = mk(
  <>
    <path d="M3 4h2.2l2.4 11.2a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.3L20.5 8H6.1" />
    <circle cx="10" cy="20" r="1.4" />
    <circle cx="17" cy="20" r="1.4" />
  </>
);
export const IBurger = mk(<path d="M4 7h16M4 12h16M4 17h16" />);
export const IClose = mk(<path d="M6 6l12 12M18 6 6 18" />);
export const IChevron = mk(<path d="m6 9 6 6 6-6" />);
export const IPlus = mk(<path d="M12 5v14M5 12h14" />);
export const IMinus = mk(<path d="M5 12h14" />);
export const IArrow = mk(
  <>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </>
);
export const IPhone = mk(
  <path d="M5.5 3.5h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z" />
);
export const IMail = mk(
  <>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </>
);
export const IPin = mk(
  <>
    <path d="M12 21s-6.5-5.6-6.5-10.4a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.4" r="2.3" />
  </>
);
export const IClock = mk(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </>
);
export const IStar = (p: P) => {
  const { size = 16, ...rest } = p;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...rest}>
      <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17l-5.7 3.2 1.2-6.3-4.7-4.4 6.4-.8L12 2.8Z" />
    </svg>
  );
};
export const ITrash = mk(
  <>
    <path d="M4.5 6.5h15M9.5 6.5V4.8A1.3 1.3 0 0 1 10.8 3.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7" />
    <path d="M6.5 6.5 7.3 19a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.8-12.5" />
    <path d="M10 10.5v6M14 10.5v6" />
  </>
);
export const IDoc = mk(
  <>
    <path d="M6 3.5h8l4 4v13H6v-17Z" />
    <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
  </>
);
export const ISend = mk(
  <>
    <path d="M20.5 3.5 3.5 10l6.5 2.5L12.5 19l8-15.5Z" />
    <path d="m10 12.5 10.5-9" />
  </>
);

/* ---------- trust / features ---------- */

export const IWifiOff = mk(
  <>
    <path d="m4 4 16 16" />
    <path d="M7.5 12.5a8 8 0 0 1 3-1.7M12 6.5a12 12 0 0 1 8 3M4 9.5c.6-.6 1.3-1.1 2-1.6" />
    <path d="M9.5 15.5a4.5 4.5 0 0 1 5-.9" />
    <path d="M12 19h.01" />
  </>
);
export const IKey = mk(
  <>
    <circle cx="8" cy="15.5" r="4.5" />
    <path d="m11.2 12.3 8.3-8.3M17 6.5l2.5 2.5M14 9.5l2 2" />
  </>
);
export const IServer = mk(
  <>
    <rect x="4" y="4" width="16" height="7" rx="1.6" />
    <rect x="4" y="13" width="16" height="7" rx="1.6" />
    <path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h2M11 16.5h2" />
  </>
);
export const IHeadset = mk(
  <>
    <path d="M4.5 13a7.5 7.5 0 0 1 15 0" />
    <rect x="3.5" y="13" width="4" height="6" rx="1.5" />
    <rect x="16.5" y="13" width="4" height="6" rx="1.5" />
    <path d="M18.5 19v.5a2.5 2.5 0 0 1-2.5 2.5h-3" />
  </>
);
export const IShield = mk(
  <>
    <path d="M12 3 5 5.8v5.4c0 4.4 3 8 7 9.8 4-1.8 7-5.4 7-9.8V5.8L12 3Z" />
    <path d="m9 11.8 2.2 2.2L15.4 9.6" />
  </>
);

/* ---------- timeline ---------- */

export const IList = mk(
  <>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
  </>
);
export const IGear = mk(
  <>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
  </>
);
export const IEdu = mk(
  <>
    <path d="m12 4.5 9.5 4.5L12 13.5 2.5 9 12 4.5Z" />
    <path d="M6.5 11v4.5c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8V11M21.5 9v5" />
  </>
);
export const IRocket = mk(
  <>
    <path d="M9.5 14.5c-1.5 0-3.5 1-4.5 4.5 3.5-1 4.5-3 4.5-4.5Z" />
    <path d="M14.5 4c3 0 5.5 2.5 5.5 5.5-1 4-4.5 7.5-8 8.5l-4-4c1-3.5 4.5-7 8-8Z" />
    <circle cx="14.5" cy="9.5" r="1.7" />
  </>
);

/* ---------- niches ---------- */

export const IStore = mk(
  <>
    <path d="M4 9.5 5.5 4h13L20 9.5" />
    <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
    <path d="M5.5 12.5V20h13v-7.5" />
    <path d="M9.5 20v-4.5h5V20" />
  </>
);
export const ICafe = mk(
  <>
    <path d="M4.5 8.5h12v6a4.5 4.5 0 0 1-4.5 4.5H9a4.5 4.5 0 0 1-4.5-4.5v-6Z" />
    <path d="M16.5 9.5h1.5a2.5 2.5 0 0 1 0 5h-1.7M7 4.5v1.6M10.5 4.5v1.6M14 4.5v1.6" />
  </>
);
export const IDumbbell = mk(
  <>
    <path d="M7 8v8M4.5 9.5v5M17 8v8M19.5 9.5v5M7 12h10M2.5 12h2M19.5 12h2" />
  </>
);
export const ISalon = mk(
  <>
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="6.5" cy="17.5" r="2.5" />
    <path d="M8.7 7.8 20 19M8.7 16.2 20 5M13.5 12.6l-1.3-1.3" />
  </>
);
export const IAuto = mk(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 4.5V7M12 17v2.5M19.5 12H17M7 12H4.5M17.3 6.7l-1.8 1.8M8.5 15.5l-1.8 1.8M17.3 17.3l-1.8-1.8M8.5 8.5 6.7 6.7" />
  </>
);
export const IBuild = mk(
  <>
    <path d="M3.5 8.5h17v11h-17zM3.5 8.5 6 4.5h12l2.5 4M12 8.5v11M3.5 14h8.5M12 14h8.5" />
  </>
);

/* ---------- products / equipment ---------- */

export const IBoxes = mk(
  <>
    <path d="M4 12.5 12 8l8 4.5-8 4.5-8-4.5Z" />
    <path d="m4 8 8-4.5L20 8l-8 4.5L4 8ZM4 12.5V17l8 4.5 8-4.5V12.5" />
  </>
);
export const ITerminal = mk(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="m7.5 9 2.5 2.5L7.5 14M12.5 14.5H16" />
  </>
);
export const IZap = mk(<path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z" />);
export const IQr = mk(
  <>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
    <path d="M13.5 13.5h2.8v2.8h-2.8zM17.2 17.2H20V20h-2.8zM20 13.5h.01M13.5 20h.01" />
  </>
);
export const IGps = mk(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </>
);
export const ICall = mk(
  <>
    <path d="M5.5 3.5h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2Z" />
    <path d="M14.5 5.5a5.5 5.5 0 0 1 4 4" />
  </>
);
export const ILink = mk(
  <>
    <path d="M10 14a4.5 4.5 0 0 0 6.4.4l2.8-2.8a4.5 4.5 0 0 0-6.4-6.4L11.5 6.5" />
    <path d="M14 10a4.5 4.5 0 0 0-6.4-.4l-2.8 2.8a4.5 4.5 0 0 0 6.4 6.4l1.3-1.3" />
  </>
);
export const ICashbox = mk(
  <>
    <rect x="3.5" y="9" width="17" height="10" rx="1.6" />
    <path d="M6 9 7.5 5h9L18 9M7.5 12.5h5M7.5 15.5h3" />
    <path d="M16.5 15.5h.01" />
  </>
);
export const IScan = mk(
  <>
    <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
    <path d="M7 12h1.6M11 12h1.6M15.4 12H17M9.4 8.5v7M12.6 8.5v7" />
  </>
);
export const IScale = mk(
  <>
    <path d="M6.5 4.5h11L20 10H4l2.5-5.5Z" />
    <path d="M4 10v8.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V10" />
    <path d="M9 14.5a3 3 0 0 0 6 0" />
  </>
);
export const IPrinter = mk(
  <>
    <path d="M7 8V3.5h10V8" />
    <rect x="4" y="8" width="16" height="8.5" rx="1.6" />
    <path d="M7 13.5h10v7H7v-7ZM16.5 10.8h.01" />
  </>
);
export const IBundle = mk(
  <>
    <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5v-7Z" />
    <path d="M4 8.5 12 13l8-4.5M12 13v7" />
    <path d="m8 6.2 8 4.6" />
  </>
);

/* ---------- icon map for data-driven icons ---------- */

export const ICONS: Record<string, FC<P>> = {
  boxes: IBoxes,
  terminal: ITerminal,
  zap: IZap,
  qr: IQr,
  dumbbell: IDumbbell,
  gps: IGps,
  call: ICall,
  link: ILink,
  cashbox: ICashbox,
  scan: IScan,
  scale: IScale,
  printer: IPrinter,
  bundle: IBundle,
  store: IStore,
  cafe: ICafe,
  salon: ISalon,
  auto: IAuto,
  build: IBuild,
  wifioff: IWifiOff,
  key: IKey,
  server: IServer,
  headset: IHeadset,
  doc: IDoc,
  list: IList,
  gear: IGear,
  edu: IEdu,
  rocket: IRocket,
};

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export type AddonItem = {
  id: string;
  name: string;
  price: number;
  category: string;
};

type CartCtx = {
  items: AddonItem[];
  add: (item: AddonItem) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
  addonsTotal: number;
  setupFee: number;
  basePlan: number;
  monthlyTotal: number;
  firstMonthTotal: number;
};

const Ctx = createContext<CartCtx | null>(null);

export const SETUP_FEE = 2000;
export const BASE_PLAN = 200;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<AddonItem[]>([]);

  const value = useMemo<CartCtx>(() => {
    const addonsTotal = items.reduce((s, i) => s + i.price, 0);
    const monthlyTotal = BASE_PLAN + addonsTotal;
    return {
      items,
      add: (item) =>
        setItems((prev) => (prev.some((p) => p.id === item.id) ? prev : [...prev, item])),
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      has: (id) => items.some((p) => p.id === id),
      clear: () => setItems([]),
      addonsTotal,
      setupFee: SETUP_FEE,
      basePlan: BASE_PLAN,
      monthlyTotal,
      firstMonthTotal: monthlyTotal + SETUP_FEE,
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

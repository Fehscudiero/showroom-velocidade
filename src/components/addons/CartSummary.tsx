import { useState } from "react";
import { useCart, formatBRL } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Trash2, ArrowRight, Receipt } from "lucide-react";

const CartSummary = () => {
  const { items, remove, addonsTotal, basePlan, setupFee, monthlyTotal, firstMonthTotal, clear } =
    useCart();
  const [openMobile, setOpenMobile] = useState(false);

  const SummaryContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-primary text-primary-foreground">
            <ShoppingCart className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-display font-bold text-slate-900">Seu pacote</h3>
            <p className="text-xs text-slate-500">{items.length} adicional(is)</p>
          </div>
        </div>
        <button
          className="lg:hidden text-slate-500 hover:text-slate-900"
          onClick={() => setOpenMobile(false)}
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Itens */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-slate-900 text-sm">Plano Padrão</p>
              <p className="text-xs text-slate-500 mt-0.5">Inclui hospedagem premium</p>
            </div>
            <p className="font-display font-bold text-slate-900">{formatBRL(basePlan)}/mês</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-10 text-sm text-slate-500">
            <ShoppingCart className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            Adicione módulos para personalizar seu showroom.
          </div>
        ) : (
          items.map((it) => (
            <div
              key={it.id}
              className="rounded-xl border border-slate-200 p-4 flex justify-between items-start gap-3 hover:border-primary/40 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm truncate">{it.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{formatBRL(it.price)}/mês</p>
              </div>
              <button
                onClick={() => remove(it.id)}
                className="text-slate-400 hover:text-destructive transition-colors p-1"
                aria-label="Remover"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Totais */}
      <div className="border-t border-slate-200 p-5 space-y-3 bg-slate-50/50">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Plano base</span>
          <span>{formatBRL(basePlan)}/mês</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Adicionais ({items.length})</span>
          <span>{formatBRL(addonsTotal)}/mês</span>
        </div>
        <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
          <span className="font-semibold text-slate-900">Mensalidade total</span>
          <span className="font-display text-2xl font-bold text-primary">
            {formatBRL(monthlyTotal)}
            <span className="text-sm font-normal text-slate-500">/mês</span>
          </span>
        </div>
        <div className="flex justify-between text-sm pt-1">
          <span className="text-slate-600 flex items-center gap-1.5">
            <Receipt className="w-3.5 h-3.5" /> Setup único
          </span>
          <span className="font-semibold text-slate-900">{formatBRL(setupFee)}</span>
        </div>

        <div className="rounded-xl bg-primary/10 border border-primary/30 p-4 mt-2">
          <p className="text-xs text-slate-600 mb-1">Investimento no 1º mês</p>
          <p className="font-display text-2xl font-bold text-slate-900">
            {formatBRL(firstMonthTotal)}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Depois apenas {formatBRL(monthlyTotal)}/mês
          </p>
        </div>

        <Button variant="hero" size="lg" className="w-full mt-2">
          Finalizar contratação <ArrowRight className="w-4 h-4" />
        </Button>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="w-full text-xs text-slate-500 hover:text-destructive transition-colors"
          >
            Limpar adicionais
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block sticky top-24 h-[calc(100vh-7rem)] rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
        {SummaryContent}
      </aside>

      {/* Mobile FAB + drawer */}
      <button
        onClick={() => setOpenMobile(true)}
        className="lg:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full bg-primary text-primary-foreground shadow-2xl font-semibold"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>{formatBRL(monthlyTotal)}/mês</span>
        {items.length > 0 && (
          <span className="ml-1 grid place-items-center w-6 h-6 rounded-full bg-white text-primary text-xs font-bold">
            {items.length}
          </span>
        )}
      </button>

      {openMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          <button
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setOpenMobile(false)}
            aria-label="Fechar overlay"
          />
          <div className="relative w-full max-w-md bg-white h-full animate-fade-up">{SummaryContent}</div>
        </div>
      )}
    </>
  );
};

export default CartSummary;

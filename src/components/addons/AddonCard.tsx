import { useCart, formatBRL, AddonItem } from "@/context/CartContext";
import { Check, Plus } from "lucide-react";

type Props = {
  item: AddonItem & { description: string };
};

const AddonCard = ({ item }: Props) => {
  const { add, remove, has } = useCart();
  const inCart = has(item.id);

  return (
    <div
      className={`group relative rounded-2xl border p-5 transition-all flex flex-col ${
        inCart
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
          : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-md"
      }`}
    >
      {inCart && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
          <Check className="w-3 h-3" strokeWidth={3} /> No pacote
        </span>
      )}

      <h3 className="font-display font-bold text-slate-900 pr-16 leading-snug">{item.name}</h3>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed flex-1">{item.description}</p>

      <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <div>
          <p className="font-display text-xl font-bold text-slate-900">
            {formatBRL(item.price)}
            <span className="text-xs font-normal text-slate-500">/mês</span>
          </p>
        </div>
        <button
          onClick={() => (inCart ? remove(item.id) : add(item))}
          className={`inline-flex items-center gap-1.5 px-4 h-10 rounded-lg text-sm font-semibold transition-all ${
            inCart
              ? "bg-slate-100 text-slate-700 hover:bg-destructive/10 hover:text-destructive"
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md"
          }`}
        >
          {inCart ? "Remover" : (
            <>
              <Plus className="w-4 h-4" /> Adicionar
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddonCard;

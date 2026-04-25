import AddonsHeader from "@/components/addons/AddonsHeader";
import AddonCard from "@/components/addons/AddonCard";
import CartSummary from "@/components/addons/CartSummary";
import { CartProvider } from "@/context/CartContext";
import { ADDON_CATEGORIES } from "@/data/addons";
import { Sparkles } from "lucide-react";

const AdicionaisContent = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AddonsHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 20% 0%, hsl(var(--primary)/0.08), transparent 50%), radial-gradient(circle at 80% 100%, hsl(215 90% 56% / 0.08), transparent 50%)"
        }} aria-hidden />
        <div className="container relative py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Monte seu pacote
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Adicionais à la carte
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-relaxed">
              Comece com o <strong className="text-slate-900">Plano Padrão (R$ 200/mês)</strong> e
              ative apenas os módulos que sua loja precisa. Sem amarras, sem pacotes inflados.
              Adicione, remova e veja o investimento atualizar em tempo real.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-10 items-start">
          <div className="space-y-14">
            {ADDON_CATEGORIES.map((cat) => (
              <div key={cat.id} id={cat.id}>
                <div className="mb-6 pb-4 border-b border-slate-200">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                    {cat.title}
                  </h2>
                  <p className="mt-2 text-slate-600">{cat.description}</p>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {cat.items.map((it) => (
                    <AddonCard key={it.id} item={it} />
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <h3 className="font-display text-xl font-bold text-slate-900">
                Não encontrou o que precisa?
              </h3>
              <p className="text-slate-600 mt-2 mb-5">
                Desenvolvemos módulos sob medida para a realidade da sua loja.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Falar com um especialista
              </a>
            </div>
          </div>

          <CartSummary />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="container py-8 text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} Showroom de Bolso · Valores em reais (BRL).
        </div>
      </footer>
    </div>
  );
};

const Adicionais = () => (
  <CartProvider>
    <AdicionaisContent />
  </CartProvider>
);

export default Adicionais;

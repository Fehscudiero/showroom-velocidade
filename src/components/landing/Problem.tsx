import { TrendingDown, MessageSquareX, Wrench, Clock } from "lucide-react";

const pains = [
  {
    icon: TrendingDown,
    title: "Site travado = lead perdido",
    text: "Sites genéricos demoram 6s para carregar uma foto no 4G. O cliente fecha a aba antes de ver o carro.",
  },
  {
    icon: MessageSquareX,
    title: '"Oi, qual o valor?"',
    text: "Atendimento frio no WhatsApp. Você perde tempo respondendo o óbvio em vez de fechar venda.",
  },
  {
    icon: Wrench,
    title: "Painéis complicados",
    text: "Sistemas que parecem caixa de avião. Você não tem tempo (nem paciência) para virar webmaster.",
  },
  {
    icon: Clock,
    title: "Estoque parado",
    text: "Sem vitrines de destaque, oportunidades viram encalhe. E nada de gerar PDF rápido para repasse.",
  },
];

const Problem = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">A dor é real</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Sua loja está vendendo apesar da internet, <span className="text-gradient-primary">não por causa dela.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Todo mês você investe em estoque e tráfego. Aí o lead chega num site lento, num feed bagunçado e desiste.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((p) => (
            <div
              key={p.title}
              className="group p-6 rounded-2xl border border-border bg-gradient-card hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-destructive/10 text-destructive grid place-items-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;

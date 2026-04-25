import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Vitrine Express",
    tagline: "Para começar com o pé direito",
    price: "R$ 297",
    setup: "R$ 1.997 setup",
    cta: "Começar agora",
    highlight: false,
    features: [
      "Até 20 carros ativos",
      "Site Mobile-First 100/100",
      "Links diretos pro WhatsApp",
      "Tratamento de fotos incluso",
      "Hospedagem premium",
    ],
  },
  {
    name: "Máquina de Leads",
    tagline: "Para lojas com bom giro",
    price: "R$ 597",
    setup: "R$ 3.497 setup",
    cta: "Quero esse",
    highlight: true,
    features: [
      "Até 50 carros ativos",
      "Tudo do Vitrine Express",
      "Formulário de pré-aprovação",
      "Selos de Vendido / Oportunidade",
      "Filtros avançados de busca",
      "Suporte prioritário",
    ],
  },
  {
    name: "Concessionária Digital",
    tagline: "Alto volume, alto padrão",
    price: "R$ 1.297",
    setup: "R$ 6.997 setup",
    cta: "Falar com especialista",
    highlight: false,
    features: [
      "Estoque ilimitado",
      "Tudo do Máquina de Leads",
      "Gerador de PDF de repasse",
      "Painel de métricas",
      "Suporte VIP dedicado",
      "Domínio + SSL incluso",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="planos" className="py-24 bg-muted/30 border-y border-border/60">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Planos</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Escolha o tamanho do seu <span className="text-gradient-primary">showroom.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Setup único + mensalidade. Sem fidelidade engessada, sem letra miúda.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-8 border transition-all flex flex-col ${
                p.highlight
                  ? "border-primary bg-gradient-card shadow-glow lg:scale-105 lg:-my-2"
                  : "border-border bg-gradient-card hover:border-primary/40"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold shadow-glow">
                  <Star className="w-3 h-3 fill-current" /> Mais escolhido
                </div>
              )}

              <div>
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
              </div>

              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{p.price}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">+ {p.setup}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center shrink-0 ${
                      p.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}>
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <Button variant={p.highlight ? "hero" : "outlineGlow"} size="lg" className="w-full">
                {p.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Precisa de algo customizado? <a href="#expansao" className="text-primary hover:underline">Veja os módulos adicionais</a>
        </p>
      </div>
    </section>
  );
};

export default Pricing;

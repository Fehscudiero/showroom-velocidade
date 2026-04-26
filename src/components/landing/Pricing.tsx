import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight } from "lucide-react";
import { useCharReveal, useStaggerReveal, useMagneticHover } from "@/hooks/useScrollReveal";
import { useRef } from "react";

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

const PricingCard = ({ plan }: { plan: typeof plans[0] }) => {
  const cardRef = useMagneticHover<HTMLDivElement>(0.4);

  return (
    <div
      ref={cardRef}
      className={`group relative p-10 lg:p-12 rounded-3xl border transition-all duration-500 flex flex-col h-full ${
        plan.highlight
          ? "border-primary bg-card shadow-glow lg:scale-105 lg:-my-6 z-10"
          : "border-border bg-card shadow-card hover:shadow-elevated hover:border-primary/40 hover:-translate-y-3"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-bold shadow-lg flex items-center gap-2">
          <Star className="w-4 h-4 fill-current" />
          Mais escolhido
        </div>
      )}

      <div className="mb-8">
        <h3 className="font-display text-3xl font-bold">{plan.name}</h3>
        <p className="text-muted-foreground mt-2 text-lg">{plan.tagline}</p>
      </div>

      <div className="mb-10">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-6xl font-black">{plan.price}</span>
          <span className="text-muted-foreground text-xl">/mês</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">+ {plan.setup}</p>
      </div>

      <ul className="space-y-5 flex-1 mb-10">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-4 text-base">
            <span className={`mt-0.5 w-6 h-6 rounded-full grid place-items-center shrink-0 ${
              plan.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            }`}>
              <Check className="w-4 h-4" strokeWidth={3} />
            </span>
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>

      <Button 
        variant={plan.highlight ? "hero" : "outlineGlow"} 
        size="lg" 
        className="w-full group/btn"
      >
        {plan.cta}
        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2" />
      </Button>
    </div>
  );
};

const Pricing = () => {
  const sectionReveal = useStaggerReveal<HTMLElement>({ stagger: 0.1, blurFrom: 15, yFrom: 50 });
  const titleRef = useCharReveal<HTMLHeadingElement>({
    duration: 1.4,
    stagger: 0.02,
    ease: "power4.out",
    blurFrom: 50,
    yFrom: 100,
    rotationX: -90,
  });
  const subtitleReveal = useStaggerReveal<HTMLParagraphElement>({ stagger: 0.015, blurFrom: 20, yFrom: 50 });
  
  return (
    <section ref={sectionReveal} id="planos" className="py-32 bg-muted/30 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-6" data-reveal>
            Planos
          </span>
          
          <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            Escolha o tamanho do seu <span className="text-gradient-primary">showroom.</span>
          </h2>
          
          <p ref={subtitleReveal} className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Setup único + mensalidade. Sem fidelidade engessada, sem letra miúda.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div data-reveal key={p.name}>
              <PricingCard plan={p} />
            </div>
          ))}
        </div>

        <p className="text-center text-lg text-muted-foreground mt-14" data-reveal>
          Precisa de algo customizado?{" "}
          <a href="#expansao" className="text-primary font-bold hover:underline">
            Veja os módulos adicionais
          </a>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
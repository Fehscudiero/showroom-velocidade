import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight } from "lucide-react";
import { useCharReveal, useStaggerReveal, useMagneticHover } from "@/hooks/useScrollReveal";
import { useRef } from "react";
import { LeadCaptureModal } from "./LeadCaptureModal";

const plans = [
  {
    name: "Vitrine Express",
    tagline: "Para começar com o pé direito",
    price: "R$ 297",
    setup: "R$ 1.997",
    cta: "Começar agora",
    highlight: false,
    features: [
      "Até 20 carros",
      "100/100 Lighthouse",
      "Links pro WhatsApp",
      "Tratamento de fotos",
      "Hospedagem premium",
    ],
  },
  {
    name: "Máquina de Leads",
    tagline: "Para lojas com bom giro",
    price: "R$ 597",
    setup: "R$ 3.497",
    cta: "Quero esse",
    highlight: true,
    features: [
      "Até 50 carros",
      "Tudo do Vitrine",
      "Formulário pré-aprovação",
      "Selos Vendido/Oportunidade",
      "Filtros avançados",
      "Suporte prioritário",
    ],
  },
  {
    name: "Concessionária Digital",
    tagline: "Alto volume, alto padrão",
    price: "R$ 1.297",
    setup: "R$ 6.997",
    cta: "Falar com especialista",
    highlight: false,
    features: [
      "Estoque ilimitado",
      "Tudo do Leads",
      "Gerador de PDF",
      "Painel de métricas",
      "Suporte VIP",
      "Domínio + SSL",
    ],
  },
];

const PricingCard = ({ plan }: { plan: typeof plans[0] }) => {
  const cardRef = useMagneticHover<HTMLDivElement>(0.4);

  return (
    <div
      ref={cardRef}
      className={`group relative p-5 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-500 flex flex-col h-full ${
        plan.highlight
          ? "border-primary bg-card shadow-glow md:scale-105 md:-my-4 z-10"
          : "border-border bg-card shadow-card hover:shadow-elevated hover:border-primary/40 hover:-translate-y-2"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold shadow-lg flex items-center gap-1.5 whitespace-nowrap">
          <Star className="w-3 h-3 fill-current" />
          Mais escolhido
        </div>
      )}

      <div className="mb-4 md:mb-5">
        <h3 className="font-display text-lg md:text-xl font-bold">{plan.name}</h3>
        <p className="text-muted-foreground mt-1 text-xs md:text-sm">{plan.tagline}</p>
      </div>

      <div className="mb-4 md:mb-5 lg:mb-6">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-2xl md:text-3xl lg:text-4xl font-black">{plan.price}</span>
          <span className="text-muted-foreground text-sm md:text-base">/mês</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">+ {plan.setup} setup</p>
      </div>

      <ul className="space-y-2.5 flex-1 mb-4 md:mb-5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-xs md:text-sm">
            <span className={`mt-0.5 w-4 h-4 rounded-full grid place-items-center shrink-0 ${
              plan.highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            }`}>
              <Check className="w-2.5 h-2.5" strokeWidth={3} />
            </span>
            <span className="text-foreground/90">{f}</span>
          </li>
        ))}
      </ul>

      <LeadCaptureModal>
        <Button 
          variant={plan.highlight ? "hero" : "outlineGlow"} 
          size="md" 
          className="w-full"
        >
          {plan.cta}
        </Button>
      </LeadCaptureModal>
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
    <section ref={sectionReveal} id="planos" className="py-16 md:py-24 lg:py-28 bg-muted/30 border-y border-border relative section-grid overflow-hidden">
      <div className="absolute inset-0 bg-grid-faded pointer-events-none" aria-hidden />
      
      <div className="container relative max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 lg:mb-20">
          <span className="inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3 md:mb-4" data-reveal>
            Planos
          </span>
          
          <h2 ref={titleRef} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
            Escolha seu <span className="text-gradient-primary">showroom.</span>
          </h2>
          
          <p ref={subtitleReveal} className="mt-4 md:mt-6 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Setup único + mensalidade. Sem fidelidade.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 items-stretch">
          {plans.map((p) => (
            <div data-reveal key={p.name}>
              <PricingCard plan={p} />
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 md:mt-10" data-reveal>
          Precisa de customizado?{" "}
          <a href="#expansao" className="text-primary font-bold hover:underline">
            Veja os módulos
          </a>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
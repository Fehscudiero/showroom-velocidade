import { Gauge, MessageCircle, FileText, BadgeCheck, Filter, ImageIcon } from "lucide-react";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: Gauge,
    tag: "Performance",
    title: "100/100 Lighthouse",
    text: "Core Web Vitals impecáveis, fotos em WebP.",
  },
  {
    icon: MessageCircle,
    tag: "Conversão",
    title: "WhatsApp pronto",
    text: "Mensagens automáticas com detalhes do carro.",
  },
  {
    icon: Filter,
    tag: "Inteligência",
    title: "Filtro de clientes",
    text: "Captura CPF e entrada automaticamente.",
  },
  {
    icon: BadgeCheck,
    tag: "Vendas",
    title: "Selos automáticos",
    text: "Vendido, Único Dono, Oportunidade.",
  },
  {
    icon: FileText,
    tag: "Repasse",
    title: "PDF do estoque",
    text: "Um clique para gerar o PDF de repasse.",
  },
  {
    icon: ImageIcon,
    tag: "Hands-off",
    title: "Fotos tratadas",
    text: "Você manda, a gente otimiza e publica.",
  },
];

const Features = () => {
  const sectionReveal = useStaggerReveal<HTMLElement>({ stagger: 0.07, blurFrom: 15, yFrom: 50 });
  const titleRef = useCharReveal<HTMLHeadingElement>({
    duration: 1.4,
    stagger: 0.018,
    ease: "power4.out",
    blurFrom: 50,
    yFrom: 100,
    rotationX: -90,
  });
  
  return (
    <section ref={sectionReveal} id="features" className="py-16 md:py-24 lg:py-28 relative overflow-hidden section-grid">
      <div className="absolute inset-0 bg-grid-large pointer-events-none" aria-hidden />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-primary/10 rounded-full blur-[120px] md:blur-[150px]" aria-hidden />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-secondary/10 rounded-full blur-[120px] md:blur-[150px]" aria-hidden />

      <div className="container relative max-w-7xl">
        <div className="max-w-3xl mb-10 md:mb-14 lg:mb-20">
          <span className="inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3 md:mb-4" data-reveal>
            Tecnologia + ferramentas
          </span>
          
          <h2 ref={titleRef} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
            Velocidade absurda. <span className="text-gradient-primary">Vendas automáticas.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => (
            <div
              data-reveal
              key={f.title}
              className="group relative p-5 md:p-6 rounded-xl md:rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute -top-16 -right-16 w-28 md:w-36 h-28 md:h-36 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700" aria-hidden />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                    <f.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{f.tag}</span>
                </div>
                
                <h3 className="font-display text-sm md:text-base font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
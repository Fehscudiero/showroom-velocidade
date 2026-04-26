import { TrendingDown, MessageSquareX, Wrench, Clock } from "lucide-react";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const pains = [
  {
    icon: TrendingDown,
    title: "Site travado = lead perdido",
    text: "Sites lentos perdem clientes antes de ver seus carros.",
  },
  {
    icon: MessageSquareX,
    title: "Atendimento frio",
    text: "Você perde tempo respondendo o óbvio em vez de fechar.",
  },
  {
    icon: Wrench,
    title: "Painéis complicados",
    text: "Sistemas confusos que consomem seu tempo.",
  },
  {
    icon: Clock,
    title: "Estoque parado",
    text: "Sem destaque, oportunidades viram encalhe.",
  },
];

const Problem = () => {
  const sectionReveal = useStaggerReveal<HTMLElement>({ stagger: 0.08, blurFrom: 15, yFrom: 40 });
  const titleRef = useCharReveal<HTMLHeadingElement>({
    duration: 1.2,
    stagger: 0.025,
    ease: "power4.out",
    blurFrom: 50,
    yFrom: 100,
    rotationX: -90,
  });
  const subtitleReveal = useStaggerReveal<HTMLParagraphElement>({ stagger: 0.015, blurFrom: 20, yFrom: 40 });
  
  return (
    <section ref={sectionReveal} className="py-16 md:py-24 lg:py-28 relative section-grid">
      <div className="absolute inset-0 bg-grid-primary pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" aria-hidden />
      
      <div className="container relative max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 lg:mb-20">
          <span className="inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3 md:mb-4" data-reveal>
            A dor é real
          </span>
          
          <h2 
            ref={titleRef}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]"
          >
            Sua loja vende <span className="text-gradient-primary">apesar</span> da internet,
          </h2>
          
          <p 
            ref={subtitleReveal}
            className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Todo mês você investe em estoque e tráfego. Aí o lead chega num site lento e desiste.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pains.map((p, i) => (
            <div
              data-reveal
              key={p.title}
              className="group relative p-5 md:p-6 rounded-xl md:rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" aria-hidden />
              
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-destructive/10 text-destructive grid place-items-center mb-3 md:mb-4 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                  <p.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                
                <h3 className="font-display text-sm md:text-base font-bold mb-1.5 group-hover:text-primary transition-colors leading-tight">{p.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
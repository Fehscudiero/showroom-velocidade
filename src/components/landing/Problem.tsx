import { TrendingDown, MessageSquareX, Wrench, Clock } from "lucide-react";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

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
    <section ref={sectionReveal} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" aria-hidden />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-6" data-reveal>
            A dor é real
          </span>
          
          <h2 
            ref={titleRef}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          >
            Sua loja está vendendo <br className="hidden md:block" />
            <span className="text-gradient-primary">apesar</span> da internet,
          </h2>
          
          <p 
            ref={subtitleReveal}
            className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Todo mês você investe em estoque e tráfego. Aí o lead chega num site lento, 
            num feed bagunçado e desiste. Simples assim.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pains.map((p, i) => (
            <div
              data-reveal
              key={p.title}
              className="group relative p-10 rounded-3xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-500 hover:-translate-y-3"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" aria-hidden />
              
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive grid place-items-center mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110 transition-all duration-400">
                  <p.icon className="w-8 h-8" />
                </div>
                
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
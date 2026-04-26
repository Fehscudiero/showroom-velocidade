import { Brain, RefreshCw, GitCompare, Calculator, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const modules = [
  { icon: Brain, name: "IA Descritiva", desc: "Descrições persuasivas automáticas." },
  { icon: RefreshCw, name: "Máquina de Retoma", desc: "Avaliação online do carro do cliente." },
  { icon: GitCompare, name: "Comparador", desc: "Cliente compara modelos antes de chamar." },
  { icon: Calculator, name: "Calculadora", desc: "Simulação de financiamento em tempo real." },
];

const Expansion = () => {
  const sectionReveal = useStaggerReveal<HTMLElement>({ stagger: 0.1, blurFrom: 20, yFrom: 60 });
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
    <section ref={sectionReveal} id="expansao" className="py-16 md:py-24 lg:py-28 relative overflow-hidden section-grid">
      <div className="absolute inset-0 bg-grid-primary pointer-events-none" aria-hidden />
      <div className="absolute top-0 right-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-primary/5 rounded-full blur-[120px] md:blur-[150px]" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-primary/5 rounded-full blur-[120px] md:blur-[150px]" aria-hidden />
      
      <div className="container relative max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div data-reveal className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs md:text-sm font-semibold text-primary mb-5 md:mb-6">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Módulos à la carte
            </div>
            
            <h2 ref={titleRef} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
              Seu showroom <span className="text-gradient-primary">cresce com você.</span>
            </h2>
            
            <p ref={subtitleReveal} className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Comece com o essencial e ative módulos avançados quando a loja pedir.
            </p>
            
            <div className="mt-6 md:mt-8" data-reveal>
              <Button variant="hero" size="lg" asChild className="group/btn w-full sm:w-auto justify-center lg:justify-start">
                <Link to="/adicionais" className="inline-flex items-center justify-center">
                  Ver todos
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {modules.map((m, i) => (
              <div
                data-reveal
                key={m.name}
                className="group p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-card border border-border shadow-card hover:shadow-elevated hover:border-primary/40 hover:-translate-y-2 transition-all duration-500"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                  <m.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="font-display text-sm md:text-base font-bold mb-1 group-hover:text-primary transition-colors leading-tight">{m.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expansion;
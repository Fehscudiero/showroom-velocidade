import { Brain, RefreshCw, GitCompare, Calculator, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const modules = [
  { icon: Brain, name: "IA Descritiva", desc: "Gera descrições persuasivas de cada veículo automaticamente." },
  { icon: RefreshCw, name: "Máquina de Retoma", desc: "Avaliação online do carro do cliente direto no site." },
  { icon: GitCompare, name: "Comparador Lado a Lado", desc: "Cliente compara 3 modelos antes de te chamar." },
  { icon: Calculator, name: "Calculadora de Financiamento", desc: "Simulação em tempo real, integrada com bancos." },
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
    <section ref={sectionReveal} id="expansao" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px]" aria-hidden />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[180px]" aria-hidden />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-20 items-center">
          <div>
            <div data-reveal className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary mb-8">
              <Sparkles className="w-4 h-4" />
              Módulos à la carte
            </div>
            
            <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Seu showroom <span className="text-gradient-primary">cresce com você.</span>
            </h2>
            
            <p ref={subtitleReveal} className="mt-8 text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Não pague pelo que não usa. Comece com o essencial e ative módulos avançados quando a loja pedir.
            </p>
            
            <div className="mt-12" data-reveal>
              <Button variant="hero" size="lg" asChild className="group/btn">
                <Link to="/adicionais">
                  Ver todos os adicionais
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {modules.map((m, i) => (
              <div
                data-reveal
                key={m.name}
                className="group p-10 rounded-3xl bg-card border border-border shadow-card hover:shadow-elevated hover:border-primary/40 hover:-translate-y-3 transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                  <m.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">{m.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expansion;
import { Camera, Wand2, Rocket } from "lucide-react";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Você manda as fotos",
    text: "Foto do carro pelo WhatsApp + ficha básica. Sem painel, sem complicação.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Nós fazemos a mágica",
    text: "Tratamos as imagens, convertemos para WebP e publicamos em horas.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Lead qualificado chega",
    text: "Cliente filtra, simula e cai no seu WhatsApp com mensagem pronta.",
  },
];

const HowItWorks = () => {
  const sectionReveal = useStaggerReveal<HTMLElement>({ stagger: 0.12, blurFrom: 20, yFrom: 50 });
  const titleRef = useCharReveal<HTMLHeadingElement>({
    duration: 1.4,
    stagger: 0.02,
    ease: "power4.out",
    blurFrom: 50,
    yFrom: 120,
    rotationX: -90,
  });
  const subtitleReveal = useStaggerReveal<HTMLParagraphElement>({ stagger: 0.015, blurFrom: 25, yFrom: 50 });
  
  return (
    <section ref={sectionReveal} id="solucao" className="py-16 md:py-24 lg:py-28 bg-muted/30 border-y border-border relative section-grid overflow-hidden">
      <div className="absolute inset-0 bg-grid-dots pointer-events-none" aria-hidden />
      <div className="absolute top-0 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-primary/10 rounded-full blur-[100px] md:blur-[120px]" aria-hidden />
      <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-primary/10 rounded-full blur-[100px] md:blur-[120px]" aria-hidden />
      
      <div className="container relative max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 lg:mb-20">
          <span className="inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-3 md:mb-4" data-reveal>
            Como funciona
          </span>
          
          <h2 ref={titleRef} className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
            Você cuida da loja. <span className="text-gradient-primary">A gente cuida da TI.</span>
          </h2>
          
          <p ref={subtitleReveal} className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto">
            Terceirização total da operação digital. Hands-off de verdade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative">
          {steps.map((s, i) => (
            <div data-reveal key={s.step} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
              
              <div className="relative p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-card border border-border h-full shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-500">
                <div className="flex items-center justify-between mb-4 md:mb-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                    <s.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">{s.step}</span>
                </div>
                
                <h3 className="font-display text-base md:text-lg font-bold mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
              
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 lg:-right-4 w-6 lg:w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
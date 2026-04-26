import { Camera, Wand2, Rocket } from "lucide-react";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Você manda as fotos",
    text: "Foto do carro pelo WhatsApp + ficha básica. Sem painel, sem login, sem complicação.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Nós fazemos a mágica",
    text: "Tratamos as imagens, convertemos para WebP, otimizamos cada KB e publicamos no seu showroom em horas.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Lead pré-qualificado chega",
    text: "Cliente entra, filtra, simula financiamento e cai no seu WhatsApp com a mensagem pronta. Você só fecha.",
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
    <section ref={sectionReveal} id="solucao" className="py-32 bg-muted/30 border-y border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" aria-hidden />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" aria-hidden />
      
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-6" data-reveal>
            Como funciona
          </span>
          
          <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            Você cuida da loja. <br className="hidden md:block" />
            <span className="text-gradient-primary">A gente cuida da TI.</span>
          </h2>
          
          <p ref={subtitleReveal} className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Terceirização total da operação digital. Hands-off de verdade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((s, i) => (
            <div data-reveal key={s.step} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
              
              <div className="relative p-12 rounded-3xl bg-card border border-border h-full shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-500">
                <div className="flex items-center justify-between mb-10">
                  <div className="w-18 h-18 rounded-2xl bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                    <s.icon className="w-9 h-9" />
                  </div>
                  <span className="font-display text-7xl font-black text-primary/10 group-hover:text-primary/20 transition-colors">{s.step}</span>
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{s.text}</p>
              </div>
              
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-primary to-transparent" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
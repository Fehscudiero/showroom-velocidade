import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionReveal = useStaggerReveal<HTMLElement>({ stagger: 0.08, blurFrom: 15, yFrom: 40 });
  const titleRef = useCharReveal<HTMLHeadingElement>({
    duration: 1.2,
    stagger: 0.025,
    ease: "power4.out",
    blurFrom: 40,
    yFrom: 80,
    rotationX: -90,
  });
  const subtitleReveal = useStaggerReveal<HTMLParagraphElement>({ stagger: 0.02, blurFrom: 20, yFrom: 50 });

  useEffect(() => {
    if (!glowRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        scale: 1.4,
        opacity: 0.6,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div 
        ref={glowRef}
        className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/25 rounded-full blur-[200px]" 
        aria-hidden 
      />
      
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)"
      }} aria-hidden />

      <div className="container relative">
        <div ref={sectionReveal} className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-primary p-14 md:p-24 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" aria-hidden />
          
          <div className="relative max-w-3xl mx-auto">
            <h2 
              ref={titleRef} 
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-primary-foreground leading-tight"
            >
              Escala e velocidade na <span className="text-white/95">palma da mão.</span>
            </h2>
            
            <p 
              ref={subtitleReveal}
              className="mt-10 text-xl md:text-2xl text-primary-foreground/85 max-w-2xl mx-auto"
            >
              Receba clientes que já sabem o que querem. Agende uma demo de 20 minutos e veja seu showroom rodando hoje.
            </p>
            
            <div className="mt-14 flex flex-wrap gap-5 justify-center" data-reveal>
              <Button 
                variant="secondary" 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl group/btn"
              >
                Agendar demonstração
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-white/40 text-white bg-white/10 hover:bg-white/25 hover:text-white backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
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
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-28 relative overflow-hidden section-grid">
      <div 
        ref={glowRef}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] md:w-[600px] h-[500px] md:h-[600px] bg-primary/25 rounded-full blur-[150px] md:blur-[180px]" 
        aria-hidden 
      />
      
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)"
      }} aria-hidden />

      <div className="container relative max-w-7xl">
        <div ref={sectionReveal} className="relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl border border-primary/20 bg-gradient-primary p-6 md:p-10 lg:p-14 xl:p-16 text-center section-grid">
          <div className="absolute inset-0 bg-grid-faded pointer-events-none" aria-hidden />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" aria-hidden />
          
          <div className="relative max-w-3xl mx-auto">
            <h2 
              ref={titleRef} 
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-primary-foreground leading-[1.15]"
            >
              Escala e velocidade na <span className="text-white/95">palma da mão.</span>
            </h2>
            
            <p 
              ref={subtitleReveal}
              className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg xl:text-xl text-primary-foreground/85 max-w-xl mx-auto"
            >
              Receba clientes que já sabem o que querem. Agende uma demo e veja seu showroom rodando hoje.
            </p>
            
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3 justify-center" data-reveal>
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl group/btn w-full sm:w-auto justify-center"
              >
                <span className="inline-flex items-center justify-center whitespace-nowrap">
                  Agendar demonstração
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/40 text-white bg-white/10 hover:bg-white/25 hover:text-white backdrop-blur-sm w-full sm:w-auto justify-center"
              >
                <span className="inline-flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  WhatsApp
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
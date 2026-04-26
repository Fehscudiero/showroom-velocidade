import { Button } from "@/components/ui/button";
import { ArrowRight, Gauge, Zap, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-showroom.jpg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const titleRef = useCharReveal<HTMLHeadingElement>({
    duration: 1.4,
    stagger: 0.03,
    ease: "power4.out",
    blurFrom: 40,
    yFrom: 80,
    rotationX: -60,
  });

  const subtitleReveal = useStaggerReveal<HTMLParagraphElement>({ stagger: 0.02, blurFrom: 15, yFrom: 30 });
  const ctaReveal = useStaggerReveal<HTMLDivElement>({ stagger: 0.12, blurFrom: 20, yFrom: 40 });
  const statsReveal = useStaggerReveal<HTMLDivElement>({ stagger: 0.08, blurFrom: 25, yFrom: 50 });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-badge]", {
        y: -30,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.2,
      });

      gsap.from(imageRef.current, {
        x: 120,
        opacity: 0,
        scale: 0.85,
        filter: "blur(30px)",
        duration: 1.6,
        ease: "power4.out",
        delay: 0.5,
      });

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-hero section-grid">
      <div className="absolute inset-0 bg-grid-faded pointer-events-none" aria-hidden />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] md:w-[900px] md:h-[900px] bg-primary/20 rounded-full blur-[180px] md:blur-[200px] pointer-events-none animate-pulse" aria-hidden />

      <div className="container relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 xl:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div 
              data-badge
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs md:text-sm font-semibold text-primary mb-5 md:mb-6 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="whitespace-nowrap">WaaS para lojas de veículos</span>
            </div>

            <h1 
              ref={titleRef}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight"
            >
              Pare de perder vendas para um <span className="text-gradient-primary">site lento.</span>
            </h1>

            <p 
              ref={subtitleReveal}
              className="mt-5 md:mt-6 text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Construímos catálogos digitais de alta conversão para sua loja. Performance extrema: 
              <strong className="text-foreground font-bold"> 100/100 no Lighthouse</strong>, fotos que abrem 
              instantaneamente até no 3G e clientes chegam no WhatsApp <em>já sabendo o que querem</em>.
            </p>

            <div ref={ctaReveal} className="mt-6 md:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button variant="hero" size="lg" asChild className="group/btn shadow-glow w-full sm:w-auto justify-center">
                <a href="#planos" className="inline-flex items-center justify-center whitespace-nowrap">
                  Agendar demonstração 
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover/btn:translate-x-2" />
                </a>
              </Button>
              <Button variant="outlineGlow" size="lg" asChild className="w-full sm:w-auto justify-center">
                <a href="#solucao" className="inline-flex items-center justify-center">Como funciona</a>
              </Button>
            </div>

            <div ref={statsReveal} className="mt-8 md:mt-10 lg:mt-12 grid grid-cols-3 gap-4 md:gap-6 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Gauge, label: "Lighthouse", value: "100/100" },
                { icon: Zap, label: "Carregamento", value: "< 1s" },
                { icon: Smartphone, label: "Mobile-First", value: "Nativo" },
              ].map((s) => (
                <div key={s.label} className="group/icon text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-primary/10 text-primary grid place-items-center mb-2 md:mb-3 group-hover/icon:bg-primary group-hover/icon:text-primary-foreground group-hover/icon:scale-110 transition-all duration-300">
                    <s.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="font-display text-lg md:text-xl lg:text-2xl font-black">{s.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative px-4 lg:px-0 hidden md:block">
            <div className="absolute -inset-6 md:-inset-8 lg:-inset-12 bg-gradient-primary opacity-30 blur-[50px] md:blur-[60px] lg:blur-[80px] rounded-full" aria-hidden />
            <img
              src={heroImage}
              alt="Showroom digital de veículos"
              width={1536}
              height={1152}
              className="relative rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl border border-border/50 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
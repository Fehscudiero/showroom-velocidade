import { Button } from "@/components/ui/button";
import { ArrowRight, Gauge, Zap, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-showroom.jpg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCharReveal, useStaggerReveal, useParallax } from "@/hooks/useScrollReveal";

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
    <section ref={sectionRef} className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" aria-hidden />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/20 rounded-full blur-[200px] pointer-events-none animate-pulse" aria-hidden />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">
          <div>
            <div 
              data-badge
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              WaaS para lojas de veículos · Mobile-First
            </div>

            <h1 
              ref={titleRef}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.98] tracking-tight"
            >
              Pare de perder vendas para um <span className="text-gradient-primary">site lento.</span>
            </h1>

            <p 
              ref={subtitleReveal}
              className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Construímos catálogos digitais de alta conversão para sua loja. Performance extrema: 
              <strong className="text-foreground font-bold"> 100/100 no Lighthouse</strong>, fotos que abrem 
              instantaneamente até no 3G e clientes que chegam no WhatsApp <em className="italic">já sabendo o que querem</em>.
            </p>

            <div ref={ctaReveal} className="mt-12 flex flex-wrap gap-5">
              <Button variant="hero" size="xl" asChild className="group/btn shadow-glow">
                <a href="#planos">
                  Agendar demonstração 
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2" />
                </a>
              </Button>
              <Button variant="outlineGlow" size="xl" asChild>
                <a href="#solucao">Como funciona</a>
              </Button>
            </div>

            <div ref={statsReveal} className="mt-16 grid grid-cols-3 gap-10 max-w-lg">
              {[
                { icon: Gauge, label: "Lighthouse", value: "100/100" },
                { icon: Zap, label: "Carregamento", value: "< 1s" },
                { icon: Smartphone, label: "Mobile-First", value: "Nativo" },
              ].map((s) => (
                <div key={s.label} className="group/icon">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-4 group-hover/icon:bg-primary group-hover/icon:text-primary-foreground group-hover/icon:scale-110 transition-all duration-300">
                    <s.icon className="w-7 h-7" />
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-black">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative lg:pl-8">
            <div className="absolute -inset-12 bg-gradient-primary opacity-30 blur-[80px] rounded-full" aria-hidden />
            <img
              src={heroImage}
              alt="Showroom digital de veículos"
              width={1536}
              height={1152}
              className="relative rounded-3xl shadow-2xl border border-border/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
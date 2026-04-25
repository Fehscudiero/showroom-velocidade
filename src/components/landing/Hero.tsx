import { Button } from "@/components/ui/button";
import { ArrowRight, Gauge, Zap, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-showroom.jpg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-badge]", { y: 20, opacity: 0, duration: 0.6 })
        .from("[data-hero-title] > span, [data-hero-title]", { y: 40, opacity: 0, duration: 0.9 }, "-=0.3")
        .from("[data-hero-text]", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from("[data-hero-stat]", { y: 30, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.3")
        .from(imageRef.current, { x: 60, opacity: 0, duration: 1 }, "-=1");

      // Parallax sutil na imagem
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" aria-hidden />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" aria-hidden />

      <div className="container relative">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <div data-hero-badge className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              WaaS para lojas de veículos · Mobile-First
            </div>

            <h1 data-hero-title className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
              Pare de perder vendas para um <span className="text-gradient-primary">site lento.</span>
            </h1>

            <p data-hero-text className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Construímos catálogos digitais de alta conversão para sua loja. Performance extrema:
              <strong className="text-foreground"> 100/100 no Lighthouse</strong>, fotos que abrem instantaneamente até no 3G e clientes que chegam no WhatsApp <em>já sabendo o que querem</em>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button data-hero-cta variant="hero" size="xl" asChild>
                <a href="#planos">Agendar demonstração <ArrowRight className="w-5 h-5" /></a>
              </Button>
              <Button data-hero-cta variant="outlineGlow" size="xl" asChild>
                <a href="#solucao">Como funciona</a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { icon: Gauge, label: "Lighthouse", value: "100/100" },
                { icon: Zap, label: "Carregamento", value: "< 1s" },
                { icon: Smartphone, label: "Mobile-First", value: "Nativo" },
              ].map((s) => (
                <div data-hero-stat key={s.label}>
                  <s.icon className="w-5 h-5 text-primary mb-2" />
                  <div className="font-display text-xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" aria-hidden />
            <img
              src={heroImage}
              alt="Showroom digital de veículos em smartphone com gráfico de performance"
              width={1536}
              height={1152}
              className="relative rounded-2xl shadow-elevated border border-border animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

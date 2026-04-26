import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Gauge, Zap, Smartphone } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Estilos Reutilizáveis (Clip-path para botões)
// ---------------------------------------------------------------------------
const CLIP_PATH_BUTTON =
  "polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Animação de entrada
      tl.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
      }).from(
        glassCardRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.2)",
        },
        "-=0.9",
      );

      // Parallax suave no vídeo ao scroll
      gsap.to(videoRef.current, {
        yPercent: 15,
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
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col bg-black overflow-hidden"
      style={{ fontFamily: "'Rubik', sans-serif" }}
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[120%] object-cover opacity-100"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260227_042027_c4b2f2ea-1c7c-4d6e-9e3d-81a78063703f.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay sutil para garantir legibilidade, caso o vídeo tenha partes claras */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* ── Header / Navigation ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 bg-transparent">
        <div className="flex items-center gap-2">
          {/* Logo Simulado SVG */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="hsl(var(--primary))" />
          </svg>
          <span className="text-white text-2xl font-bold tracking-tighter uppercase">
            WaaS
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {["Funcionalidades", "Cases", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-sm font-medium hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <button
          className="bg-primary text-primary-foreground px-5 py-2.5 text-[11px] md:text-xs font-bold uppercase transition-transform active:scale-95"
          style={{ clipPath: CLIP_PATH_BUTTON }}
        >
          Área do Cliente
        </button>
      </nav>

      {/* ── Main Content Area ── */}
      {/* Mobile: Coluna / Desktop (lg): Linha com espaço entre eles */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex-1 flex flex-col lg:flex-row items-start justify-between px-6 md:px-12 lg:px-16 pt-8 lg:pt-16 pb-16 gap-12 lg:gap-8">
        {/* LEFT: Headline & Copy */}
        <div
          ref={contentRef}
          className="w-full lg:max-w-[55%] xl:max-w-3xl mt-4"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <span className="w-6 md:w-8 h-0.5 bg-primary" />
            <span className="text-primary text-[10px] md:text-xs lg:text-sm font-bold tracking-widest uppercase">
              WaaS para lojas de veículos · Catálogos de alta conversão
            </span>
          </div>

          {/* H1 */}
          <h1
            className="text-white font-bold leading-[0.95] tracking-[-4%] uppercase mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
          >
            Pare de perder vendas <br className="hidden sm:block" /> para um
            site lento.
          </h1>

          {/* Sub-headline */}
          <p className="text-white/80 w-full max-w-xl text-sm md:text-base leading-relaxed mb-8 md:mb-10">
            <strong className="text-white font-semibold">
              Performance extrema:
            </strong>{" "}
            100/100 no Lighthouse, fotos que abrem instantaneamente até no 3G e
            clientes chegam no WhatsApp{" "}
            <em className="not-italic text-primary font-semibold">
              já sabendo o que querem
            </em>
            .
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              className="group relative bg-primary text-primary-foreground px-6 md:px-8 py-4 font-bold uppercase text-xs md:text-sm flex items-center justify-center gap-3 transition-all hover:brightness-110 w-full sm:w-auto"
              style={{ clipPath: CLIP_PATH_BUTTON }}
            >
              Agendar demonstração
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 md:px-8 py-4 font-bold uppercase text-xs md:text-sm flex items-center justify-center transition-all hover:bg-white hover:text-black w-full sm:w-auto"
              style={{ clipPath: CLIP_PATH_BUTTON }}
            >
              Como funciona
            </button>
          </div>
        </div>

        {/* RIGHT: Stats & Trust Strip (Top Right on Desktop) */}
        <div
          ref={glassCardRef}
          className="w-full lg:w-[420px] xl:w-[480px] p-5 md:p-6 lg:p-8 relative overflow-hidden"
          style={{
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "4px",
            boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
          }}
        >
          {/* Surface Shine Effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-20" />

          {/* Stats Grid */}
          <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6">
            {[
              { icon: Gauge, label: "Lighthouse", value: "100/100" },
              { icon: Zap, label: "Carregamento", value: "< 1s" },
              { icon: Smartphone, label: "Mobile-First", value: "Nativo" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-1.5 md:gap-2 mb-2">
                  <s.icon className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                  <span className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-none">
                    {s.value}
                  </span>
                </div>
                <span className="text-white/60 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Trust Strip */}
          <div className="relative z-10 pt-4 md:pt-5 border-t border-white/10 text-white/50 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-wider font-semibold flex flex-wrap gap-x-2 gap-y-2 justify-between">
            <span>Sem surpresas</span>
            <span className="hidden sm:inline">·</span>
            <span>Setup em 72h</span>
            <span className="hidden sm:inline">·</span>
            <span>Suporte dedicado</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

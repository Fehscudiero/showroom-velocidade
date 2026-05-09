import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Gauge, Zap, Smartphone, ChevronDown } from "lucide-react";
import { LeadCaptureModal } from "./LeadCaptureModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Constantes de Design System
// ---------------------------------------------------------------------------
const CLIP_PATH_GEOMETRIC =
  "polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Intro Reveal - Sincronizado e suave
      tl.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
      }).from(
        glassCardRef.current,
        {
          scale: 0.98,
          opacity: 0,
          duration: 1.4,
        },
        "-=1",
      );

      // Parallax sutil no vídeo
      gsap.to(videoRef.current, {
        yPercent: 10,
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
      className="relative min-h-screen w-full flex flex-col bg-black overflow-hidden selection:bg-[#EE3F2C] selection:text-white"
      style={{ fontFamily: "'Rubik', sans-serif" }}
    >
      {/* ── Background Engine (Video & Overlays) ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[110%] object-cover opacity-60 grayscale-[15%]"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260227_042027_c4b2f2ea-1c7c-4d6e-9e3d-81a78063703f.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlays fixos para garantir contraste e foco visual */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/20 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/90 hidden lg:block" />
      </div>

      {/* ── Main Layout Container ── */}
      <div className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row-reverse items-center justify-between py-10 lg:py-20 gap-10">
        {/* RIGHT BLOCK: Text Content & Actions */}
        {/* Mobile: flex-1 e justify-between joga o texto pra cima e botões pra baixo */}
        <div
          ref={contentWrapperRef}
          className="w-full lg:max-w-[60%] flex-1 lg:flex-none flex flex-col justify-between lg:justify-center lg:items-end lg:text-right"
        >
          {/* TOP GROUP: Texto começando mais baixo no Mobile para UX Superior */}
          <div className="pt-28 lg:pt-0">
            {" "}
            {/* Aumentado pt-10 para pt-28 no mobile */}
            {/* Eyebrow Pill */}
            <div className="hero-reveal mb-6 lg:mb-8 flex justify-center lg:justify-end">
              <span className="inline-flex items-center px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md text-[#EE3F2C] text-[10px] lg:text-xs font-black tracking-[0.4em] uppercase rounded-full">
                WAAS Automotive Framework
              </span>
            </div>
            {/* H1 Principal com Tipografia Líquida */}
            <h1 className="hero-reveal text-white font-bold leading-[1.05] lg:leading-[0.9] tracking-[-0.04em] uppercase mb-6 text-[clamp(40px,9vw,92px)] text-balance">
              Pare de perder <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#EE3F2C]">
                vendas
              </span>{" "}
              para <br className="hidden sm:block" />
              um site lento.
            </h1>
            {/* Subtext Refinado */}
            <p className="hero-reveal text-white/60 max-w-lg mx-auto lg:mr-0 text-base lg:text-xl leading-relaxed font-light lg:font-normal text-pretty">
              Domine a performance com{" "}
              <strong className="text-white font-semibold">
                Score 100 no Lighthouse
              </strong>
              . Sua vitrine digital otimizada para converter em milissegundos.
            </p>
          </div>

          {/* BOTTOM GROUP: Botões posicionados na Thumb Zone (zona do polegar) no Mobile */}
          <div className="hero-reveal flex flex-col sm:flex-row gap-4 w-full sm:w-auto lg:flex-row-reverse mt-12 lg:mt-16 pb-20 lg:pb-0">
            <LeadCaptureModal>
              <button
                className="group relative bg-[#EE3F2C] text-white px-10 py-5 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all hover:scale-[1.03] active:scale-95 shadow-[0_20px_50px_rgba(238,63,44,0.3)]"
                style={{ clipPath: CLIP_PATH_GEOMETRIC }}
              >
                Agendar Demonstração
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </LeadCaptureModal>

            <button
              className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-10 py-5 font-black uppercase text-xs tracking-widest flex items-center justify-center transition-all hover:bg-white hover:text-black"
              style={{ clipPath: CLIP_PATH_GEOMETRIC }}
            >
              Como funciona
            </button>
          </div>
        </div>

        {/* LEFT BLOCK: Card de Métricas (Invisível no Mobile / Ultra Transparente no Desktop) */}
        <div
          ref={glassCardRef}
          className="hidden lg:block w-full lg:w-[460px] p-[1px] bg-white/5 rounded-[4px]"
        >
          <div
            className="p-12 relative overflow-hidden rounded-[4px]"
            style={{
              backdropFilter: "blur(12px) saturate(120%)",
              WebkitBackdropFilter: "blur(12px) saturate(120%)",
              background: "rgba(255, 255, 255, 0.005)",
              border: "1px solid rgba(255, 255, 255, 0.03)",
            }}
          >
            <div className="grid grid-cols-1 gap-12">
              {[
                {
                  icon: Gauge,
                  label: "Lighthouse Performance",
                  value: "100/100",
                },
                { icon: Zap, label: "Tempo de Resposta", value: "< 0.8s" },
                {
                  icon: Smartphone,
                  label: "Interface Nativa",
                  value: "Mobile",
                },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white/5 border border-white/5 flex items-center justify-center rounded-xl transition-all duration-300">
                    <s.icon className="w-8 h-8 text-[#EE3F2C]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-white font-black text-4xl tracking-tighter leading-none">
                      {s.value}
                    </span>
                    <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] mt-2 font-bold">
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Monitoramento Ativo
              </div>
              <p className="text-white/20 text-[9px] uppercase tracking-widest leading-relaxed font-bold">
                Setup em 72h • Suporte Prioritário
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Visual Footer Hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">
          Explore
        </span>
        <ChevronDown className="w-4 h-4 text-white animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;

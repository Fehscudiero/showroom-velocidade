import { useRef, useEffect, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Gauge, Zap, Smartphone, ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Stat {
  icon: ElementType;
  label: string;
  value: string;
}

const STATS: Stat[] = [
  { icon: Gauge, label: "Lighthouse", value: "100/100" },
  { icon: Zap, label: "Carregamento", value: "< 1s" },
  { icon: Smartphone, label: "Mobile-First", value: "Nativo" },
];

// ---------------------------------------------------------------------------
// SVG defs — noise + glitch filters, baked inline (zero network cost)
// ---------------------------------------------------------------------------
const SvgDefs = () => (
  <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden>
    <defs>
      <filter id="hf-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.68"
          numOctaves="3"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
        <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blend" />
        <feComposite in="blend" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>
  </svg>
);

// ---------------------------------------------------------------------------
// Geometric background — denser than previous version
// ---------------------------------------------------------------------------
const GeometricShapes = () => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden
  >
    {/* Primary diagonal slash */}
    <div
      className="absolute top-0 w-px will-change-transform"
      style={{
        height: "100vh",
        right: "38%",
        background:
          "linear-gradient(to bottom, transparent, #CBD5E1 30%, #94A3B8 55%, transparent)",
        transform: "rotate(12deg)",
        transformOrigin: "top center",
      }}
    />
    {/* Secondary diagonal — ghost */}
    <div
      className="absolute top-0 w-px will-change-transform"
      style={{
        height: "75vh",
        right: "42%",
        background:
          "linear-gradient(to bottom, transparent, #E2E8F0 40%, transparent)",
        transform: "rotate(12deg)",
        transformOrigin: "top center",
        opacity: 0.5,
      }}
    />

    {/* Dot matrix 8×8 */}
    <div
      className="absolute opacity-[0.17]"
      style={{
        top: "8%",
        right: "4%",
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: "12px",
      }}
    >
      {Array.from({ length: 64 }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-slate-400" />
      ))}
    </div>

    {/* Large engineering circle — bottom right */}
    <div
      className="absolute opacity-[0.065]"
      style={{ width: 560, height: 560, bottom: -110, right: -80 }}
    >
      <svg viewBox="0 0 560 560" fill="none">
        <circle
          cx="280"
          cy="280"
          r="275"
          stroke="#0F172A"
          strokeWidth="1"
          strokeDasharray="8 6"
        />
        <circle cx="280" cy="280" r="210" stroke="#0F172A" strokeWidth="0.6" />
        <circle
          cx="280"
          cy="280"
          r="140"
          stroke="#0F172A"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
        <line
          x1="5"
          y1="280"
          x2="555"
          y2="280"
          stroke="#0F172A"
          strokeWidth="0.5"
        />
        <line
          x1="280"
          y1="5"
          x2="280"
          y2="555"
          stroke="#0F172A"
          strokeWidth="0.5"
        />
        <line
          x1="82"
          y1="82"
          x2="478"
          y2="478"
          stroke="#0F172A"
          strokeWidth="0.3"
          strokeDasharray="3 6"
        />
        <line
          x1="478"
          y1="82"
          x2="82"
          y2="478"
          stroke="#0F172A"
          strokeWidth="0.3"
          strokeDasharray="3 6"
        />
      </svg>
    </div>

    {/* Crosshair top-left */}
    <div className="absolute opacity-[0.18]" style={{ top: "18%", left: "5%" }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <line
          x1="18"
          y1="0"
          x2="18"
          y2="36"
          stroke="#0F172A"
          strokeWidth="0.8"
        />
        <line
          x1="0"
          y1="18"
          x2="36"
          y2="18"
          stroke="#0F172A"
          strokeWidth="0.8"
        />
        <circle cx="18" cy="18" r="6" stroke="#0F172A" strokeWidth="0.8" />
        <circle cx="18" cy="18" r="2" fill="#0F172A" />
      </svg>
    </div>

    {/* Nested rotated squares — right */}
    <div
      className="absolute border border-slate-300"
      style={{
        width: 84,
        height: 84,
        top: "27%",
        right: "8%",
        transform: "rotate(22deg)",
        opacity: 0.22,
      }}
    />
    <div
      className="absolute border border-slate-200"
      style={{
        width: 54,
        height: 54,
        top: "30.5%",
        right: "10.3%",
        transform: "rotate(22deg)",
        opacity: 0.14,
      }}
    />

    {/* Horizontal rule — mid left */}
    <div
      className="absolute left-0 h-px opacity-20"
      style={{
        top: "50%",
        width: "12%",
        background: "linear-gradient(to right, transparent, #0F172A)",
      }}
    />
  </div>
);

// ---------------------------------------------------------------------------
// Hero — Surreal Edition
// ---------------------------------------------------------------------------
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null); // cinematic curtain
  const badgeRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const glassCardRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // ──────────────────────────────────────────────────────────────────
      // PHASE 0 — CINEMATIC CURTAIN WIPE
      // Dark overlay slams in from left then wipes out to the right,
      // revealing the hero like a film cut.
      // ──────────────────────────────────────────────────────────────────
      const curtain = gsap.timeline();
      curtain
        .set(overlayRef.current, { scaleX: 1, transformOrigin: "left center" })
        .to(overlayRef.current, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 1.05,
          ease: "expo.inOut",
          delay: 0.05,
        });

      // ──────────────────────────────────────────────────────────────────
      // PHASE 1 — MASTER INTRO TIMELINE
      // Starts after curtain clears (delay: 0.7)
      // ──────────────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.7,
      });

      // Background geometry — scale burst
      tl.from(shapesRef.current, { opacity: 0, scale: 1.1, duration: 1.4 }, 0);

      // Badge — aggressive spring with slight rotation
      tl.from(
        badgeRef.current,
        {
          y: -50,
          opacity: 0,
          scale: 0.6,
          rotation: -12,
          duration: 0.9,
          ease: "back.out(2.8)",
        },
        0.0,
      );

      // Accent line — instant scaleX reveal
      tl.from(
        accentLineRef.current,
        { scaleX: 0, transformOrigin: "left center", duration: 0.5 },
        0.18,
      );

      // Eyebrow — clip wipe + skew snap
      tl.from(
        eyebrowRef.current,
        {
          clipPath: "inset(0 100% 0 0)",
          skewX: -10,
          opacity: 0,
          duration: 0.65,
          ease: "expo.out",
        },
        0.22,
      );

      // Headline words — 3D flip-up with stagger + subtle rotationZ wobble
      tl.from(
        ".hero-word",
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
          rotationZ: (_i: number, el: Element) =>
            parseFloat(el.getAttribute("data-rot") ?? "0"),
          transformOrigin: "50% 100%",
          stagger: { each: 0.06, ease: "power2.in" },
          duration: 1.0,
          ease: "expo.out",
        },
        0.28,
      );

      // Sub-headline — cinematic focus pull (blur → sharp)
      tl.from(
        subRef.current,
        {
          y: 44,
          opacity: 0,
          filter: "blur(14px)",
          duration: 0.95,
          ease: "power4.out",
        },
        0.88,
      );

      // CTAs — skewed spring entrance
      tl.from(
        ".hero-cta-item",
        {
          y: 32,
          opacity: 0,
          skewX: -8,
          stagger: 0.13,
          duration: 0.75,
          ease: "back.out(1.7)",
        },
        1.02,
      );

      // Stats — cascade from left
      tl.from(
        ".hero-stat",
        {
          x: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
        },
        1.18,
      );

      // Image — dramatic 3D entrance from right with perspective
      tl.from(
        imageRef.current,
        {
          x: 160,
          opacity: 0,
          scale: 0.82,
          rotationY: 22,
          filter: "blur(32px)",
          transformOrigin: "right center",
          duration: 1.5,
          ease: "expo.out",
        },
        0.38,
      );

      // Glass card — delayed pop-in with spring
      tl.from(
        glassCardRef.current,
        {
          scale: 0.5,
          opacity: 0,
          y: 24,
          duration: 0.65,
          ease: "back.out(2.2)",
        },
        1.35,
      );

      // Scroll hint
      tl.from(scrollHintRef.current, { opacity: 0, y: 12, duration: 0.6 }, 1.7);

      // ──────────────────────────────────────────────────────────────────
      // PHASE 2 — SCROLL-DRIVEN PARALLAX (layered, different scrub speeds)
      // Each element moves at a different rate, creating depth illusion.
      // ──────────────────────────────────────────────────────────────────

      // 2a. Image inner — deep parallax (moves up fastest)
      gsap.to(imageInnerRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // 2b. Image container — slight 3D tilt + horizontal drift
      gsap.to(imageRef.current, {
        rotationY: -8,
        x: -24,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.0,
        },
      });

      // 2c. Headline — drifts up at medium speed
      gsap.to(headlineRef.current, {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      // 2d. Sub + copy — slower drift
      gsap.to(subRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      // 2e. Geometry layer — zooms out + fades (feels like leaving the scene)
      gsap.to(shapesRef.current, {
        scale: 1.2,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "55% top",
          scrub: 1.2,
        },
      });

      // 2f. Badge — exits fastest (nearest layer)
      gsap.to(badgeRef.current, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "35% top",
          scrub: 0.5,
        },
      });

      // 2g. Stats — slide out left with stagger on scroll
      gsap.to(".hero-stat", {
        x: -90,
        opacity: 0,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "15% top",
          end: "55% top",
          scrub: 0.9,
        },
      });

      // 2h. Glass card — rises independently (floats away)
      gsap.to(glassCardRef.current, {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "70% top",
          scrub: 1,
        },
      });

      // 2i. Scroll hint — exits at top of scroll
      gsap.to(scrollHintRef.current, {
        y: 24,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "12% top",
          scrub: 0.4,
        },
      });

      // ──────────────────────────────────────────────────────────────────
      // PHASE 3 — AMBIENT LOOPS (run forever in background)
      // ──────────────────────────────────────────────────────────────────

      // Scroll hint vertical bounce
      gsap.to(scrollHintRef.current, {
        y: 9,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
        delay: 2.6,
      });

      // Glass card gentle float
      gsap.to(glassCardRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3.0,
        ease: "sine.inOut",
        delay: 2.2,
      });

      // Image inner subtle breathe
      gsap.to(imageInnerRef.current, {
        scale: 1.04,
        repeat: -1,
        yoyo: true,
        duration: 7,
        ease: "sine.inOut",
        delay: 2.2,
      });
    }, sectionRef); // scope: all string selectors resolve inside sectionRef

    return () => ctx.revert();
  }, []);

  // ── Hover: magnetic button with elastic snap-back ─────────────────────────
  const onBtnEnter = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, {
      scale: 1.06,
      skewX: -4,
      duration: 0.22,
      ease: "power2.out",
    });
  const onBtnLeave = (e: React.MouseEvent<HTMLAnchorElement>) =>
    gsap.to(e.currentTarget, {
      scale: 1,
      skewX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.45)",
    });

  // ── Hover: stat icon launch + value jump ─────────────────────────────────
  const onStatEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector(".stat-icon"), {
      scale: 1.22,
      rotation: 10,
      duration: 0.28,
      ease: "back.out(2.5)",
    });
    gsap.to(e.currentTarget.querySelector(".stat-value"), {
      y: -5,
      duration: 0.22,
      ease: "power2.out",
    });
  };
  const onStatLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector(".stat-icon"), {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(e.currentTarget.querySelector(".stat-value"), {
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  // ── Styles ───────────────────────────────────────────────────────────────
  const accentGrad: React.CSSProperties = {
    background:
      "linear-gradient(135deg, #0F172A 0%, #2563EB 55%, #06B6D4 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const plainWords = "Pare de perder vendas para um".split(" ");
  const accentWords = [
    { w: "site", rot: 1.5 },
    { w: "lento.", rot: -1.0 },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white"
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        perspective: "1200px",
      }}
    >
      <SvgDefs />

      {/* ── Cinematic curtain — wipes away on load ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-50 pointer-events-none will-change-transform"
        style={{ background: "#0F172A" }}
        aria-hidden
      />

      {/* ── Grain texture overlay ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.022]"
        style={{ filter: "url(#hf-noise)", background: "#64748B" }}
        aria-hidden
      />

      {/* ── Ambient glow — bottom right ── */}
      <div
        className="absolute pointer-events-none rounded-full z-0"
        style={{
          width: 760,
          height: 760,
          bottom: -220,
          right: -160,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        aria-hidden
      />

      {/* ── Ambient glow — top left ── */}
      <div
        className="absolute pointer-events-none rounded-full z-0"
        style={{
          width: 540,
          height: 540,
          top: -160,
          left: -110,
          background:
            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 65%)",
          filter: "blur(55px)",
        }}
        aria-hidden
      />

      {/* ── Geometry layer ── */}
      <div
        ref={shapesRef}
        className="absolute inset-0 pointer-events-none will-change-transform z-0"
      >
        <GeometricShapes />
        {/* Cross-hatch fill — right half */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.028]"
          style={{
            background:
              "repeating-linear-gradient(45deg, #0F172A 0px, #0F172A 1px, transparent 1px, transparent 24px)",
          }}
          aria-hidden
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          {/* ── LEFT: copy ── */}
          <div className="text-left">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600 will-change-transform"
              style={{ letterSpacing: "0.06em" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              WaaS para lojas de veículos
            </div>

            {/* Eyebrow + accent line */}
            <div className="flex items-center gap-3 mb-4">
              <div
                ref={accentLineRef}
                className="h-px bg-slate-800 will-change-transform"
                style={{ width: 32 }}
              />
              <span
                ref={eyebrowRef}
                className="text-xs font-bold tracking-[0.18em] text-slate-500 uppercase will-change-transform"
                style={{ clipPath: "inset(0 0% 0 0)" }}
              >
                Catálogos de alta conversão
              </span>
            </div>

            {/* H1 — 3D word flip stagger */}
            <h1
              ref={headlineRef}
              className="font-black leading-[1.08] tracking-tight text-slate-900 will-change-transform"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                overflowWrap: "break-word",
                transformStyle: "preserve-3d",
              }}
            >
              {plainWords.map((word, i) => (
                <span
                  key={`p-${i}`}
                  data-rot={i % 2 === 0 ? "1.5" : "-1"}
                  className="hero-word inline-block will-change-transform"
                  style={{ marginRight: "0.28em" }}
                >
                  {word}
                </span>
              ))}
              {accentWords.map((item, i) => (
                <span
                  key={`a-${i}`}
                  data-rot={item.rot}
                  className="hero-word inline-block will-change-transform"
                  style={{ ...accentGrad, marginRight: i === 0 ? "0.28em" : 0 }}
                >
                  {item.w}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              className="mt-5 md:mt-6 text-base md:text-lg text-slate-500 max-w-lg leading-relaxed will-change-transform"
            >
              Performance extrema:{" "}
              <strong className="text-slate-800 font-bold">
                100/100 no Lighthouse
              </strong>
              , fotos que abrem instantaneamente até no 3G e clientes chegam no
              WhatsApp{" "}
              <em className="text-slate-700 not-italic font-semibold">
                já sabendo o que querem
              </em>
              .
            </p>

            {/* CTAs */}
            <div className="mt-7 md:mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="#planos"
                className="hero-cta-item group will-change-transform inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                style={{
                  background:
                    "linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)",
                  boxShadow:
                    "0 4px 28px rgba(37,99,235,0.38), inset 0 1px 0 rgba(255,255,255,0.14)",
                }}
                onMouseEnter={onBtnEnter}
                onMouseLeave={onBtnLeave}
              >
                Agendar demonstração
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-200" />
              </a>

              <a
                href="#solucao"
                className="hero-cta-item will-change-transform inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm text-slate-800 border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                onMouseEnter={onBtnEnter}
                onMouseLeave={onBtnLeave}
              >
                Como funciona
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 md:mt-12 grid grid-cols-3 gap-2 max-w-xs sm:max-w-sm">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="hero-stat will-change-transform text-left cursor-default"
                  onMouseEnter={onStatEnter}
                  onMouseLeave={onStatLeave}
                >
                  <div
                    className="stat-icon will-change-transform w-9 h-9 rounded-md grid place-items-center mb-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                      border: "1px solid #BFDBFE",
                    }}
                  >
                    <s.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div
                    className="stat-value font-black text-slate-900 leading-none will-change-transform"
                    style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust strip */}
            <div className="mt-8 flex items-center gap-2">
              <div className="h-px max-w-[40px] w-full bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium tracking-wide">
                Sem mensalidade surpresa · Setup em 72h · Suporte dedicado
              </span>
            </div>
          </div>

          {/* ── RIGHT: image panel ── */}
          <div
            ref={imageRef}
            className="relative hidden md:block will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Outer glow halo */}
            <div
              className="absolute -inset-5 rounded-3xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.16), rgba(6,182,212,0.1))",
                filter: "blur(28px)",
              }}
              aria-hidden
            />

            {/* Image frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(15,23,42,0.07), 0 44px 88px -22px rgba(15,23,42,0.24), 0 10px 28px -8px rgba(59,130,246,0.18)",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 z-10 pointer-events-none">
                <div className="w-8 h-8 border-t-2 border-l-2 border-blue-500" />
              </div>
              <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
                <div className="w-8 h-8 border-b-2 border-r-2 border-blue-500" />
              </div>

              {/* Scan-line overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(15,23,42,0.018) 3px, rgba(15,23,42,0.018) 4px)",
                }}
                aria-hidden
              />

              {/* Hero image — LCP optimised */}
              <img
                ref={imageInnerRef}
                src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900&auto=format&fit=crop&q=80"
                alt="Showroom digital de veículos premium"
                width={900}
                height={675}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full block will-change-transform"
                style={{
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  transformOrigin: "center bottom",
                }}
              />

              {/* Glassmorphism metric card */}
              <div
                ref={glassCardRef}
                className="absolute bottom-4 right-4 w-52 rounded-xl px-4 py-3 flex items-center gap-3 will-change-transform"
                style={{
                  background: "rgba(255,255,255,0.76)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.95)",
                  boxShadow: "0 8px 40px rgba(15,23,42,0.15)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg grid place-items-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                  }}
                >
                  <Gauge className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-none mb-0.5">
                    Performance Score
                  </div>
                  <div className="text-xl font-black text-slate-900 leading-none">
                    100{" "}
                    <span className="text-xs font-semibold text-green-500">
                      ● Excelente
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical annotation */}
            <div
              className="absolute -right-2 top-1/3 flex items-center gap-2"
              style={{ transform: "translateX(100%)" }}
            >
              <div className="w-6 h-px bg-slate-300" />
              <span
                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Catálogo Digital
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 will-change-transform opacity-0"
        aria-hidden
      >
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-slate-300" />
      </div>
    </section>
  );
};

export default Hero;

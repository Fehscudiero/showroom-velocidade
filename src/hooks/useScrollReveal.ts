import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;
const isTablet = () => typeof window !== "undefined" && window.innerWidth < 1024;

const splitChars = (text: string): string => {
  return text.split("").map((char, i) => {
    if (char === " ") return `<span class="inline-block w-[0.3em]" style="white-space:pre" data-char="${i}"> </span>`;
    return `<span class="inline-block" style="white-space:pre" data-char="${i}">${char}</span>`;
  }).join("");
};

const splitWords = (text: string): string => {
  return text.split(" ").map((word, i) => {
    if (!word.trim()) return "";
    return `<span class="inline-block" style="white-space:nowrap" data-word="${i}"><span class="inline-block" style="white-space:nowrap">${word}</span></span>`;
  }).join(" ");
};

export const useCharReveal = <T extends HTMLElement = HTMLElement>(
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    blurFrom?: number;
    yFrom?: number;
    skewX?: number;
    rotationX?: number;
  }
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mobile = isMobile();
    const duration = mobile ? (options?.duration ?? 1) * 0.7 : options?.duration ?? 1;
    const stagger = mobile ? (options?.stagger ?? 0.025) * 0.6 : options?.stagger ?? 0.025;
    const blurFrom = options?.blurFrom ?? 40;
    const yFrom = options?.yFrom ?? 60;
    const skewX = options?.skewX ?? 0;
    const rotationX = options?.rotationX ?? -90;

    el.innerHTML = splitChars(el.textContent ?? "");
    const chars = el.querySelectorAll<HTMLElement>("[data-char]");

    gsap.set(chars, {
      opacity: 0,
      y: yFrom,
      filter: `blur(${blurFrom}px)`,
      skewX,
      rotationX,
      transformOrigin: "50% 100%",
    });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        skewX: 0,
        rotationX: 0,
        duration,
        ease: options?.ease ?? "power4.out",
        stagger,
        delay: options?.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
};

export const useWordReveal = <T extends HTMLElement = HTMLElement>(
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    blurFrom?: number;
    yFrom?: number;
  }
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mobile = isMobile();
    const duration = mobile ? (options?.duration ?? 1) * 0.7 : options?.duration ?? 1;
    const stagger = mobile ? (options?.stagger ?? 0.1) * 0.6 : options?.stagger ?? 0.1;
    const blurFrom = options?.blurFrom ?? 30;
    const yFrom = options?.yFrom ?? 80;

    el.innerHTML = splitWords(el.textContent ?? "");
    const words = el.querySelectorAll<HTMLElement>("[data-word] > span");

    gsap.set(words, {
      opacity: 0,
      yPercent: yFrom,
      filter: `blur(${blurFrom}px)`,
    });

    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration,
        ease: options?.ease ?? "expo.out",
        stagger,
        delay: options?.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
};

export const useTextReveal = <T extends HTMLElement = HTMLElement>(
  options?: {
    mode?: "chars" | "words";
    delay?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    blurFrom?: number;
    yFrom?: number;
  }
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mode = options?.mode ?? "chars";
    const mobile = isMobile();
    const duration = mobile ? (options?.duration ?? 1) * 0.7 : options?.duration ?? 1;
    const stagger = mode === "chars" 
      ? (mobile ? (options?.stagger ?? 0.02) * 0.6 : options?.stagger ?? 0.02)
      : (mobile ? (options?.stagger ?? 0.1) * 0.6 : options?.stagger ?? 0.1);
    const blurFrom = options?.blurFrom ?? 40;
    const yFrom = options?.yFrom ?? 60;

    if (mode === "words") {
      el.innerHTML = splitWords(el.textContent ?? "");
      const words = el.querySelectorAll<HTMLElement>("[data-word] > span");
      
      gsap.set(words, { opacity: 0, yPercent: yFrom, filter: `blur(${blurFrom}px)` });
      
      gsap.to(words, {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration,
        ease: options?.ease ?? "expo.out",
        stagger,
        delay: options?.delay ?? 0,
        scrollTrigger: { trigger: el, start: options?.start ?? "top 85%", toggleActions: "play none none none" },
      });
    } else {
      el.innerHTML = splitChars(el.textContent ?? "");
      const chars = el.querySelectorAll<HTMLElement>("[data-char]");

      gsap.set(chars, {
        opacity: 0,
        y: yFrom,
        filter: `blur(${blurFrom}px)`,
        rotationX: -90,
        transformOrigin: "50% 100%",
      });

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotationX: 0,
        duration,
        ease: options?.ease ?? "power4.out",
        stagger,
        delay: options?.delay ?? 0,
        scrollTrigger: { trigger: el, start: options?.start ?? "top 85%", toggleActions: "play none none none" },
      });
    }
  }, []);

  return ref;
};

export const useTypewriter = <T extends HTMLElement = HTMLElement>(options?: {
  speed?: number;
  cursor?: boolean;
  delay?: number;
}) => {
  const ref = useRef<T | null>(null);
  const progressRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent ?? "";
    el.textContent = "";

    const speed = options?.speed ?? 0.04;
    const delay = options?.delay ?? 0;
    let index = 0;

    const type = () => {
      if (index < text.length) {
        el.textContent = text.substring(0, index + 1);
        index++;
        timerRef.current = window.setTimeout(type, speed * 1000);
      }
    };

    const timeout = setTimeout(type, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return ref;
};

export const useStaggerReveal = <T extends HTMLElement = HTMLElement>(options?: {
  stagger?: number;
  duration?: number;
  start?: string;
  blurFrom?: number;
  yFrom?: number;
}) => {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    const mobile = isMobile();
    const duration = mobile ? (options?.duration ?? 0.8) * 0.7 : options?.duration ?? 0.8;
    const stagger = mobile ? (options?.stagger ?? 0.1) * 0.6 : options?.stagger ?? 0.1;
    const blurFrom = options?.blurFrom ?? 20;
    const yFrom = options?.yFrom ?? 60;

    gsap.set(targets, { opacity: 0, y: yFrom, filter: `blur(${blurFrom}px)` });

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start: options?.start ?? "top 85%", toggleActions: "play none none none" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

export const useParallax = <T extends HTMLElement = HTMLElement>(speed = 0.5, direction: "y" | "x" = "y") => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const movement = direction === "y" ? -window.innerHeight * speed : -window.innerWidth * speed;
      gsap.to(el, {
        [direction]: movement,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
    }, el);

    return () => ctx.revert();
  }, [speed, direction]);

  return ref;
};

export const useMagneticHover = <T extends HTMLElement = HTMLElement>(strength = 0.3) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el!.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
};

export const useScrollReveal = <T extends HTMLElement = HTMLElement>(options?: {
  selector?: string;
  stagger?: number;
  duration?: number;
  start?: string;
  blurFrom?: number;
  yFrom?: number;
}) => {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const selector = options?.selector ?? "[data-reveal]";
    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    const mobile = isMobile();
    const duration = mobile ? (options?.duration ?? 0.8) * 0.7 : options?.duration ?? 0.8;
    const stagger = mobile ? (options?.stagger ?? 0.1) * 0.6 : options?.stagger ?? 0.1;
    const blurFrom = options?.blurFrom ?? 12;
    const yFrom = options?.yFrom ?? 60;

    gsap.set(targets, { opacity: 0, y: yFrom, filter: `blur(${blurFrom}px)` });

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: { trigger: el, start: options?.start ?? "top 85%", toggleActions: "play none none none" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

export const useCounter = <T extends HTMLElement = HTMLElement>(
  endValue: number,
  options?: { duration?: number; delay?: number; prefix?: string; suffix?: string }
) => {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mobile = isMobile();
    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: endValue,
        duration: mobile ? (options?.duration ?? 2) * 0.7 : options?.duration ?? 2,
        ease: "power2.out",
        delay: options?.delay ?? 0,
        onUpdate: () => setValue(Math.round(obj.val)),
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    }, el);

    return () => ctx.revert();
  }, [endValue]);

  return { ref, value: `${options?.prefix ?? ""}${value.toLocaleString("pt-BR")}${options?.suffix ?? ""}` };
};
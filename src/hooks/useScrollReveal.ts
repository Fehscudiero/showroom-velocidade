import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook GSAP para revelar elementos no scroll.
 * Aplica fade-up com stagger em todos os elementos com [data-reveal] dentro do container.
 */
export const useScrollReveal = <T extends HTMLElement = HTMLElement>(options?: {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}) => {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const selector = options?.selector ?? "[data-reveal]";
    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: options?.y ?? 40 });
    
    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.9,
        ease: "power3.out",
        stagger: options?.stagger ?? 0.12,
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [options?.selector, options?.y, options?.stagger, options?.duration, options?.start]);

  return containerRef;
};

/**
 * Anima caracteres/palavras de um texto surgindo um a um.
 */
export const useTextReveal = <T extends HTMLElement = HTMLElement>(delay = 0) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent ?? "";
    const words = text.split(" ");
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="inline-block overflow-hidden align-bottom"><span class="inline-block" data-word>${w}</span></span>`
      )
      .join(" ");

    gsap.set(el.querySelectorAll<HTMLElement>("[data-word]"), { opacity: 0, yPercent: 110 });
    
    const wordEls = el.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.to(wordEls, {
        opacity: 1,
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return ref;
};

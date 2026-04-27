import React, { Suspense, lazy, useState, useEffect } from "react";
// 🚀 CARREGAMENTO SÍNCRONO: Apenas o que aparece na Dobra Superior
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";

// 🚀 CODE SPLITTING (Lazy Loading): Tudo o que está "Abaixo da Dobra"
const Problem = lazy(() => import("@/components/landing/Problem"));
const HowItWorks = lazy(() => import("@/components/landing/HowItWorks"));
const Features = lazy(() => import("@/components/landing/Features"));
const Pricing = lazy(() => import("@/components/landing/Pricing"));
const Expansion = lazy(() => import("@/components/landing/Expansion"));
const CTA = lazy(() => import("@/components/landing/CTA"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const Index = () => {
  // 🚀 TRAVA DE HIDRATAÇÃO PASSIVA (Aniquila o TBT e Script Evaluation)
  const [loadRestOfPage, setLoadRestOfPage] = useState(false);

  useEffect(() => {
    // Aguarda a CPU ficar 100% livre após renderizar o Hero
    const timer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          React.startTransition(() => setLoadRestOfPage(true));
        });
      } else {
        React.startTransition(() => setLoadRestOfPage(true));
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* PRIORIDADE MÁXIMA: Renderizado na largada para o LCP perfeito */}
      <Header />
      <main>
        <Hero />

        {/* CARREGAMENTO INVISÍVEL: Injetado na tela apenas quando a thread principal respirar */}
        {loadRestOfPage && (
          <Suspense fallback={<div className="min-h-screen" />}>
            <Problem />
            <HowItWorks />
            <Features />
            <Pricing />
            <Expansion />
            <CTA />
          </Suspense>
        )}
      </main>
      
      {/* Footer também entra na trava de segurança */}
      {loadRestOfPage && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
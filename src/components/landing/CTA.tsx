import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CTA = () => {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.12 });
  return (
    <section ref={ref} className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-primary p-10 md:p-16 text-center">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-glow/40 rounded-full blur-[120px]" aria-hidden />

          <div className="relative max-w-2xl mx-auto">
            <h2 data-reveal className="font-display text-3xl md:text-5xl font-bold tracking-tight text-primary-foreground">
              Escala e velocidade na <span className="text-white/90">palma da mão.</span>
            </h2>
            <p data-reveal className="mt-5 text-lg text-primary-foreground/85">
              Receba clientes que já sabem o que querem. Agende uma demo de 20 minutos e veja seu showroom rodando hoje.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90">
                Agendar demonstração <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white">
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

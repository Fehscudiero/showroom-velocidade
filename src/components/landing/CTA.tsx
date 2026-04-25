import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-card p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" aria-hidden />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px]" aria-hidden />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Escala e velocidade na <span className="text-gradient-primary">palma da mão.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Receba clientes que já sabem o que querem. Agende uma demo de 20 minutos e veja seu showroom rodando hoje.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button variant="hero" size="xl">
                Agendar demonstração <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outlineGlow" size="xl">
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

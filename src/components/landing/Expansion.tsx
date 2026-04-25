import { Brain, RefreshCw, GitCompare, Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  { icon: Brain, name: "IA Descritiva", desc: "Gera descrições persuasivas de cada veículo automaticamente." },
  { icon: RefreshCw, name: "Máquina de Retoma", desc: "Avaliação online do carro do cliente direto no site." },
  { icon: GitCompare, name: "Comparador Lado a Lado", desc: "Cliente compara 3 modelos antes de te chamar." },
  { icon: Calculator, name: "Calculadora de Financiamento", desc: "Simulação em tempo real, integrada com bancos." },
];

const Expansion = () => {
  return (
    <section id="expansao" className="py-24">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium text-primary mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Módulos à la carte
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Seu showroom <span className="text-gradient-primary">cresce com você.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Não pague pelo que não usa. Comece com o essencial e ative módulos avançados quando a loja pedir.
            </p>
            <Button variant="outlineGlow" size="lg" className="mt-8" asChild>
              <a href="#planos">Ver catálogo completo</a>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {modules.map((m) => (
              <div
                key={m.name}
                className="p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/40 hover:shadow-card transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-4">
                  <m.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold mb-1.5">{m.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expansion;

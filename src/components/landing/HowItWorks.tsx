import { Camera, Wand2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Você manda as fotos",
    text: "Foto do carro pelo WhatsApp + ficha básica. Sem painel, sem login, sem complicação.",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Nós fazemos a mágica",
    text: "Tratamos as imagens, convertemos para WebP, otimizamos cada KB e publicamos no seu showroom em horas.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Lead pré-qualificado chega",
    text: "Cliente entra, filtra, simula financiamento e cai no seu WhatsApp com a mensagem pronta. Você só fecha.",
  },
];

const HowItWorks = () => {
  return (
    <section id="solucao" className="py-24 bg-muted/30 border-y border-border/60">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Como funciona</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Você cuida da loja. <br className="hidden md:block" />
            <span className="text-gradient-primary">A gente cuida da TI.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Terceirização total da operação digital. Hands-off de verdade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="p-8 rounded-2xl bg-gradient-card border border-border h-full hover:shadow-card transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary grid place-items-center">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="font-display text-4xl font-bold text-primary/20">{s.step}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary to-transparent" aria-hidden />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

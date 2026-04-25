import { Gauge, MessageCircle, FileText, BadgeCheck, Filter, ImageIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: Gauge,
    tag: "Performance",
    title: "100/100 no Lighthouse",
    text: "Engenharia de performance extrema. Core Web Vitals impecáveis, fotos em WebP, lazy loading nativo. Google ama. Cliente também.",
  },
  {
    icon: MessageCircle,
    tag: "Conversão",
    title: "Pré-aprovação no WhatsApp",
    text: 'Botões inteligentes que disparam mensagens prontas: "Vi o Corolla 2021, placa final 4". Acabou o "oi, qual o valor?".',
  },
  {
    icon: Filter,
    tag: "Inteligência",
    title: "Filtro de qualificação",
    text: "Captura CPF e entrada antes de chegar em você. A ficha cai mastigada — pronta para simular financiamento.",
  },
  {
    icon: BadgeCheck,
    tag: "Vendas",
    title: 'Selos "Vendido", "Único Dono", "Oportunidade"',
    text: "Vitrines de destaque automáticas para girar estoque parado e criar urgência no cliente certo.",
  },
  {
    icon: FileText,
    tag: "Repasse",
    title: "Gerador de PDF de estoque",
    text: "Um botão e pronto: PDF limpinho com os carros do dia para distribuir em grupos de repasse.",
  },
  {
    icon: ImageIcon,
    tag: "Hands-off",
    title: "Tratamento de fotos incluso",
    text: "Você manda a foto crua. Nós cortamos, otimizamos, convertemos e publicamos. Zero esforço operacional.",
  },
];

const Features = () => {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1 });
  return (
    <section ref={ref} id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none" aria-hidden />

      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <span data-reveal className="text-sm font-semibold text-primary uppercase tracking-wider">Tecnologia + ferramentas</span>
          <h2 data-reveal className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight">
            Velocidade absurda. <br />
            <span className="text-gradient-primary">Vendas no automático.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              data-reveal
              key={f.title}
              className="group relative p-7 rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-all" aria-hidden />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{f.tag}</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

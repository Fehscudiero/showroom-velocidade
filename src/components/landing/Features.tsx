import { Gauge, MessageCircle, FileText, BadgeCheck, Filter, ImageIcon } from "lucide-react";
import { useCharReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

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
  const sectionReveal = useStaggerReveal<HTMLElement>({ stagger: 0.07, blurFrom: 15, yFrom: 50 });
  const titleRef = useCharReveal<HTMLHeadingElement>({
    duration: 1.4,
    stagger: 0.018,
    ease: "power4.out",
    blurFrom: 50,
    yFrom: 100,
    rotationX: -90,
  });
  
  return (
    <section ref={sectionReveal} id="features" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[180px]" aria-hidden />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[180px]" aria-hidden />

      <div className="container relative">
        <div className="max-w-3xl mb-24">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-[0.2em] mb-6" data-reveal>
            Tecnologia + ferramentas
          </span>
          
          <h2 ref={titleRef} className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            Velocidade absurda. <br />
            <span className="text-gradient-primary">Vendas no automático.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              data-reveal
              key={f.title}
              className="group relative p-10 rounded-3xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/25 transition-all duration-700" aria-hidden />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                    <f.icon className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{f.tag}</span>
                </div>
                
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
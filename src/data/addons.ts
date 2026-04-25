import { AddonItem } from "@/context/CartContext";

export type AddonCategory = {
  id: string;
  title: string;
  description: string;
  items: (AddonItem & { description: string; argument?: string })[];
};

export const ADDON_CATEGORIES: AddonCategory[] = [
  {
    id: "estoque",
    title: "Gestão de Estoque (Terceirização de TI)",
    description: "Você manda as fotos. A gente trata, otimiza e publica. Zero dor de cabeça.",
    items: [
      {
        id: "estoque-p",
        name: "Pacote P — Até 10 carros/mês",
        price: 300,
        category: "estoque",
        description: "Ideal para lojas pequenas com giro mais lento.",
      },
      {
        id: "estoque-m",
        name: "Pacote M — Até 25 carros/mês (Dinâmico)",
        price: 500,
        category: "estoque",
        description: "Para lojas com bom giro e atualizações frequentes.",
      },
      {
        id: "estoque-ilimitado",
        name: "Pacote Ilimitado",
        price: 900,
        category: "estoque",
        description: "Estoque ilimitado, atualização contínua e prioridade.",
      },
    ],
  },
  {
    id: "conversao",
    title: "Conversão e Atendimento",
    description: "Botões e filtros que transformam visitante em lead qualificado.",
    items: [
      {
        id: "wpp-simples",
        name: "Conexão Direta Simples",
        price: 50,
        category: "conversao",
        description: "Botão flutuante básico do WhatsApp em todas as páginas.",
      },
      {
        id: "wpp-filtro",
        name: "Filtro Inteligente de Clientes",
        price: 100,
        category: "conversao",
        description: 'Botão que já puxa mensagem pronta: "Olá, vi o Corolla 2021...".',
      },
    ],
  },
  {
    id: "destaque",
    title: "Apresentação e Destaque",
    description: "Vitrines visuais para girar estoque parado.",
    items: [
      {
        id: "vitrines",
        name: "Vitrines de Destaque",
        price: 100,
        category: "destaque",
        description: 'Selos "Único Dono", "Vendido", "Oportunidade" + análise diária.',
      },
    ],
  },
  {
    id: "vendas",
    title: "Ferramentas Avançadas (Vendas e Repasse)",
    description: "O arsenal pesado para acelerar fechamento e gerenciar repasse.",
    items: [
      {
        id: "pre-aprovacao",
        name: "Sistema de Pré-Aprovação",
        price: 200,
        category: "vendas",
        description: "Formulário capta CPF, entrada e parcelas. Ficha pronta no WhatsApp.",
      },
      {
        id: "pdf-estoque",
        name: "Gerador de PDF de Estoque",
        price: 70,
        category: "vendas",
        description: "Botão mágico — PDF limpo dos carros do dia para grupos de repasse.",
      },
      {
        id: "raio-x",
        name: "Raio-X Mensal de Vendas",
        price: 150,
        category: "vendas",
        description: "Relatório gerencial de cliques, fichas geradas e conversão.",
      },
      {
        id: "seo",
        name: "Sistema de SEO",
        price: 150,
        category: "vendas",
        description: "Seu site nas primeiras posições do Google quando buscam carros.",
      },
    ],
  },
  {
    id: "modulos-extras",
    title: "Módulos Inteligentes (Premium)",
    description: "Recursos de alta tecnologia que diferenciam sua loja da concorrência.",
    items: [
      {
        id: "retoma",
        name: "Máquina de Retoma",
        price: 120,
        category: "modulos-extras",
        description: "Avaliação de usados integrada — cliente envia ficha completa do carro dele.",
      },
      {
        id: "fila-espera",
        name: 'Painel "O que devo comprar?"',
        price: 40,
        category: "modulos-extras",
        description: "Fila de espera inteligente — radar da demanda reprimida do mercado.",
      },
      {
        id: "link-magico",
        name: 'Link Mágico do Vendedor',
        price: 150,
        category: "modulos-extras",
        description: "URL própria para cada vendedor. Acaba briga de comissão no salão.",
      },
      {
        id: "fipe",
        name: "Integração FIPE Dinâmica",
        price: 100,
        category: "modulos-extras",
        description: 'Selo automático "R$ X abaixo da Fipe" — argumento de venda no automático.',
      },
      {
        id: "reels",
        name: "Vitrine Reels/TikTok",
        price: 150,
        category: "modulos-extras",
        description: "Player nativo de vídeo vertical direto na ficha do carro.",
      },
      {
        id: "laudo",
        name: "Selo Laudo Cautelar",
        price: 20,
        category: "modulos-extras",
        description: "Transparência extrema — quebra a desconfiança do cliente de usado.",
      },
      {
        id: "relampago",
        name: "Oferta Relâmpago + Cronômetro",
        price: 90,
        category: "modulos-extras",
        description: "Cronômetro regressivo de 48h pulsando na foto. Senso de urgência absurdo.",
      },
      {
        id: "test-drive",
        name: "Agendamento de Test Drive",
        price: 50,
        category: "modulos-extras",
        description: 'Transforma "talvez eu vá" em compromisso real. +80% conversão.',
      },
      {
        id: "ipva",
        name: "Calculadora de IPVA + Bônus",
        price: 70,
        category: "modulos-extras",
        description: 'Indicativo visual "IPVA Pago", "Tanque Cheio", "Transferência Grátis".',
      },
      {
        id: "comparador",
        name: "Comparador Lado a Lado",
        price: 130,
        category: "modulos-extras",
        description: "Cliente compara 2 carros do seu estoque sem sair pro Google.",
      },
      {
        id: "ia-match",
        name: "IA de Matchmaking de Estoque",
        price: 100,
        category: "modulos-extras",
        description: 'Busca inteligente: "carro pra Uber até 50 mil" → solução na hora.',
      },
      {
        id: "termometro",
        name: 'Termômetro de "Preço Justo"',
        price: 80,
        category: "modulos-extras",
        description: 'Ponteiro visual estilo TrueCar valida que seu preço está justo.',
      },
      {
        id: "placa",
        name: "Avaliador Automático por Placa",
        price: 120,
        category: "modulos-extras",
        description: "Cliente digita só a placa e API preenche a ficha do carro dele.",
      },
      {
        id: "360",
        name: "Galeria de Visão 360º",
        price: 100,
        category: "modulos-extras",
        description: "Cliente arrasta o dedo e gira o carro. Showroom imersivo premium.",
      },
      {
        id: "alerta-preco",
        name: "Alerta de Queda de Preço",
        price: 90,
        category: "modulos-extras",
        description: "Watchlist — quando você baixa o preço, o sistema avisa o cliente quente.",
      },
      {
        id: "carfax",
        name: 'Timeline "Carfax" (Histórico)',
        price: 70,
        category: "modulos-extras",
        description: "Linha do tempo visual: único dono, revisões, laudo aprovado.",
      },
      {
        id: "custo-efetivo",
        name: 'Calculadora de Custo Efetivo',
        price: 60,
        category: "modulos-extras",
        description: 'Mostra parcela + IPVA + gasolina. O "cabe no meu bolso" honesto.',
      },
    ],
  },
];

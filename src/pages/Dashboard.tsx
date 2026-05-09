import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users, TrendingUp, CreditCard, Activity, LogOut, ArrowUpRight, BarChart3, Settings, Bell, Search, Filter, Plus, FileText, Download, MessageCircle, Car, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_LEADS = [
  { id: 1, name: "Maria Silva", email: "maria@example.com", phone: "11987654321", status: "Novo", amount: "R$ 4.500", date: "Hoje, 14:30", source: "Instagram Ads", notes: "Cliente interessada num financiamento de 48x. Quer dar o carro na troca.", tradeIn: "Honda Civic EXL 2.0 2020" },
  { id: 2, name: "João Pedro", email: "joao@example.com", phone: "11912345678", status: "Em Contato", amount: "R$ 1.200", date: "Hoje, 10:15", source: "Google Busca", notes: "Pediu retorno amanhã pela manhã.", tradeIn: "VW Gol 1.0 2015" },
  { id: 3, name: "Carla Santos", email: "carla@example.com", phone: "21999998888", status: "Convertido", amount: "R$ 8.900", date: "Ontem, 16:45", source: "Indicação", notes: "Contrato assinado.", tradeIn: null },
  { id: 4, name: "Roberto Alves", email: "roberto@example.com", phone: "31977776666", status: "Novo", amount: "R$ 3.400", date: "Ontem, 09:20", source: "Facebook Ads", notes: "Dúvida sobre formas de pagamento.", tradeIn: "Toyota Corolla XEi 2019" },
  { id: 5, name: "Fernanda Costa", email: "fernanda@example.com", phone: "41966665555", status: "Perdido", amount: "R$ 5.600", date: "12 Mai, 11:00", source: "Google Busca", notes: "Achou caro no momento.", tradeIn: null },
  { id: 6, name: "Lucas Mendes", email: "lucas@example.com", phone: "51955554444", status: "Convertido", amount: "R$ 2.100", date: "11 Mai, 14:10", source: "Instagram Ads", notes: "Pagamento aprovado via PIX.", tradeIn: "Jeep Compass Longitude 2022" },
];

const CHART_DATA = [
  { name: 'Seg', leads: 400, convertidos: 240 },
  { name: 'Ter', leads: 300, convertidos: 139 },
  { name: 'Qua', leads: 520, convertidos: 380 },
  { name: 'Qui', leads: 450, convertidos: 290 },
  { name: 'Sex', leads: 600, convertidos: 480 },
  { name: 'Sáb', leads: 300, convertidos: 150 },
  { name: 'Dom', leads: 410, convertidos: 280 },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("Visão Geral");
  
  // Transformando os leads em Estado Dinâmico para demonstrar a alteração
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showAllLeads, setShowAllLeads] = useState(false);
  
  // Modal States
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<typeof MOCK_LEADS[0] | null>(null);

  // Campaign State
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Black Friday Antecipada", description: "Geração de leads com foco em descontos premium.", conversion: "12%", cost: "R$ 450", status: "Ativa" }
  ]);
  const [newCampaignName, setNewCampaignName] = useState("");
  const [newCampaignBudget, setNewCampaignBudget] = useState("");

  const handleLogout = () => {
    signOut();
    window.location.href = "/";
  };

  // Função Estratégica: Avançar Negociação
  const handleAdvanceNegotiation = () => {
    if (!selectedLead) return;
    
    // Define o próximo status no funil de vendas
    let nextStatus = "Em Contato";
    if (selectedLead.status === "Novo") nextStatus = "Em Contato";
    else if (selectedLead.status === "Em Contato") nextStatus = "Convertido";
    else nextStatus = "Convertido";
    
    // Atualiza a tabela dinamicamente
    setLeads(leads.map(lead => lead.id === selectedLead.id ? { ...lead, status: nextStatus } : lead));
    
    // Fecha o modal para dar a sensação de conclusão da tarefa
    setSelectedLead(null);
  };

  const statusColors = {
    "Novo": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Em Contato": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Convertido": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Perdido": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  // Generate a random FIPE value for demo purposes when a lead has a trade-in car
  const getFipeValue = (model: string) => {
    const hash = model.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    const price = Math.abs(hash % 100) + 40; 
    return `R$ ${price}.000,00`;
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-50 flex flex-col font-sans selection:bg-primary/30">
      
      {/* ── TOP NAVIGATION GLASSMORPHISM & DROPDOWNS ── */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-black/40 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 group transition-all">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.8)] transition-all">
                <BarChart3 className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:inline-block">LeadFlow Pro</span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {["Visão Geral", "Audiência", "Campanhas", "Relatórios"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab 
                      ? "bg-white/10 text-white shadow-sm" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white rounded-full relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-zinc-950 border-white/10 text-zinc-300">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" onClick={() => setSelectedLead(leads[0])}>
                  Novo lead: Maria Silva
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" onClick={() => setActiveTab("Relatórios")}>
                  Relatório semanal gerado
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="h-6 w-px bg-white/10 mx-1"></div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center border border-white/10">
                    {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || "L"}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline-block">
                    {user?.user_metadata?.full_name?.split(" ")[0] || "Lojista"}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-white/10 text-zinc-300">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" onClick={() => window.alert("Aba de configurações da empresa.")}>
                  <Settings className="w-4 h-4 mr-2" /> Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-white/10 focus:text-white cursor-pointer" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2 text-destructive" /> <span className="text-destructive">Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-7xl px-4 py-8 space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-4">
        
        {/* ── CONTEÚDO DINÂMICO DAS ABAS ── */}
        {activeTab === "Visão Geral" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            {/* ── HEADER TITLE & ACTIONS ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary mb-3 shadow-[0_0_10px_rgba(var(--primary),0.2)]">
                  Últimos 7 dias
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                  Desempenho do Showroom
                </h1>
                <p className="text-zinc-400 mt-2 max-w-2xl text-sm md:text-base">
                  Acompanhe suas métricas de captação e conversão em tempo real. Identifique gargalos e acelere suas vendas.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className={`border-white/10 bg-transparent hover:bg-white/5 ${filterStatus ? 'text-primary' : 'text-white'}`}>
                      <Filter className="w-4 h-4 mr-2" />
                      {filterStatus ? filterStatus : 'Filtrar'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-zinc-950 border-white/10 text-white">
                    <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer" onClick={() => setFilterStatus(null)}>Todos</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer" onClick={() => setFilterStatus('Novo')}>Novo</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer" onClick={() => setFilterStatus('Em Contato')}>Em Contato</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer" onClick={() => setFilterStatus('Convertido')}>Convertido</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer" onClick={() => setFilterStatus('Perdido')}>Perdido</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Export Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary text-black hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle>Exportar Relatório de Leads</DialogTitle>
                      <DialogDescription className="text-zinc-400">
                        Selecione o formato e o período para download dos dados.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 justify-start" onClick={() => window.alert("O download do CSV começará em instantes.")}>
                        <FileText className="w-4 h-4 mr-2" /> Exportar como CSV
                      </Button>
                      <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 justify-start" onClick={() => window.alert("Gerando PDF. Aguarde...")}>
                        <FileText className="w-4 h-4 mr-2" /> Exportar como PDF (Resumo)
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* ── KPI CARDS ── */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Total de Leads", value: "2,845", lift: "+18.2%", icon: Users, color: "text-primary", bg: "bg-primary/10" },
                { title: "Taxa de Conversão", value: "32.4%", lift: "+4.1%", icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10" },
                { title: "Receita Estimada", value: "R$ 142k", lift: "+24.5%", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                { title: "Custo por Lead", value: "R$ 12,40", lift: "-2.3%", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10", reverse: true },
              ].map((kpi, i) => (
                <Card key={i} className="bg-zinc-900/50 backdrop-blur-sm border-white/5 text-white hover:border-white/10 transition-all duration-300 group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">{kpi.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${kpi.bg}`}>
                      <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-3xl font-bold tracking-tight">{kpi.value}</div>
                    <p className={`text-xs flex items-center mt-2 font-medium ${kpi.reverse ? 'text-emerald-400' : 'text-emerald-400'}`}>
                      <ArrowUpRight className={`w-3 h-3 mr-1 ${kpi.reverse && kpi.lift.includes('-') ? 'rotate-180 text-emerald-400' : ''}`} />
                      {kpi.lift} <span className="text-zinc-600 ml-1 font-normal">vs último mês</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
              {/* ── CHART SECTION ── */}
              <Card className="lg:col-span-4 bg-zinc-900/50 backdrop-blur-sm border-white/5">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-white">Fluxo de Captação</CardTitle>
                    <CardDescription className="text-zinc-400 mt-1">
                      Volume de leads vs Conversões nos últimos 7 dias
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="leads" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                        <Area type="monotone" dataKey="convertidos" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorConv)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* ── LEADS INTERACTIVE TABLE SECTION ── */}
              <Card className="lg:col-span-3 bg-zinc-900/50 backdrop-blur-sm border-white/5 flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg text-white">Últimos Contatos</CardTitle>
                    <CardDescription className="text-zinc-400 mt-1">
                      Clique num lead para visualizar o perfil
                    </CardDescription>
                  </div>
                  <Button variant="link" className="text-primary hover:text-primary/80 px-0" onClick={() => setShowAllLeads(!showAllLeads)}>
                    {showAllLeads ? "Ver menos" : "Ver todos"}
                  </Button>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4 mt-2">
                    {leads.filter(l => filterStatus ? l.status === filterStatus : true).slice(0, showAllLeads ? undefined : 5).map((lead) => (
                      <div 
                        key={lead.id} 
                        onClick={() => setSelectedLead(lead)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-semibold text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{lead.name}</p>
                            <p className="text-xs text-zinc-500">{lead.date}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="outline" className={`${statusColors[lead.status as keyof typeof statusColors]} text-[10px] uppercase font-bold tracking-wider`}>
                            {lead.status}
                          </Badge>
                          <span className="text-xs font-medium text-zinc-400">{lead.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Lead Details Modal with Free API Integrations */}
        <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
          <DialogContent className="sm:max-w-[450px] bg-zinc-950 border-white/10 text-white p-0 overflow-hidden">
            <div className="p-6">
              <DialogHeader className="mb-4">
                <DialogTitle>Detalhes do Lead</DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Informações de contato e inteligência de vendas.
                </DialogDescription>
              </DialogHeader>
              
              {selectedLead && (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold border border-primary/30">
                      {selectedLead.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{selectedLead.name}</h3>
                      <Badge variant="outline" className={`${statusColors[selectedLead.status as keyof typeof statusColors]} mt-1`}>
                        {selectedLead.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-zinc-500 uppercase tracking-wider mb-1 block">Contato</Label>
                      <div className="flex gap-2">
                        <Input disabled value={selectedLead.phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")} className="bg-white/5 border-white/10 text-white font-medium flex-1" />
                        <Button 
                          className="bg-[#25D366] hover:bg-[#25D366]/90 text-white shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all" 
                          size="icon"
                          title="Chamar no WhatsApp"
                          onClick={() => window.open(`https://wa.me/55${selectedLead.phone}?text=Olá ${selectedLead.name.split(' ')[0]}, tudo bem? Sou da concessionária e recebi seu interesse.`, '_blank')}
                        >
                          <MessageCircle className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-zinc-500 uppercase tracking-wider mb-1 block">E-mail e Origem</Label>
                      <div className="flex gap-2">
                        <Input disabled value={selectedLead.email} className="bg-white/5 border-white/10 text-white flex-1 text-sm" />
                        <Input disabled value={selectedLead.source} className="bg-white/5 border-white/10 text-zinc-400 w-1/3 text-sm text-center" />
                      </div>
                    </div>
                  </div>

                  {/* AUTOSPEED AI & FIPE (Free Public API Simulation) */}
                  {selectedLead.tradeIn && (
                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-400 group-hover:animate-pulse" />
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Inteligência AutoSpeed</span>
                        </div>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-[10px]">
                          FIPE API
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Car className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-[10px] text-zinc-400 uppercase">Veículo na Troca</p>
                            <p className="text-sm font-semibold text-white">{selectedLead.tradeIn}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">Preço FIPE</p>
                          <p className="text-sm font-bold text-white">{getFipeValue(selectedLead.tradeIn)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-xs text-zinc-500 uppercase tracking-wider mb-1 block">Anotações do Cliente</Label>
                    <div className="bg-white/5 border-white/10 rounded-md p-3 text-sm text-zinc-300 min-h-[80px]">
                      {selectedLead.notes}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter className="bg-zinc-900/50 p-4 border-t border-white/5 sm:justify-between">
              <Button 
                variant="ghost" 
                className="text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10"
                onClick={() => {
                  setLeads(leads.map(lead => lead.id === selectedLead?.id ? { ...lead, status: "Perdido" } : lead));
                  setSelectedLead(null);
                }}
              >
                Marcar como Perdido
              </Button>
              <Button 
                className="bg-primary text-black hover:bg-primary/90 font-bold"
                onClick={handleAdvanceNegotiation}
              >
                Avançar Negociação
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {activeTab === "Audiência" && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-bold text-white">Audiência e Perfil</h2>
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-white/5 p-8 text-center">
              <Users className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Dados Demográficos</h3>
              <p className="text-zinc-400 max-w-md mx-auto">Em breve: Analise a idade, localização e perfil de compra dos visitantes do seu showroom.</p>
              
              <Dialog open={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-6 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">Configurar Rastreamento</Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-950 border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>Pixel e Rastreamento</DialogTitle>
                    <DialogDescription className="text-zinc-400">Instale o pixel do Facebook ou Google Analytics.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Facebook Pixel ID</Label>
                      <Input placeholder="Ex: 1234567890" className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Google Analytics (G-TAG)</Label>
                      <Input placeholder="Ex: G-XXXXXXXXXX" className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      className="bg-primary text-black hover:bg-primary/90 w-full"
                      onClick={() => setIsTrackingModalOpen(false)}
                    >
                      Salvar Configurações
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
        )}

        {activeTab === "Campanhas" && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gestão de Campanhas</h2>
              <Dialog open={isCampaignModalOpen} onOpenChange={setIsCampaignModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-black hover:bg-primary/90"><Plus className="w-4 h-4 mr-2"/> Nova Campanha</Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-950 border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Campanha</DialogTitle>
                    <DialogDescription className="text-zinc-400">Defina os parâmetros de captação para sua nova oferta.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Nome da Campanha</Label>
                      <Input 
                        placeholder="Ex: Oferta de Natal" 
                        className="bg-white/5 border-white/10 text-white" 
                        value={newCampaignName}
                        onChange={(e) => setNewCampaignName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Orçamento Previsto (R$)</Label>
                      <Input 
                        type="number" 
                        placeholder="1000" 
                        className="bg-white/5 border-white/10 text-white" 
                        value={newCampaignBudget}
                        onChange={(e) => setNewCampaignBudget(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/10" onClick={() => setIsCampaignModalOpen(false)}>Cancelar</Button>
                    <Button 
                      className="bg-primary text-black hover:bg-primary/90" 
                      onClick={() => {
                        if (newCampaignName) {
                          setCampaigns([...campaigns, {
                            id: Date.now(),
                            name: newCampaignName,
                            description: `Orçamento previsto: R$ ${newCampaignBudget || '0'}`,
                            conversion: "0%",
                            cost: "R$ 0",
                            status: "Ativa"
                          }]);
                          setNewCampaignName("");
                          setNewCampaignBudget("");
                          setIsCampaignModalOpen(false);
                        }
                      }}
                    >
                      Lançar Campanha
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map(camp => (
                <Card key={camp.id} className="bg-zinc-900/50 border-white/5 p-6 hover:border-primary/30 transition-colors cursor-pointer">
                  <Badge className="bg-emerald-500/10 text-emerald-400 mb-4 border-emerald-500/20">{camp.status}</Badge>
                  <h3 className="text-lg font-bold text-white">{camp.name}</h3>
                  <p className="text-sm text-zinc-400 mt-1">{camp.description}</p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-sm">
                    <span className="text-zinc-400">Conversão: <strong className="text-white">{camp.conversion}</strong></span>
                    <span className="text-zinc-400">Custo: <strong className="text-white">{camp.cost}</strong></span>
                  </div>
                </Card>
              ))}
              
              <Card 
                onClick={() => setIsCampaignModalOpen(true)}
                className="bg-zinc-900/50 border-white/5 p-6 border-dashed flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <Plus className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-lg font-medium text-white">Criar Nova Ação</h3>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "Relatórios" && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-bold text-white">Relatórios Avançados</h2>
            <Card className="bg-zinc-900/50 backdrop-blur-sm border-white/5 p-8 flex flex-col items-center justify-center min-h-[300px]">
              <BarChart3 className="w-16 h-16 text-zinc-600 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Módulo em Desenvolvimento</h3>
              <p className="text-zinc-400 max-w-md mx-auto text-center">Nossos engenheiros estão preparando dashboards de BI personalizados para a sua operação.</p>
            </Card>
          </div>
        )}

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}

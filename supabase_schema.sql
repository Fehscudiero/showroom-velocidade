-- =================================================================================
-- SCRIPT DE BANCO DE DADOS PARA SUPABASE (SHOWROOM-VELOCIDADE)
-- =================================================================================
-- Cole e execute este script no "SQL Editor" do seu painel Supabase.

-- 1. Tabela de Leads
CREATE TABLE public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- ID do Lojista (Dono do Lead)
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'Novo', -- 'Novo', 'Em Contato', 'Convertido', 'Perdido'
    amount DECIMAL(10,2) DEFAULT 0.00,
    source TEXT DEFAULT 'Direto',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela de Campanhas (Opcional, para a aba "Campanhas")
CREATE TABLE public.campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    budget DECIMAL(10,2) DEFAULT 0.00,
    status TEXT DEFAULT 'Ativa',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =================================================================================
-- POLÍTICAS DE SEGURANÇA (RLS - Row Level Security)
-- =================================================================================
-- O lojista só pode ver e editar os LEADS e CAMPANHAS que pertencem ao seu user_id.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Política para Leads
CREATE POLICY "Lojistas veem seus proprios leads" 
ON public.leads FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Lojistas inserem seus proprios leads" 
ON public.leads FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Lojistas atualizam seus proprios leads" 
ON public.leads FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Lojistas deletam seus proprios leads" 
ON public.leads FOR DELETE 
USING (auth.uid() = user_id);

-- Política para Campanhas
CREATE POLICY "Lojistas veem suas campanhas" 
ON public.campaigns FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Lojistas inserem suas campanhas" 
ON public.campaigns FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Lojistas atualizam suas campanhas" 
ON public.campaigns FOR UPDATE 
USING (auth.uid() = user_id);

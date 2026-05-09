-- =================================================================================
-- SCRIPT DE POPULAÇÃO MOCK (SEED) PARA SUPABASE
-- =================================================================================
-- Execute este script no SQL Editor após ter criado as tabelas.
-- ATENÇÃO: Substitua 'COLOQUE_AQUI_O_SEU_USER_ID' pelo ID real de um usuário 
-- criado no painel de Authentication do Supabase para não dar erro de chave estrangeira.

-- Inserindo Campanhas Falsas
INSERT INTO public.campaigns (id, user_id, name, budget, status)
VALUES 
(gen_random_uuid(), 'COLOQUE_AQUI_O_SEU_USER_ID', 'Black Friday Antecipada', 1500.00, 'Ativa'),
(gen_random_uuid(), 'COLOQUE_AQUI_O_SEU_USER_ID', 'Queima de Estoque Seminovos', 800.00, 'Ativa');

-- Inserindo Leads Falsos para validação visual
INSERT INTO public.leads (id, user_id, name, email, phone, status, amount, source, notes)
VALUES 
(gen_random_uuid(), 'COLOQUE_AQUI_O_SEU_USER_ID', 'Maria Silva', 'maria@example.com', '(11) 98765-4321', 'Novo', 4500.00, 'Instagram Ads', 'Cliente interessada no financiamento em 48x.'),
(gen_random_uuid(), 'COLOQUE_AQUI_O_SEU_USER_ID', 'João Pedro', 'joao@example.com', '(11) 91234-5678', 'Em Contato', 1200.00, 'Google Busca', 'Pediu retorno amanhã pela manhã para fechar.'),
(gen_random_uuid(), 'COLOQUE_AQUI_O_SEU_USER_ID', 'Carla Santos', 'carla@example.com', '(21) 99999-8888', 'Convertido', 8900.00, 'Indicação', 'Contrato assinado. Enviar link de pagamento final.'),
(gen_random_uuid(), 'COLOQUE_AQUI_O_SEU_USER_ID', 'Roberto Alves', 'roberto@example.com', '(31) 97777-6666', 'Novo', 3400.00, 'Facebook Ads', 'Dúvida sobre formas de pagamento e taxa de juros.'),
(gen_random_uuid(), 'COLOQUE_AQUI_O_SEU_USER_ID', 'Fernanda Costa', 'fernanda@example.com', '(41) 96666-5555', 'Perdido', 5600.00, 'Google Busca', 'Achou as parcelas altas no momento. Tentar repescagem mês que vem.'),
(gen_random_uuid(), 'COLOQUE_AQUI_O_SEU_USER_ID', 'Lucas Mendes', 'lucas@example.com', '(51) 95555-4444', 'Convertido', 2100.00, 'Instagram Ads', 'Pagamento aprovado via PIX à vista.');

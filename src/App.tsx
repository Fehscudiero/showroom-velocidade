import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";

// 🚀 1. A PÁGINA INICIAL FICA SÍNCRONA (Prioridade Máxima para o LCP)
import Index from "./pages/Index.tsx";

// 🚀 2. CODE SPLITTING (Fatiamento de Código) NAS ROTAS SECUNDÁRIAS E MODAIS
// Isso retira dezenas/centenas de KB do bundle inicial.
const Adicionais = lazy(() => import("./pages/Adicionais.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail.tsx"));

// Como o AuthModal é um "named export" (foi importado com chaves {} originalmente),
// o React.lazy precisa desestruturá-lo para injetar como default.
const AuthModalLazy = lazy(() =>
  import("@/components/auth/AuthModal").then((module) => ({
    default: module.AuthModal,
  }))
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        {/* O Suspense segura as pontas caso o usuário navegue para uma rota preguiçosa */}
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <AuthModalLazy />
          <BrowserRouter>
            <Routes>
              {/* O Index carrega imediatamente com a Main Thread livre */}
              <Route path="/" element={<Index />} />
              
              {/* Estas rotas só terão seu JS lido e avaliado sob demanda */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/adicionais" element={<Adicionais />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
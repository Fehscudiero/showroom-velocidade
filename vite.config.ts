import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  // 🚀 OTIMIZAÇÃO DE REDE: Desativa o modulePreload automático do Vite.
  // Isso impede que os componentes lazy() sejam baixados antes da hora,
  // liberando a banda para o CSS e a Imagem de LCP.
  build: {
    modulePreload: {
      polyfill: false,
    },
    cssCodeSplit: true,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
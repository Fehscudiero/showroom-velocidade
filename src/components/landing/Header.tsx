import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
// Importação da logo
import logoImg from "@/assets/logo.png";

const Header = () => {
  const { setAuthModalOpen, setAuthView, user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#solucao", label: "Como funciona" },
    { href: "#features", label: "Tecnologia" },
    { href: "#planos", label: "Planos" },
    { href: "#expansao", label: "Módulos" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-black/80 border-b border-border shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 md:h-24 items-center justify-between">
        {/* ── LOGO COM TAMANHOS RESPONSIVOS ── */}
        <a
          href="#"
          className="flex items-center transition-transform hover:scale-105 active:scale-95"
        >
          <img
            src={logoImg}
            alt="Logo da Empresa"
            // h-14: 56px no Mobile (tamanho bem visível no header h-16)
            // md:h-20: 80px no Tablet/Desktop médio
            // lg:h-20: 80px no Desktop grande
            className="pt-14 h-18 md:h-64 lg:h-26 w-auto object-contain transition-all duration-300"
          />
        </a>

        {/* ── NAVEGAÇÃO DESKTOP ── */}
        <nav className="hidden lg:flex items-center gap-8 text-sm text-white/80">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-medium hover:text-white hover:underline underline-offset-4 decoration-2 decoration-primary/50 transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* ── AÇÕES DESKTOP ── */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 mr-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-sm font-medium text-white">
                Olá, {user.user_metadata?.full_name?.split(" ")[0] || "Lojista"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-white/70 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => signOut()}
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="font-semibold text-white hover:bg-white/10"
              onClick={() => {
                setAuthView("login");
                setAuthModalOpen(true);
              }}
            >
              Login do Lojista
            </Button>
          )}
          <Button
            variant="hero"
            size="sm"
            className="font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
            asChild
          >
            <a href="#planos">Agendar demo</a>
          </Button>
        </div>

        {/* ── BOTÃO MENU MOBILE ── */}
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── MENU MOBILE EXPANDIDO ── */}
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-black/95 backdrop-blur-md shadow-xl animate-in slide-in-from-top-2">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-4 border-t border-border/60">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm font-semibold text-white text-center bg-white/10 rounded-lg">
                    Olá,{" "}
                    {user.user_metadata?.full_name?.split(" ")[0] || "Lojista"}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-center text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      signOut();
                      setOpen(false);
                    }}
                  >
                    Sair da Conta
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlineGlow"
                  className="w-full justify-center h-12"
                  onClick={() => {
                    setAuthView("login");
                    setAuthModalOpen(true);
                    setOpen(false);
                  }}
                >
                  Login do Lojista
                </Button>
              )}
              <Button
                variant="hero"
                className="w-full justify-center h-12 text-base font-bold"
                asChild
              >
                <a href="#planos" onClick={() => setOpen(false)}>
                  Agendar demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import { Button } from "@/components/ui/button";
import { Menu, X, Car, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/85 border-b border-border shadow-sm">
      <div className="container max-w-7xl flex h-14 md:h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid place-items-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Car className="w-4 h-4 md:w-5 md:h-5" />
          </span>
          <span className="text-base md:text-lg">Showroom<span className="text-primary">.</span></span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 mr-2">
              <span className="text-sm font-medium text-foreground">
                Olá, {user.user_metadata?.full_name?.split(' ')[0] || 'Lojista'}
              </span>
              <Button variant="ghost" size="icon" onClick={() => signOut()} title="Sair">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => { setAuthView('login'); setAuthModalOpen(true); }}>
              Login do Lojista
            </Button>
          )}
          <Button variant="hero" size="sm" asChild>
            <a href="#planos">Agendar demo</a>
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95">
          <div className="container max-w-7xl py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <>
                  <div className="py-2 text-sm font-medium text-foreground text-center">
                    Olá, {user.user_metadata?.full_name?.split(' ')[0] || 'Lojista'}
                  </div>
                  <Button variant="outline" onClick={() => { signOut(); setOpen(false); }}>
                    Sair da Conta
                  </Button>
                </>
              ) : (
                <Button variant="outlineGlow" onClick={() => { setAuthView('login'); setAuthModalOpen(true); setOpen(false); }}>
                  Login do Lojista
                </Button>
              )}
              <Button variant="hero" asChild>
                <a href="#planos">Agendar demo</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
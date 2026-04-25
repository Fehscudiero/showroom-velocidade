import { Button } from "@/components/ui/button";
import { Menu, X, Car } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#solucao", label: "Como funciona" },
    { href: "#features", label: "Tecnologia" },
    { href: "#planos", label: "Planos" },
    { href: "#expansao", label: "Módulos" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Car className="w-5 h-5" />
          </span>
          <span>Showroom<span className="text-primary">.</span></span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a href="#login">Login do Lojista</a>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <a href="#planos">Agendar demo</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95">
          <div className="container py-4 flex flex-col gap-3">
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
              <Button variant="outlineGlow" asChild>
                <a href="#login">Login do Lojista</a>
              </Button>
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

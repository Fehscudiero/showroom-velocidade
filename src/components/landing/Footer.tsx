import { Car, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="login" className="border-t border-border bg-muted/40">
      <div className="container py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                <Car className="w-5 h-5" />
              </span>
              <span>Showroom<span className="text-primary">.</span></span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              O braço tecnológico da sua loja de veículos. Catálogos digitais de alta conversão.
            </p>
            <div className="flex gap-2 mt-5">
              {[Instagram, Linkedin, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-border bg-background grid place-items-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label="Rede social"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Produto</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Tecnologia</a></li>
              <li><a href="#planos" className="hover:text-foreground">Planos</a></li>
              <li><a href="#expansao" className="hover:text-foreground">Módulos</a></li>
              <li><a href="#solucao" className="hover:text-foreground">Como funciona</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Sobre</a></li>
              <li><a href="#" className="hover:text-foreground">Cases</a></li>
              <li><a href="#" className="hover:text-foreground">Contato</a></li>
              <li><a href="#" className="hover:text-foreground">Termos & Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Já é cliente?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Acesse seu painel para gerenciar estoque e métricas.
            </p>
            <Button variant="hero" className="w-full">
              Acessar meu Showroom
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Showroom de Bolso. Todos os direitos reservados.</p>
          <p>Feito com performance obsessiva no Brasil 🇧🇷</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

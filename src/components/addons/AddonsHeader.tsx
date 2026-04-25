import { Link } from "react-router-dom";
import { Car, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddonsHeader = () => {
  return (
    <header className="sticky top-0 inset-x-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-slate-900">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-md">
            <Car className="w-5 h-5" />
          </span>
          <span>Showroom<span className="text-primary">.</span></span>
        </Link>

        <Button variant="ghost" size="sm" asChild className="text-slate-700 hover:text-slate-900 hover:bg-slate-100">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" /> Voltar para o site
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default AddonsHeader;

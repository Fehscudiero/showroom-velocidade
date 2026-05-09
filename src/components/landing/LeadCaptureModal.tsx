import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

export function LeadCaptureModal({ children }: { children: React.ReactNode }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui aconteceria o envio real para a tabela "leads_autospeed" (A ser criada)
    setSubmitted(true);
  };

  return (
    <Dialog onOpenChange={(open) => !open && setTimeout(() => setSubmitted(false), 500)}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Agendar Demonstração</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Deixe seus dados e um de nossos especialistas em performance automotiva entrará em contato.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-zinc-300">Nome Completo</Label>
                <Input required placeholder="Ex: João Silva" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">E-mail Profissional</Label>
                <Input required type="email" placeholder="joao@sualoja.com.br" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">WhatsApp (com DDD)</Label>
                <Input required placeholder="(11) 99999-9999" className="bg-white/5 border-white/10 text-white" />
              </div>
              <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90 font-bold text-md h-12 mt-4 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                Solicitar Contato Especializado
              </Button>
            </form>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <DialogTitle className="text-2xl text-white font-bold">Solicitação Recebida!</DialogTitle>
            <DialogDescription className="text-zinc-400 max-w-[280px]">
              Nossa equipe já recebeu seus dados. Entraremos em contato via WhatsApp em até 15 minutos úteis.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

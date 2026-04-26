import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function VerifyEmail() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4 flex flex-col items-center">
          <div className="bg-primary/10 p-4 rounded-full">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Verifique seu e-mail</CardTitle>
          <CardDescription>
            Nós enviamos um link de confirmação para o seu endereço de e-mail.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Por favor, verifique sua caixa de entrada (e a pasta de spam) e clique no link para ativar sua conta antes de fazer o login.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link to="/login">Voltar para o Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

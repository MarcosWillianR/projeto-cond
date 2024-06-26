import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/forms/register-form";
import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import backgroundImage from "@/images/background-auth.jpg";

export const metadata: Metadata = {
  title: "Registro",
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundImage}
          alt=""
          unoptimized
        />
        {/* <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div> */}
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar uma nova conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Já possui uma conta?{" "}
              <Link
                href="/"
                className="font-medium text-primary hover:underline"
              >
                Fazer login
              </Link>
            </p>
          </div>

          <RegisterForm />

          <p className="px-2 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, você concorda com nossos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

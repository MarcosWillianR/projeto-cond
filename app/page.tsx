import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/forms/login-form";
import Logo from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import backgroundImage from "@/images/background-auth.jpg";

export const metadata: Metadata = {
  title: "Login",
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
              Fazer login
            </h1>
            <p className="text-sm text-muted-foreground">
              Ainda não possui uma conta?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Registre-se
              </Link>
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

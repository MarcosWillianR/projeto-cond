"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import * as z from "zod";

import api from "@/services/api";
import { capitalizeFirstLetter } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(3, { message: "Nome obrigatório" }),
  lastName: z.string().min(3, { message: "Sobrenome obrigatório" }),
  cpf: z.string().refine((cpf: string) => {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    const cpfDigits = cpf.split("").map((el) => +el);
    const rest = (count: number): number => {
      return (
        ((cpfDigits
          .slice(0, count - 12)
          .reduce((soma, el, index) => soma + el * (count - index), 0) *
          10) %
          11) %
        10
      );
    };
    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  }, "Digite um cpf válido."),
  phone: z.string().min(11, { message: "Insira um telefone + DDD válido" }),
  email: z.string().email({ message: "Insira um email válido" }),
  password: z.string().min(4, { message: "Insira uma senha válida" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (formData: UserFormValue) => {
    setLoading(true);

    try {
      const capitalizedFirstName = capitalizeFirstLetter(formData.firstName);
      const capitalizedLastName = capitalizeFirstLetter(formData.lastName);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ASAAS_API_URL!}/customers`,
        {
          name: `${capitalizedFirstName} ${capitalizedLastName}`,
          cpfCnpj: formData.cpf,
        },
        {
          headers: {
            access_token: process.env.NEXT_PUBLIC_ASAAS_TOKEN!,
          },
        },
      );

      if (!data.id) {
        toast({
          variant: "destructive",
          title: "Houve um problema!",
          description:
            "Estamos com dificuldades para realizar seu cadastro, por favor, tente novamente.",
        });
        return;
      }

      await api.post("user", {
        asaasCustomerId: data.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        access: "USER",
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        cpf: formData.cpf,
      });

      setLoading(false);
      router.push("/");

      toast({
        title: "Sucesso!",
        description:
          "Cadastro realizado com sucesso, você já pode fazer o login na plataforma.",
      });
    } catch (error: any) {
      setLoading(false);

      toast({
        variant: "destructive",
        title: "Houve um problema!",
        description: error,
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nome"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Sobrenome"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Insira seu CPF"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Insira seu Telefone com DDD"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Insira seu e-mail"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Insira sua senha"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              isLoading={loading}
              className="ml-auto w-full"
              type="submit"
            >
              Criar conta
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

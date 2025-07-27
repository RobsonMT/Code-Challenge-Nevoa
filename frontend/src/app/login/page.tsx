"use client";

import { api } from "@/lib/api";
import * as yup from "yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignInData } from "@/interfaces";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório. Ex: nome@email.com.")
    .email("E-mail inválido"),
  password: yup.string().required("Campo obrigatório."),
});

type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleSignIn = async (data: ISignInData) => {
    try {
      const res = await api.post("/login", data);
      localStorage.setItem("token", res.data.token);
      return router.push("/cursos");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        // Erro com resposta da API
        console.error("Erro de API:", error.response.data);
        alert(error.response.data.message || "Erro ao fazer login.");
      } else if (error.request) {
        // Erro de rede
        console.error("Erro de rede:", error.request);
        alert("Sem resposta do servidor. Verifique sua conexão.");
      } else {
        // Outro erro
        console.error("Erro desconhecido:", error.message);
        alert("Erro inesperado ao tentar login.");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Entre na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Não é membro?{" "}
          <Link
            href={"/register"}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Registrar-se
          </Link>
        </p>
      </div>
    </div>
  );
}

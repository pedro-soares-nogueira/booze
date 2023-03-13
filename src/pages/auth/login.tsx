import { GoogleLogo } from "phosphor-react"
import React from "react"
import { signIn } from "next-auth/react"
import Head from "next/head"
import { GetServerSideProps } from "next"
import { authOptions } from "./../api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session?.user !== undefined) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Login = () => {
  return (
    <>
      <Head>
        <title>Booze | Login - Usuário</title>
        <link rel="icon" href="/booze.svg" />
      </Head>
      <div className="w-full h-screen flex items-center justify-center px-8">
        <div className="space-y-10">
          <div className="space-y-2">
            <h1 className="font-semibold text-xl text-center">
              Bem vindo, Boozer.
            </h1>
            <span className="block">Faça login para ver e comprar!</span>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="py-3 px-4 rounded-lg font-semibold bg-transparent border border-red-400 text-red-400 
          transition-all disabled:opacity-25 w-full flex items-center justify-center gap-3"
          >
            Entrar com google
            <GoogleLogo size={32} />
          </button>
        </div>
      </div>
    </>
  )
}

export default Login

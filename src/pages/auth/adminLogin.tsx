import { GoogleLogo } from 'phosphor-react'
import React from 'react'
import { signIn } from 'next-auth/react'
import Head from 'next/head'

const Login = () => {
  return (
    <>
      <Head>
        <title>Booze | Login - Admin</title>
        <link rel='icon' href='/booze.svg' />
      </Head>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='space-y-5'>
          <h1 className='font-semibold text-xl'>
            Bem-vindo, administrador. Faça login e gerencie os pedidos
          </h1>

          <button
            onClick={() => signIn('google', { callbackUrl: '/admin/dashboard' })}
            className='py-3 px-4 rounded-lg font-semibold bg-transparent border border-red-400 text-red-400 
          transition-all disabled:opacity-25 w-full flex items-center justify-center gap-3'
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

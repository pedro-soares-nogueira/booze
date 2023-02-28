import Head from 'next/head'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const User = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Booze - Usuário</title>
        <link rel='icon' href='/minibar-black.png' />
      </Head>
      <main className='flex flex-col items-start justify-center gap-8 py-8 px-4'>
        {session ? (
          <div className='space-y-10 w-full'>
            <div className='flex flex-col items-center justify-center gap-3'>
              <div className='bg-neutral-500 rounded-full w-28 h-28'></div>
              <div className='flex flex-col items-center justify-center'>
                <span className='font-bold text-xl'>{session.user?.name}</span>
                <span className='text-sm'>{session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className='mt-3 py-2 px-4 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
                transition-all disabled:opacity-25 w-full'
                >
                  Sair
                </button>
              </div>
            </div>

            <hr className='border-neutral-600' />

            <div className='space-y-3'>
              <h2 className='text-lg font-semibold'>Todos os pedidos</h2>
              <small>Você ainda não tem pedidos</small>
            </div>
          </div>
        ) : (
          <>
            <p>Você ainda não esta logado</p>

            <button
              onClick={() => signIn('google')}
              className='py-3 px-4 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
                transition-all disabled:opacity-25 w-full'
            >
              Logar com Google
            </button>
          </>
        )}
      </main>
    </>
  )
}

export default User

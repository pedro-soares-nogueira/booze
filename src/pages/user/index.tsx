import Head from 'next/head'
import React, { ReactElement, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { prisma } from './../../lib/prisma'
import { authOptions } from './../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { priceFormatter } from '@/utils/formatter'
import Layout from '@/components/layout'
import ProductsOnOrder from '@/components/ProductsOnOrder'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface OrdersDetails {
  orders: {
    id: string
    payment_mode: string
    price_amount: number
    userId: string
    createdAt: string
    ProductsOnOrder: {
      productId: string
      orderId: string
      quantify: number
    }[]
  }[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  })

  const ordersArray = await prisma.order.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      ProductsOnOrder: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  const orders = JSON.parse(JSON.stringify(ordersArray))

  if (session?.user === undefined) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: { orders },
  }
}

const User = ({ orders }: OrdersDetails) => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Booze | Usuário - Perfil</title>
        <link rel='icon' href='/minibar-black.png' />
      </Head>
      <main className='flex flex-col items-start justify-center gap-8 py-8 px-4'>
        {session ? (
          <div className='w-full grid md:grid-cols-4 items-start justify-center'>
            <div className='flex flex-col items-center justify-center gap-3 sticky top-8'>
              <div>
                <img
                  src={session.user?.image}
                  alt=''
                  className='rounded-full w-28 h-28 flex items-center justify-center'
                />
              </div>
              <div className='flex flex-col items-center justify-center'>
                <span className='font-bold text-xl'>{session.user?.name}</span>
                <span className='text-sm'>{session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className='mt-3 py-2 px-4 rounded-lg font-bold border border-red-500 text-red-500 hover:text-red-700 
                              transition-all disabled:opacity-25 w-full'
                >
                  Sair
                </button>
              </div>
            </div>

            <div className='space-y-4 md:col-span-3'>
              <h2 className='text-lg font-semibold'>Todos os pedidos</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {orders.length === 0 ? (
                  <>Você ainda não tem pedidos</>
                ) : (orders.map((order) => {
                  return (
                    <div
                      key={order.id}
                      className='bg-white border border-gray-300 rounded-md w-full h-full p-4 
                                flex flex-col items-start justify-between gap-4'
                    >
                      <div className="flex flex-col items-start justify-center gap-3 w-full">
                        <div className='flex items-start justify-between gap-2 w-full'>
                          <p className='font-semibold text-lg uppercase'>
                          {format(parseISO(order.createdAt), "d 'de' LLLL", {
                            locale: ptBR,
                          })}
                          </p>
                          <p className='font-semibold text-lg'>
                            {priceFormatter.format(order.price_amount / 100)}
                          </p>
                        </div>
                        
                        <div className='w-full'>
                          {order.ProductsOnOrder.map((prod, index) => {
                            return <ProductsOnOrder key={index} {...prod}/>
                          })}
                        </div>
                      </div>


                      <div className='flex items-center justify-center w-full'>
                        <button disabled className='disabled:opacity-50 disabled:hover:cursor-not-allowed py-2 w-full bg-red-500 rounded-md hover:bg-red-700 text-white transition-all'>
                          Refazer
                        </button>
                        <button disabled className='disabled:opacity-90 disabled:hover:cursor-not-allowed py-2 w-full text-red-500 hover:text-red-700 transition-all'>
                          Ver Mais
                        </button>
                      </div>

                    </div>
                  )
                }))}
              </div>
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

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default User

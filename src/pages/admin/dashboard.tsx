import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { House, DotsThreeVertical, Plus } from 'phosphor-react'
import Head from 'next/head'
import { prisma } from './../../lib/prisma'
import { GetServerSideProps } from 'next'
import { authOptions } from './../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { priceFormatter } from '@/utils/formatter'
import { useSession, signOut } from 'next-auth/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import ProductsOnOrder from '@/components/ProductsOnOrder'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import * as Dialog from '@radix-ui/react-dialog'
import OrderDetails from '@/components/orders/OrderDetails'
import beer from '@/assets/booze.svg'

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

  if (session?.user === undefined) {
    return {
      redirect: {
        destination: '/auth/adminLogin',
        permanent: false,
      },
    }
  }

  return {
    props: { orders },
  }
}

const Dashboard = ({ orders }: OrdersDetails) => {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Booze | Admin - Dashboard</title>
        <link rel='icon' href='/booze.svg' />
      </Head>
      <div>
        <nav className='w-full border-b border-gray-300'>
          <div className='max-w-[1100px] m-auto flex items-center justify-between py-2 px-4'>
            <Image src={beer} width={40} height={40} alt='Logo' />
            <Link href={'/admin/dashboard'}>
              <span className='text-4xl font-bold text-red-600 tracking-wide'>
                Booze
              </span>
            </Link>
            <ul className='flex items-center justify-center gap-3 md:gap-5'>
              <li>
                <Link href={'/admin/dashboard'}>
                  <House size={32} weight={'fill'} />
                </Link>
              </li>
              <li className='flex items-center justify-center'>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Link href={'/admin/dashboard'}>
                      <img
                        src={session?.user?.image}
                        alt=''
                        className='rounded-full w-9 h-9 flex items-center justify-center'
                      />
                    </Link>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className='border borer-gray-400 rounded-md p-4 mt-1 bg-white shadow-md'>
                      <DropdownMenu.Item>
                        <button
                          onClick={() => signOut()}
                          className='mt-3 py-2 px-12 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
                                      transition-all disabled:opacity-25 w-full'
                        >
                          Sair
                        </button>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </li>
            </ul>
          </div>
        </nav>

        <div className='max-w-[1100px] m-auto flex flex-col items-center justify-between py-10 px-4 gap-10'>
          <h1 className='text-2xl font-semibold text-gray-700'>
            Bem vindo, Boozer admin
          </h1>

          <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-5'>
            <span className='bg-gray-200 rounded-md p-4 w-full space-y-2'>
              <p className='text-md text-gray-700'>Pedidos por dia</p>
              <p className='text-3xl text-gray-700 font-bold'>22</p>
            </span>
            <span className='bg-gray-200 rounded-md p-4 w-full space-y-2'>
              <p className='text-md text-gray-700'>Pedidos por dia</p>
              <p className='text-3xl text-gray-700 font-bold'>R$355,80</p>
            </span>
            <span className='bg-gray-200 rounded-md p-4 w-full space-y-2'>
              <p className='text-md text-gray-700'>Pedidos por periodo</p>
              <p className='text-3xl text-gray-700 font-bold'>R$930,25</p>
            </span>
          </div>

          <h2 className='text-2xl font-semibold text-gray-700'>
            Todos os pedidos
          </h2>

          <div className='w-full grid grid-cols-3 gap-2'>
            {orders.map((order) => {
              return (
                <div
                  key={order.id}
                  className='p-4 space-y-3 border border-gray-300 rounded-md 
                            flex flex-col items-start justify-between gap-2'
                >
                  <div className='w-full'>
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
                        return <ProductsOnOrder key={index} {...prod} />
                      })}
                    </div>
                  </div>

                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        className='disabled:opacity-90 disabled:hover:cursor-not-allowed py-2 w-full rounded-md
                        text-red-500 hover:text-red-700 transition-all border border-red-500'
                      >
                        Ver Mais
                      </button>
                    </Dialog.Trigger>
                    <OrderDetails />
                  </Dialog.Root>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

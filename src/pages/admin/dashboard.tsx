import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { House, DotsThreeVertical } from 'phosphor-react'
import beer from '@/assets/minibar-black.png'
import Head from 'next/head'
import { prisma } from './../../lib/prisma'
import { GetServerSideProps } from 'next'
import { authOptions } from './../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { priceFormatter } from '@/utils/formatter'
import { useSession, signOut } from 'next-auth/react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import ProductsOnOrder from '@/components/ProductsOnOrder'

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

  const ordersArray = await prisma.order.findMany({
    include: {
      ProductsOnOrder: true,
    },
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

const Dashboard = ({ orders }: OrdersDetails) => {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Booze - Admin</title>
        <link rel='icon' href='/minibar-black.png' />
      </Head>
      <div>
        <nav className='w-full border-b border-gray-300'>
          <div className='max-w-[1100px] m-auto flex items-center justify-between py-2 px-4'>
            <Image src={beer} width={40} height={40} alt='Logo' />
            <Link href={'/'}>
              <span className='text-4xl font-semibold text-gray-700'>
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

          <div className='w-full space-y-3'>
            {orders.map((order) => {
              return (
                <div
                  key={order.id}
                  className='p-4 space-y-3 border-b border-gray-300'
                >
                  <div className='flex items-start justify-between gap-2 '>
                    <p className='font-semibold text-lg uppercase'>
                      {order.createdAt}
                    </p>
                    <p className='font-semibold text-lg'>
                      {priceFormatter.format(order.price_amount / 100)}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className="w-full">
                    {order.ProductsOnOrder.map((prod, index) => {
                            return <ProductsOnOrder key={index} {...prod}/>
                          })}
                    </div>
                    <button className='p-2 bg-gray-500 hover:bg-gray-700 transition-all text-white rounded-full text-sm'>
                    <DotsThreeVertical size={22} />
                    </button>
                  </div>
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

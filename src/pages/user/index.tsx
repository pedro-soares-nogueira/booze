import Head from "next/head"
import React, { ReactElement, useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { GetServerSideProps } from "next"
import { prisma } from "./../../lib/prisma"
import { authOptions } from "./../api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { priceFormatter } from "@/utils/formatter"
import Layout from "@/components/layout"
import ProductsOnOrder from "@/components/ProductsOnOrder"
import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { UserCircle } from "phosphor-react"
import { IOrdersDetails, IUser } from "@/interfaces"
import { api } from "@/lib/axios"
import Tag from "@/components/designSystem/Tag"
import { useAppDispatch, useAppSelector } from "@/hooks/useReducer"
import { ordersActions } from "@/reducers/features/ordersSlice"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session?.user === undefined) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user!.email,
    },
  })

  return {
    props: { user },
  }
}

const User = ({ user }: IUser) => {
  const { data: session } = useSession()

  const { orders, loading } = useAppSelector((state) => state.orders)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(ordersActions.fetchOrders())
  }, [dispatch])

  const ordersByUser = orders.filter((order) => order.userId === user.id)

  return (
    <>
      <Head>
        <title>Booze | Usuário - Perfil</title>
        <link rel="icon" href="/beerDay.png" />
      </Head>
      <main className="flex flex-col items-start justify-center gap-8 py-8 px-4">
        {session ? (
          <div className="w-full md:grid grid-cols-4 gap-8 items-start justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <UserCircle
                size={32}
                weight="light"
                className="rounded-full w-36 h-36 flex items-center justify-center"
              />
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-xl">{session.user?.name}</span>
                <span className="text-sm">{session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="mt-8 py-2 px-4 rounded-lg font-bold border border-[#006E71] text-[#006E71] hover:opacity-90 
                              transition-all disabled:opacity-25 w-full"
                >
                  Sair
                </button>
              </div>
            </div>

            <div className="space-y-4 md:col-span-3 mt-10">
              <h2 className="text-lg font-semibold">Todos os pedidos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {loading ? (
                  <p>Carregando</p>
                ) : ordersByUser.length === 0 ? (
                  <>Você ainda não tem pedidos</>
                ) : (
                  ordersByUser.map((order) => {
                    return (
                      <div
                        key={order.id}
                        className="bg-white border border-gray-300 rounded-md w-full h-full p-4 
                                flex flex-col items-start justify-between gap-4"
                      >
                        <div className="flex flex-col items-end justify-center gap-3 w-full">
                          <Tag title={order.orderStatus.title} />
                          <div className="flex items-start justify-between gap-2 w-full">
                            <p className="font-semibold text-lg uppercase">
                              {format(
                                parseISO(order.createdAt),
                                "d 'de' LLLL",
                                {
                                  locale: ptBR,
                                }
                              )}
                            </p>
                            <p className="font-semibold text-lg">
                              {priceFormatter.format(order.price_amount / 100)}
                            </p>
                          </div>

                          <div className="w-full">
                            {order.ProductsOnOrder.map((prod, index) => {
                              return <ProductsOnOrder key={index} {...prod} />
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <p>Você ainda não esta logado</p>

            <button
              onClick={() => signIn("google")}
              className="py-3 px-4 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-600 
                transition-all disabled:opacity-25 w-full"
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

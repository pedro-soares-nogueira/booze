import React, { ReactElement, useEffect, useState } from "react"
import Head from "next/head"
import { priceFormatter } from "@/utils/formatter"
import ProductsOnOrder from "@/components/ProductsOnOrder"
import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import * as Dialog from "@radix-ui/react-dialog"
import OrderDetails from "@/components/orders/OrderDetails"
import Layout from "@/components/layout"
import Tag from "@/components/designSystem/Tag"
import { useAppDispatch, useAppSelector } from "@/hooks/useReducer"
import { ordersActions } from "@/reducers/features/ordersSlice"

const Dashboard = () => {
  const { orders, loading } = useAppSelector((state) => state.orders)
  const dispatch = useAppDispatch()
  console.log(orders)

  useEffect(() => {
    dispatch(ordersActions.fetchOrders())
  }, [dispatch])

  return (
    <>
      <Head>
        <title>Booze | Admin - Dashboard</title>
        <link rel="icon" href="/beerDay.png" />
      </Head>
      <div>
        <div className="max-w-[1100px] m-auto flex flex-col items-start justify-between py-10 px-4 gap-10">
          <h1 className="text-2xl font-semibold text-gray-800">
            Bem vindo, Boozer admin
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
            <span className="bg-[#006E71] bg-opacity-20 rounded-md p-4 w-full space-y-2 text-gray-800">
              <p className="text-md">Pedidos por dia</p>
              <p className="text-3xl font-bold">22</p>
            </span>
            <span className="bg-[#006E71] bg-opacity-20 rounded-md p-4 w-full space-y-2 text-gray-800">
              <p className="text-md">Pedidos por dia</p>
              <p className="text-3xl font-bold">R$355,80</p>
            </span>
            <span className="bg-[#006E71] bg-opacity-20 rounded-md p-4 w-full space-y-2 text-gray-800">
              <p className="text-md">Pedidos por periodo</p>
              <p className="text-3xl font-bold">R$930,25</p>
            </span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800">
            Todos os pedidos
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
            {loading ? (
              <p className="md:col-span-3">Carregando...</p>
            ) : (
              orders.map((order) => {
                return (
                  <div
                    key={order.id}
                    className="p-4 space-y-3 border border-gray-300 rounded-md 
                            flex flex-col items-start justify-between gap-2"
                  >
                    <div className="w-full">
                      <Tag title={order.orderStatus.title} />
                      <div className="flex items-start justify-between gap-2 w-full">
                        <p className="font-semibold text-lg uppercase">
                          {format(parseISO(order.createdAt), "d 'de' LLLL", {
                            locale: ptBR,
                          })}
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

                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button
                          className="disabled:opacity-90 disabled:hover:cursor-not-allowed py-2 w-full rounded-md
                        text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                        >
                          Ver Mais
                        </button>
                      </Dialog.Trigger>
                      <OrderDetails {...order} />
                    </Dialog.Root>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard

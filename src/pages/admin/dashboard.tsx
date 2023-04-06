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
import Summary from "@/components/admin/Summary"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Plus } from "phosphor-react"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../api/auth/[...nextauth]"

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

const Dashboard = () => {
  const { orders, loading, statusOnOrder } = useAppSelector(
    (state) => state.orders
  )
  const dispatch = useAppDispatch()
  const [initialDate, setInitialDate] = useState<Date | null>(new Date())
  const [finalDate, setFinalDate] = useState<Date | null>(new Date())
  const [filteredOrders, setFilteredOrders] = useState(orders)

  useEffect(() => {
    dispatch(ordersActions.fetchOrders())
    dispatch(ordersActions.fetchStatusOnOrder())
  }, [dispatch])

  const summaryOrders =
    filteredOrders.length > 0 ? filteredOrders.length : orders.length

  const summaryAmount =
    filteredOrders.length > 0
      ? filteredOrders.reduce((amount, order) => amount + order.price_amount, 0)
      : orders.reduce((amount, order) => amount + order.price_amount, 0)

  const ordersByStatus = (statusId: string) => {
    const filteredOrdersByStatus = orders.filter((order) => {
      return statusId === order.orderStatus.id
    })

    setFilteredOrders(filteredOrdersByStatus)
  }

  const filterByDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (initialDate && finalDate) {
      const initFormatterd = format(initialDate!, "dd/MM/yyyy")
      const fimFormatterd = format(finalDate!, "dd/MM/yyyy")

      const filterdOrders = orders.filter((order) => {
        if (initFormatterd <= format(new Date(order.createdAt), "dd/MM/yyyy")) {
          if (
            fimFormatterd >= format(new Date(order.createdAt), "dd/MM/yyyy")
          ) {
            return order
          }
        }
      })

      setFilteredOrders(filterdOrders)
    }
  }

  const resetFilters = () => {
    setFilteredOrders(orders)
    setInitialDate(new Date())
    setFinalDate(new Date())
  }

  const renderOrders = filteredOrders.length > 0 ? filteredOrders : orders

  return (
    <>
      <Head>
        <title>Booze | Admin - Dashboard</title>
        <link rel="icon" href="/beerDay.png" />
      </Head>
      <div className="max-w-[1100px] m-auto flex flex-col items-start justify-between py-10 px-4 gap-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Bem vindo, Boozer admin
        </h1>

        <div className="w-full flex flex-col items-start md:items-end space-y-5 border border-gray-300 p-4 rounded-md">
          <p className=" w-full">
            Selecione a data e veja detalhes dos pedidos por periodo
          </p>
          <form className="flex flex-col md:flex-row items-center justify-start text-center gap-2 md:gap-5 w-full">
            <DatePicker
              selected={initialDate}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              onChange={(date) => setInitialDate(date)}
              className="text-black w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <p>até</p>
            <DatePicker
              selected={finalDate}
              dateFormat="dd/MM/yyyy"
              locale={ptBR}
              onChange={(date) => setFinalDate(date)}
              className="bg-white w-full border border-gray-300 rounded-md px-4 py-2"
            />

            <button
              onClick={(e) => filterByDate(e)}
              className="py-[8px] px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
                transition-all disabled:opacity-25 w-full max-w-[12rem]"
            >
              Filtrar
            </button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
            <span className="bg-[#006E71] bg-opacity-20 rounded-md p-4 w-full space-y-2 text-gray-800">
              <p className="text-md">Pedidos do periodo</p>
              <p className="text-3xl font-bold">{summaryOrders}</p>
            </span>
            <span className="bg-[#006E71] bg-opacity-20 rounded-md p-4 w-full space-y-2 text-gray-800">
              <p className="text-md">Total do periodo</p>
              <p className="text-3xl font-bold">
                {priceFormatter.format(summaryAmount / 100)}
              </p>
            </span>
          </div>

          <div className="space-y-5 w-full">
            <p>Selecione o status para filtrar</p>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4">
              {statusOnOrder.map((status) => {
                return (
                  <button
                    key={status.id}
                    onClick={(e) => ordersByStatus(status.id)}
                  >
                    <Tag title={status.title} />
                  </button>
                )
              })}
            </div>
          </div>

          <button
            onClick={(e) => resetFilters()}
            className="py-[10px] px-4 rounded-lg font-bold bg-gray-400 text-white hover:bg-gray-500 
                transition-all disabled:opacity-25 w-full max-w-[12rem]"
          >
            Limpar Filtros
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">Seus pedidos:</h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-2">
          {loading ? (
            <p className="md:col-span-3">Carregando...</p>
          ) : (
            renderOrders.map((order) => {
              return (
                <div
                  key={order.id}
                  className="border border-gray-300 rounded-md p-2
                    grid grid-cols-3 md:grid-cols-5 gap-4 items-center justify-center"
                >
                  <Tag title={order.orderStatus.title} />

                  <p className="text-md">
                    {format(parseISO(order.createdAt), "d 'de' LLLL", {
                      locale: ptBR,
                    })}
                  </p>

                  <p className="font-semibold text-lg">
                    {priceFormatter.format(order.price_amount / 100)}
                  </p>

                  <div className="w-full">
                    {order.ProductsOnOrder.map((prod, index) => {
                      return <ProductsOnOrder key={index} {...prod} />
                    })}
                  </div>

                  <div className="flex w-full justify-end items-center">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button
                          className="p-1 disabled:opacity-90 disabled:hover:cursor-not-allowed rounded-full
                              text-[#006E71] hover:opacity-90 transition-all border border-[#006E71]"
                        >
                          <Plus size={24} />
                        </button>
                      </Dialog.Trigger>
                      <OrderDetails {...order} />
                    </Dialog.Root>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Dashboard

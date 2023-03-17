import React, { forwardRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ptBR from "date-fns/locale/pt-BR"
import { useAppSelector } from "@/hooks/useReducer"
import { format } from "date-fns"
import { priceFormatter } from "@/utils/formatter"
import { parseISO, isAfter } from "date-fns"
import { IOrdersDetails } from "@/interfaces"
import Tag from "../designSystem/Tag"

const Summary = () => {
  const { orders } = useAppSelector((state) => state.orders)
  const [initialDate, setInitialDate] = useState<Date | null>()
  const [finalDate, setFinalDate] = useState<Date | null>()
  const [filteredOrders, setFilteredOrders] = useState(orders)

  const summaryOrders =
    filteredOrders.length > 0 ? filteredOrders.length : orders.length

  const summaryAmount =
    filteredOrders.length > 0
      ? filteredOrders.reduce((amount, order) => amount + order.price_amount, 0)
      : orders.reduce((amount, order) => amount + order.price_amount, 0)

  const filter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

  return (
    <div className="w-full space-y-5 border border-gray-300 p-4 rounded-md">
      <p>Selecione a data e veja detalhes dos pedidos por periodo</p>
      <form className="flex items-center justify-start text-center gap-5">
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
          onClick={(e) => filter(e)}
          className="py-[10px] px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
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
    </div>
  )
}

export default Summary

import React, { forwardRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ptBR from "date-fns/locale/pt-BR"

const Summary = () => {
  const [initialDate, setInitialDate] = useState<Date | null>()
  const [finalDate, setFinalDate] = useState<Date | null>()

  const filter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    console.log(initialDate)
    console.log(finalDate)
  }

  return (
    <div className="w-full space-y-5 border border-gray-300 p-4 rounded-md">
      <p>Selecione a data e veja detalhes dos pedidos por periodo</p>
      <form className="flex items-center justify-start text-center gap-5">
        <DatePicker
          selected={initialDate}
          dateFormat="Pp"
          locale={ptBR}
          onChange={(date) => setInitialDate(date)}
          className="text-black w-full border border-gray-300 rounded-md px-4 py-2"
        />
        <p>até</p>
        <DatePicker
          selected={finalDate}
          dateFormat="Pp"
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
    </div>
  )
}

export default Summary

import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "phosphor-react"
import { format, parseISO } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import Tag from "../designSystem/Tag"
import ProductsOnOrder from "../ProductsOnOrder"
import { priceFormatter } from "@/utils/formatter"

interface Order {
  id: string
  payment_mode: string
  price_amount: number
  userId: string
  createdAt: string
  code: number
  ProductsOnOrder: {
    productId: string
    orderId: string
    quantify: number
  }[]
  orderStatus: {
    id: string
    title: string
  }
  Adress: {
    bairro: string
    complemento?: string
    cep: string
    id: string
    numero: string
    rua: string
  }
}

const OrderDetails = (order: Order) => {
  console.log(order)
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black opacity-70" />
      <Dialog.Content
        className="bg-white rounded-md max-w-sm md:max-w-3xl w-full p-4"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl font-semibold">
            Detalhes do pedido - {order.code}
          </Dialog.Title>
          <Dialog.Close>
            <X size={32} />
          </Dialog.Close>
        </div>

        <div className="space-y-5">
          <div className="flex items-start justify-between mt-5">
            <strong className="text-xl block">
              {format(parseISO(order.createdAt), "d 'de' LLLL", {
                locale: ptBR,
              })}
            </strong>
            <Tag title={order.orderStatus.title} />
            Alterar Status do pedido
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="space-y-3">
              <div className="">
                <label className="block text-sm">Cliente</label>
                <strong className="block ">Pedro Soares</strong>
                <strong className="block ">(18) 99715-3884</strong>
              </div>

              <div className="">
                <label className="block text-sm">Entrega</label>
                {order.Adress ? (
                  <>
                    <strong className="block ">
                      {order.Adress?.rua}, {order.Adress?.numero}
                    </strong>
                    <strong className="block ">{order.Adress?.bairro}</strong>
                    <strong className="block ">
                      {order.Adress?.complemento
                        ? order.Adress?.complemento
                        : "--"}
                    </strong>
                  </>
                ) : (
                  <strong className="text-red-600">
                    Sem enderedo confirmado
                  </strong>
                )}
              </div>
            </div>

            <div className="space-y-14  w-full">
              <div>
                {order.ProductsOnOrder.map((prod, index) => {
                  return <ProductsOnOrder key={index} {...prod} />
                })}
              </div>

              <div className="flex items-center justify-between w-full">
                <p className="text-md">Valor total</p>
                <p className="text-2xl font-bold">
                  {" "}
                  {priceFormatter.format(order.price_amount / 100)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default OrderDetails

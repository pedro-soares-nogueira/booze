import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "phosphor-react"

const OrderDetails = () => {
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
            Detalhes do pedido - 25996
          </Dialog.Title>
          <Dialog.Close>
            <X size={32} />
          </Dialog.Close>
        </div>

        <div className="space-y-5">
          <div className="flex items-start justify-between mt-5">
            <strong className="text-xl block">3 de Março</strong>
            <span className="block px-4 py-1 bg-yellow-300 rounded-md">
              Entrega pendente
            </span>
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
                <strong className="block ">Rua Aviação, 1800</strong>
                <strong className="block ">Aviação</strong>
                <strong className="block ">Sem complemento</strong>
              </div>
            </div>

            <div className="space-y-14  w-full">
              <div>
                <p className="text-sm">Guaraná Paulistinha 2L</p>
                <p className="text-sm">Guaraná Paulistinha 2L</p>
                <p className="text-sm">Guaraná Paulistinha 2L</p>
                <p className="text-sm">Guaraná Paulistinha 2L</p>
              </div>

              <div className="flex items-center justify-between w-full">
                <p className="text-md">Valor total</p>
                <p className="text-2xl font-bold">R$ 43,90</p>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default OrderDetails

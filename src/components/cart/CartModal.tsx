import React, { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { Check, X, Warning } from "phosphor-react"
import ProductCard from "../product/ProductCard"
import { useCart } from "@/contexts/CartContext"
import * as RadioGroup from "@radix-ui/react-radio-group"
import Image from "next/image"
import emptyCart from "@/assets/empty-cart.png"
import AdressModel from "./AdressModel"
import * as z from "zod"
import { useOrder } from "@/contexts/OrderContext"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import deliveryBro from "@/assets/delivery-bro.svg"

const PaymentModeType = z.object({
  paymentMode: z.enum(["pix", "credito", "debito"]),
})

type PaymentModeInputs = z.infer<typeof PaymentModeType>

const CartModal = () => {
  const { orderAdrees, createNewOrder, previousUserAdreesId } = useOrder()
  const { deleteCart } = useCart()
  const [isAdreesModelOpen, setIsAdreesModelOpen] = useState(false)
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
  const wait = () => new Promise((resolve) => setTimeout(resolve, 5000))

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<PaymentModeInputs>({
    resolver: zodResolver(PaymentModeType),
  })

  const {
    cartProducts,
    totalOrderAmountPlusTax,
    totalOrderAmountFormatted,
    totalOrderAmountFormatterdPlusTax,
  } = useCart()

  const router = useRouter()

  const createOrder = (data: PaymentModeInputs) => {
    setIsOrderConfirmed(true)
    const products = cartProducts.map((prods) => {
      return {
        productsId: prods.productId,
        quantify: prods.quantify!,
      }
    })

    const newOrder = {
      adrees: orderAdrees!,
      paymentMode: data.paymentMode,
      products: products,
      priceAmount: totalOrderAmountPlusTax,
    }

    deleteCart()
    createNewOrder(newOrder)
    wait().then(() => setIsOrderConfirmed(false))
  }

  if (isOrderConfirmed) {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black opacity-70" />
        <Dialog.Content
          className="bg-white fixed inset-y-0 right-0 max-w-[420px] w-full 
                    flex flex-col items-start justify-between px-6 py-6 overflow-auto
                    scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-300 scrollbar-thumb-rounded-full"
        >
          <div className="w-full space-y-5">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-2xl font-semibold">
                Seu carrinho
              </Dialog.Title>
              <Dialog.Close asChild className="cursor-pointer">
                <X size={22} weight="bold" />
              </Dialog.Close>
            </div>

            <div className="flex flex-col h-[80vh] items-center justify-center gap-6">
              <Image alt="" src={deliveryBro} width="300" height="100" />

              <p className="text-center text-xl font-semibold text-green-500">
                Recebemos o pedido
              </p>
              <p className="text-center text-md font-normal">
                Nos próximos instantes você receberá notificações sobre as
                atualizaçãos do seu pedido
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    )
  }

  console.log(previousUserAdreesId)

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-black opacity-70" />
      <Dialog.Content
        className="bg-white fixed inset-y-0 right-0 max-w-[420px] w-full 
                    flex flex-col items-start justify-between px-6 py-6 overflow-auto
                    scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-neutral-300 scrollbar-thumb-rounded-full"
      >
        {cartProducts.length === 0 ? (
          <div className="space-y-10 w-full">
            <div className="flex items-center justify-between w-full">
              <Dialog.Title className="text-2xl font-semibold">
                Seu carrinho
              </Dialog.Title>
              <Dialog.Close asChild className="cursor-pointer">
                <X size={22} weight="bold" />
              </Dialog.Close>
            </div>

            <div className="flex flex-col items-center justify-center gap-5 pt-20">
              <Image src={emptyCart} width={200} height={200} alt="" />
              <p className="font-semibold text-2xl">Carrinho Vazio</p>
              <Dialog.Close asChild className="cursor-pointer">
                <small className="w-72 text-center leading-5">
                  No seu perfil você pode ver todos seus pedidos anteriores
                </small>
              </Dialog.Close>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-5">
            <div className="space-y-10 w-full">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-2xl font-semibold">
                  Seu carrinho
                </Dialog.Title>
                <Dialog.Close asChild className="cursor-pointer">
                  <X size={22} weight="bold" />
                </Dialog.Close>
              </div>

              <div className="space-y-8">
                {cartProducts?.map((product) => {
                  return (
                    <div key={product.productId}>
                      <ProductCard id={product.productId} {...product} />
                    </div>
                  )
                })}

                <div className="space-y-3">
                  <div>
                    <p className="pb-2">Forma de pagamento</p>
                    <Controller
                      name="paymentMode"
                      control={control}
                      render={({ field }) => {
                        return (
                          <RadioGroup.Root
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex items-start justify-center gap-2 "
                          >
                            <RadioGroup.Item
                              value={"pix"}
                              className="px-4 py-3 bg-purple-800 opacity-50 text-white rounded-md w-full aria-checked:opacity-90"
                            >
                              Pix
                            </RadioGroup.Item>

                            <RadioGroup.Item
                              value={"credito"}
                              className="px-4 py-3 bg-purple-800 opacity-50 text-white rounded-md w-full aria-checked:opacity-90"
                            >
                              Crédito
                            </RadioGroup.Item>

                            <RadioGroup.Item
                              value={"debito"}
                              className="px-4 py-3 bg-purple-800 opacity-50 text-white rounded-md w-full aria-checked:opacity-90"
                            >
                              Débito
                            </RadioGroup.Item>
                          </RadioGroup.Root>
                        )
                      }}
                    />
                    {errors.paymentMode ? (
                      <small className="text-red-400">
                        Forma de pagamento é obrigatória
                      </small>
                    ) : (
                      <small></small>
                    )}
                  </div>

                  <Dialog.Root
                    open={isAdreesModelOpen}
                    onOpenChange={setIsAdreesModelOpen}
                  >
                    <Dialog.Trigger asChild>
                      {/* {orderAdrees !== undefined ? (
                        <button
                          className="py-3 px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-700 
                                    transition-all disabled:opacity-25 w-full flex items-center justify-center gap-3"
                        >
                          Endereço confirmado
                          <Check size={22} />
                        </button>
                      ) : (
                        <button
                          className="py-3 px-4 rounded-lg font-bold bg-yellow-500 text-black hover:bg-yellow-700 
                                    transition-all disabled:opacity-25 w-full flex items-center justify-center gap-3"
                        >
                          Confirmar endereço
                          <Warning size={22} />
                        </button>
                      )} */}
                      <button
                        className="py-3 px-4 rounded-lg font-bold bg-gray-500 text-white hover:bg-gray-700 
                                    transition-all disabled:opacity-25 w-full flex items-center justify-center gap-3"
                      >
                        Entrega
                      </button>
                    </Dialog.Trigger>

                    <AdressModel setIsAdreesModelOpen={setIsAdreesModelOpen} />
                  </Dialog.Root>
                </div>
              </div>
            </div>

            <div className="w-full space-y-6">
              <div className="p-3 bg-neutral-300 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total dos produtos</span>
                  <span className="font-bold">{totalOrderAmountFormatted}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Taxa de entrega</span>
                  <span className="font-bold">R$ 3,00</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Total dos produtos</span>
                  <span className="font-bold text-green-600">
                    {totalOrderAmountFormatterdPlusTax}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5">
                <Dialog.Close asChild>
                  <button className="font-semibold px-5">Sair</button>
                </Dialog.Close>
                <button
                  onClick={handleSubmit(createOrder)}
                  className="py-3 px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
                            transition-all disabled:opacity-25 w-full"
                >
                  Confirmar pedido
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CartModal

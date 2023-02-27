import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Check, X, Warning } from 'phosphor-react'
import ProductCard from '../product/ProductCard'
import { useCart } from '@/contexts/CartContext'
import { priceFormatter } from '@/utils/formatter'
import * as RadioGroup from '@radix-ui/react-radio-group'
import Image from 'next/image'
import emptyCart from '@/assets/empty-cart.png'
import AdressModel from './AdressModel'
import * as z from 'zod'
import { useOrder } from '@/contexts/OrderContext'

const OrdersType = z.object({
  adrees: z.object({
    cep: z.number().min(3),
    rua: z.string().min(3),
    numero: z.string().min(3),
    bairro: z.string().min(3),
    complemento: z.string(),
  }),
  paymentMode: z.enum(['pix', 'credito', 'debito']),
  products: z
    .object({
      productsId: z.string(),
      quantify: z.number(),
    })
    .array(),
})

type OrdersInputs = z.infer<typeof OrdersType>

const CartModal = () => {
  const { adrees } = useOrder()
  const [isAdreesModelOpen, setIsAdreesModelOpen] = useState(false)

  const setAdreesModelClose = () => {}

  const {
    cartProducts,
    totalOrderAmountFormatted,
    totalOrderAmountFormatterdPlusTax,
  } = useCart()

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed w-screen h-screen inset-0 bg-black opacity-70' />
      <Dialog.Content
        className='bg-zinc-800 fixed inset-y-0 right-0 max-w-[420px] w-full 
                    flex flex-col items-start justify-between px-6 py-6'
      >
        {cartProducts.length === 0 ? (
          <div className='space-y-10 w-full'>
            <div className='flex items-center justify-between w-full'>
              <Dialog.Title className='text-2xl font-semibold'>
                Seu carrinho
              </Dialog.Title>
              <Dialog.Close asChild className='cursor-pointer'>
                <X size={22} weight='bold' />
              </Dialog.Close>
            </div>

            <div className='flex flex-col items-center justify-center gap-5 pt-20'>
              <Image src={emptyCart} width={200} height={200} alt='' />
              <p className='font-semibold text-2xl'>Carrinho Vazio</p>
              <Dialog.Close asChild className='cursor-pointer'>
                <small className='underline underline-offset-4'>
                  Volte e veja nossos produtos
                </small>
              </Dialog.Close>
            </div>
          </div>
        ) : (
          <>
            <div className='space-y-10 w-full'>
              <div className='flex items-center justify-between'>
                <Dialog.Title className='text-2xl font-semibold'>
                  Seu carrinho
                </Dialog.Title>
                <Dialog.Close asChild className='cursor-pointer'>
                  <X size={22} weight='bold' />
                </Dialog.Close>
              </div>

              <div className='space-y-8'>
                <div
                  className='space-y-3 h-[250px] overflow-auto pr-4 
                            scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-600 scrollbar-thumb-rounded-full'
                >
                  {cartProducts?.map((product) => {
                    return (
                      <div key={product.productId}>
                        <ProductCard id={product.productId} {...product} />
                      </div>
                    )
                  })}
                </div>

                <div className='space-y-3'>
                  <div>
                    <p className='pb-2'>Forma de pagamento</p>
                    <RadioGroup.Root className='flex items-start justify-center gap-2 '>
                      <RadioGroup.Item
                        value={'pix'}
                        className='px-4 py-3 bg-purple-800 opacity-30 rounded-md w-full aria-checked:opacity-90'
                      >
                        Pix
                      </RadioGroup.Item>

                      <RadioGroup.Item
                        value={'credito'}
                        className='px-4 py-3 bg-purple-800 opacity-30 rounded-md w-full aria-checked:opacity-90'
                      >
                        Crédito
                      </RadioGroup.Item>

                      <RadioGroup.Item
                        value={'debito'}
                        className='px-4 py-3 bg-purple-800 opacity-30 rounded-md w-full aria-checked:opacity-90'
                      >
                        Débito
                      </RadioGroup.Item>
                    </RadioGroup.Root>
                  </div>

                  <Dialog.Root
                    open={isAdreesModelOpen}
                    onOpenChange={setIsAdreesModelOpen}
                  >
                    <Dialog.Trigger asChild>
                      {adrees !== undefined ? (
                        <button
                          className='py-3 px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-700 
                                    transition-all disabled:opacity-25 w-full flex items-center justify-center gap-3'
                        >
                          Endereço confirmado 
                          <Check size={22} />
                        </button>
                      ) : (
                        <button
                          className='py-3 px-4 rounded-lg font-bold bg-yellow-500 text-black hover:bg-yellow-700 
                                    transition-all disabled:opacity-25 w-full flex items-center justify-center gap-3'
                        >
                          Confirmar endereço
                          <Warning size={22} />
                        </button>
                      )}
                    </Dialog.Trigger>

                    <AdressModel setIsAdreesModelOpen={setIsAdreesModelOpen} />
                  </Dialog.Root>
                </div>
              </div>
            </div>

            <div className='w-full space-y-6'>
              <div className='p-3 bg-neutral-700 rounded-md space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Total dos produtos</span>
                  <span className='font-bold'>{totalOrderAmountFormatted}</span>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Taxa de entrega</span>
                  <span className='font-bold'>R$ 3,00</span>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-sm'>Total dos produtos</span>
                  <span className='font-bold text-green-600'>
                    {totalOrderAmountFormatterdPlusTax}
                  </span>
                </div>
              </div>

              <div className='flex items-center justify-center gap-5'>
                <Dialog.Close asChild>
                  <button className='font-semibold px-5'>Sair</button>
                </Dialog.Close>
                <button
                  type='submit'
                  className='py-3 px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
                            transition-all disabled:opacity-25 w-full'
                >
                  Confirmar pedido
                </button>
              </div>
            </div>
          </>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CartModal

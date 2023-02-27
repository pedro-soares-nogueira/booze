import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import ProductCard from '../product/ProductCard'
import { useCart } from '@/contexts/CartContext'
import { priceFormatter } from '@/utils/formatter'
import * as RadioGroup from '@radix-ui/react-radio-group'
import Image from 'next/image'
import emptyCart from '@/assets/empty-cart.png'
import AdressModel from './AdressModel'

const CartModal = () => {
  const { cartProducts } = useCart()

  const totalOrderAmount = cartProducts.reduce(
    (totalAmount, prod) => totalAmount + prod.amount!,
    0
  )

  const totalOrderAmountFormatted = priceFormatter.format(
    totalOrderAmount / 100
  )

  const totalOrderAmountFormatterdPlusTax = priceFormatter.format(
    totalOrderAmount / 100 + 3
  )

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
              <div className='flex items-center justify-between w-full'>
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

                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button
                        className='py-3 px-4 rounded-lg font-bold bg-blue-800 text-white hover:bg-blue-700 
                              transition-all disabled:opacity-25 w-full'
                      >
                        Enderereço de entrega
                      </button>
                    </Dialog.Trigger>
                    <AdressModel/>
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

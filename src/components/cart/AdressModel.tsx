import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React from 'react'

const AdressModel = () => {
  return (
    <div>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed w-screen h-screen inset-0 bg-black opacity-70' />
        <Dialog.Content
          className='bg-zinc-800 fixed inset-y-14  min-[374px]:right-4 max-w-[360px] w-full rounded-lg
                    flex flex-col items-start justify-between px-6 py-6'
        >
          <div className='space-y-10 w-full'>
            <div className='flex items-center justify-between w-full'>
              <Dialog.Title className='text-2xl font-semibold'>
                Endereço
              </Dialog.Title>
              <Dialog.Close asChild className='cursor-pointer'>
                <X size={22} weight='bold' />
              </Dialog.Close>
            </div>

            <button
                  className='py-3 px-4 rounded-lg font-bold bg-green-700 text-white hover:bg-green-600 
                            transition-all disabled:opacity-25 w-full'
                >
                  Confirmar e continuar o pedido
                </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </div>
  )
}

export default AdressModel

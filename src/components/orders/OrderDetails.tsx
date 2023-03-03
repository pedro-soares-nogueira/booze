import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'

const OrderDetails = () => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed w-screen h-screen inset-0 bg-black opacity-70'/>
      <Dialog.Content className="bg-white rounded-md max-w-[500px] w-full p-4"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
        <div className='flex items-center justify-between'>
          <Dialog.Title>Detalhes do pedido</Dialog.Title>
          <Dialog.Close>
            <X size={32} />
          </Dialog.Close>
        </div>
        
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default OrderDetails

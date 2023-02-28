import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createContext, ReactNode, useContext, useState } from 'react'

interface Order {
  adrees: AdressType
  paymentMode: ['pix', 'credito', 'debito'] | string
  products: {
    productsId: string
    quantify: number
  }[]
  priceAmount: number
}

interface AdressType {
  cep: string
  rua: string
  numero: string
  bairro: string
  complemento: string
}

interface OrderContext {
  orders: Order[]
  orderAdrees: AdressType | undefined
  getOrderAdrees: (data: AdressType) => void
  createNewOrder: (data: Order) => void
}

interface OrderProviderProps {
  children: ReactNode
}

const OrderContext = createContext({} as OrderContext)

export function useOrder() {
  return useContext(OrderContext)
}

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useLocalStorage<Order[]>('@booze/orders.01', [])
  const [orderAdrees, setOrderAdrees] = useState<AdressType>()

  const getOrderAdrees = (data: AdressType) => {
    setOrderAdrees(data)
  }

  const createNewOrder = (data: Order) => {
    console.log(data)
  }

  return (
    <OrderContext.Provider
      value={{ orders, getOrderAdrees, createNewOrder, orderAdrees }}
    >
      {children}
    </OrderContext.Provider>
  )
}

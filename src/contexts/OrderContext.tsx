import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createContext, ReactNode, useContext, useState } from 'react'

interface Order {
  adrees: {
    cep: string
    rua: string
    numero: string
    bairro: string
    complemento: string
  }
  paymentMode: ['pix', 'credito', 'debito']
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
  getOrderAdrees: (data: AdressType) => void
  orderAdrees: AdressType | undefined
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

  return (
    <OrderContext.Provider value={{ orders, getOrderAdrees, orderAdrees }}>
      {children}
    </OrderContext.Provider>
  )
}

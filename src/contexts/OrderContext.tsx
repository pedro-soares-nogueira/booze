import { useLocalStorage } from "@/hooks/useLocalStorage"
import { api } from "@/lib/axios"
import { useSession } from "next-auth/react"
import { createContext, ReactNode, useContext, useState } from "react"

interface Order {
  adrees: AdressType
  paymentMode: ["pix", "credito", "debito"] | string
  products: {
    productsId: string
    quantify: number
  }[]
  priceAmount: number
}

interface AdressType {
  id?: string
  userId?: string
  cep: string
  rua: string
  numero: string
  bairro: string
  complemento: string
}

interface OrderContext {
  orders: Order[]
  orderAdrees: AdressType | undefined
  previousUserAdreesId: string
  getPreviousUserAddress: (data: string) => void
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
  const [orders, setOrders] = useLocalStorage<Order[]>("@booze/orders.01", [])
  const [previousUserAdreesId, setPreviousUserAdreesId] = useState<string>("")
  const [orderAdrees, setOrderAdrees] = useState<AdressType>()
  const { data: session } = useSession()

  const getPreviousUserAddress = (data: string) => {
    setPreviousUserAdreesId(data)
  }

  const getOrderAdrees = (data: AdressType) => {
    setOrderAdrees(data)
  }

  console.log(orderAdrees)

  const createNewOrder = async (data: Order) => {
    const userEmail = session?.user?.email

    try {
      await api.post("/order/create", {
        paymentMode: data.paymentMode,
        products: data.products.map((prod) => {
          return {
            productsId: prod.productsId,
            quantify: prod.quantify!,
          }
        }),
        priceAmount: data.priceAmount,
        user: userEmail,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderAdrees,
        previousUserAdreesId,
        getOrderAdrees,
        createNewOrder,
        getPreviousUserAddress,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

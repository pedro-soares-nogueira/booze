import { useLocalStorage } from "@/hooks/useLocalStorage"
import { api } from "@/lib/axios"
import { useSession } from "next-auth/react"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

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
  allPreviousAddress: AdressType[]
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
  const [allPreviousAddress, setAllPreviousAddress] = useState<AdressType[]>([])
  const [orderAdrees, setOrderAdrees] = useState<AdressType>()
  const { data: session } = useSession()

  const getOrderAdrees = (data: AdressType) => {
    // verificar com base no 'if (id){}'
    setOrderAdrees(data)
  }

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

  const fetchAddressByUser = async () => {
    const userEmail = session?.user?.email

    try {
      const userAddress = await api.get(`/address/getUserAddress/${userEmail}`)
      setAllPreviousAddress(userAddress.data.createdAddress)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAddressByUser()
  })

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderAdrees,
        allPreviousAddress,
        getOrderAdrees,
        createNewOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

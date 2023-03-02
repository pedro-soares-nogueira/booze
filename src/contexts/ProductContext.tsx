import { api } from '@/lib/axios'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface Product {
  id: string
  imageUrl: string
  createdat: string
  name: string
  price: string
  categoryId: string
}

interface ProductContext {
  products: Product[]
}

interface ProductProviderProps {
  children: ReactNode
}

const ProductContext = createContext({} as ProductContext)

export function useProduct() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const products = await api.get('/product')
      setProducts(products.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  )
}

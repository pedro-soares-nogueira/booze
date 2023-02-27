import Layout from '@/components/layout'
import { CartProvider } from '@/contexts/CartContext'
import { OrderProvider } from '@/contexts/OrderContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <OrderProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </OrderProvider>
    </CartProvider>
  )
}

import Layout from '@/components/layout'
import { CartProvider } from '@/contexts/CartContext'
import { OrderProvider } from '@/contexts/OrderContext'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <OrderProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </OrderProvider>
      </CartProvider>
    </SessionProvider>
  )
}

import Layout from "@/components/layout"
import { CartProvider } from "@/contexts/CartContext"
import { OrderProvider } from "@/contexts/OrderContext"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import "@/styles/globals.css"
import { Session } from "next-auth"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import { ProductProvider } from "@/contexts/ProductContext"
import { Provider } from "react-redux"
import { store } from "@/reducers/store"

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session }>) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <Provider store={store}>
              {getLayout(<Component {...pageProps} />)}
            </Provider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </SessionProvider>
  )
}

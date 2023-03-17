import React, { ReactNode } from "react"
import Image from "next/image"
import { House, ShoppingCartSimple, User } from "phosphor-react"
import { useCart } from "@/contexts/CartContext"
import beer from "@/assets/beerDay.png"
import * as Dialog from "@radix-ui/react-dialog"
import CartModal from "../cart/CartModal"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { googleImageLoader } from "@/utils/googleImageLoader"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

interface Layout {
  children: ReactNode
}

const Layout = ({ children }: Layout) => {
  const { totalQuantify } = useCart()
  const { data: session, status } = useSession()

  let userImage

  if (session) {
    userImage = session.user!.image
  } else {
    userImage = <User size={32} />
  }
  return (
    <div className="relative">
      <nav className="w-full border-b border-gray-300 sticky top-[-2px] bg-[#006E71]">
        <div className="max-w-[1100px] m-auto flex items-center justify-between py-2 px-4">
          <Image src={beer} width={40} height={40} alt="Logo" />

          <Link href={"/home"}>
            <span className="text-2xl font-bold text-[#F2CD4B] tracking-wide my-2 block">
              Booze
            </span>
          </Link>

          <ul className="flex items-center justify-center gap-3 md:gap-5">
            <li>
              <Link href={"/home"}>
                <House size={24} weight={"fill"} className="text-white" />
              </Link>
            </li>

            <li className="relative">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <div className="cursor-pointer">
                    <ShoppingCartSimple
                      size={24}
                      weight={"fill"}
                      className="text-white"
                    />
                    {totalQuantify ? (
                      <span
                        className="bg-red-600 text-white rounded-md w-5 h-5 absolute -top-2 text-xs -right-2
                                    font-semibold flex items-center justify-center"
                      >
                        {totalQuantify}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </Dialog.Trigger>
                <CartModal />
              </Dialog.Root>
            </li>

            <li className="flex items-center justify-center">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <User
                    size={24}
                    weight="fill"
                    className="cursor-pointer text-white"
                  />
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="border borer-gray-400 rounded-md p-4 mt-1 bg-white shadow-md">
                    <div className="flex flex-col gap-2">
                      <DropdownMenu.Item asChild>
                        <Link
                          href={"/user"}
                          className="block font-bold text-[#006E71] hover:opacity-90"
                        >
                          Meus pedidos
                        </Link>
                      </DropdownMenu.Item>

                      <DropdownMenu.Item>
                        {session?.user?.isAdmin && (
                          <Link
                            href={"/admin/dashboard"}
                            className="block font-bold text-[#006E71] hover:opacity-90"
                          >
                            Dashboard
                          </Link>
                        )}
                      </DropdownMenu.Item>

                      <DropdownMenu.Item>
                        {session?.user?.isAdmin && (
                          <Link
                            href={"/admin/products"}
                            className="block font-bold text-[#006E71] hover:opacity-90"
                          >
                            Produtos
                          </Link>
                        )}
                      </DropdownMenu.Item>

                      <DropdownMenu.Item>
                        <button
                          onClick={() => signOut()}
                          className="py-2 px-12 rounded-lg font-bold text-white bg-[#006E71] hover:opacity-90 
                        transition-all disabled:opacity-25 w-full"
                        >
                          Sair
                        </button>
                      </DropdownMenu.Item>
                    </div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </li>
          </ul>
        </div>
      </nav>
      <div className="max-w-[1100px] m-auto ">{children}</div>
    </div>
  )
}

export default Layout

import React, { ReactElement, useState } from "react"
import Head from "next/head"
import Layout from "@/components/layout"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import deliveryBro from "@/assets/delivery-man.svg"
import { ArrowRight } from "phosphor-react"

const inter = Inter({ subsets: ["latin"] })

const Landing = () => {
  return (
    <>
      <Head>
        <title>Booze - Bebidas Online</title>
        <link rel="icon" href="/booze.svg" />
      </Head>
      <div className="max-w-[1100px] m-auto flex flex-col items-center justify-center py-2 px-4 gap-10 md:gap-0 relative">
        <span
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      w-full h-full bg-red-50 -z-10 blur-3xl"
        ></span>
        <h1 className="text-7xl font-bold mt-10">Booze</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          <div className="flex flex-col items-center md:items-start justify-center gap-14">
            <p className="text-5xl leading-[3.5rem] text-center md:text-start lg:text-7xl font-bold md:leading-[4rem] lg:leading-[5.5rem]">
              Sua entrega o mais rápido possivel!!!
            </p>

            <Link
              href="/home"
              className="py-3 px-4 rounded-lg font-semibold bg-transparent border border-red-400 text-red-400 
                        transition-all disabled:opacity-25 flex items-center justify-center gap-3"
            >
              Entre e veja nossos produtos
              <ArrowRight size={24} />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt=""
              src={deliveryBro}
              width="500"
              height="100"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing

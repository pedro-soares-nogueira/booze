import React, { ReactElement, useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Landing = () => {
  return (
    <>
      <Head>
        <title>Booze - Bebidas Online</title>
        <link rel='icon' href='/minibar-black.png' />
      </Head>
      <div>Landing page</div>
    </>
  )
}

export default Landing

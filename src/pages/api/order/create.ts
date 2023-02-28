import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const createOrder = await prisma.order.create({
    data: {
      payment_mode: 'debito',
      price_amount: 1599,
      ProductsOnOrder: {
        create: [
          {
            quantify: 2,
            product: {
              connect: {
                id: 'a18bc28d-1aab-441f-9328-4271811cee98',
              },
            },
          },
          {
            quantify: 1,
            product: {
              connect: {
                id: '235285d9-ba54-42ca-b5b8-560f34641eef',
              },
            },
          },
        ],
      },
      user: {
        connect: {
          id: '562e6862-4180-4814-a0a1-a583e7543183',
        },
      },
    },
  })

  return res.status(201).json(createOrder)
}

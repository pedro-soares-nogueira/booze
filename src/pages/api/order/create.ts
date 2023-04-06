import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

interface ProductsOnOrderType {
  quantify: number
  productsId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { paymentMode, products, priceAmount, user } = req.body

  const userId = await prisma.user.findFirst({
    where: { email: user },
  })

  const createOrder = await prisma.order.create({
    data: {
      payment_mode: paymentMode,
      price_amount: priceAmount,
      code: Math.floor(Math.random() * 10000) + 1,
      orderStatus: {
        connect: {
          id: "3d24157b-cc0e-4b86-bf9f-48eff2fbf409",
        },
      },
      user: {
        connect: {
          id: userId?.id,
        },
      },
    },
  })

  const product = products.forEach(async (prod: ProductsOnOrderType) => {
    return await prisma.productsOnOrder.create({
      data: {
        quantify: prod.quantify,
        product: {
          connect: {
            id: prod.productsId,
          },
        },
        order: {
          connect: {
            id: createOrder.id,
          },
        },
      },
    })
  })

  return res.status(201).json({ createOrder })
}

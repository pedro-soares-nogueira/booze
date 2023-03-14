import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const ordersArray = await prisma.order.findMany({
    include: {
      ProductsOnOrder: true,
      Adress: true,
      orderStatus: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  const orders = JSON.parse(JSON.stringify(ordersArray))

  return res.status(201).json({ orders })
}

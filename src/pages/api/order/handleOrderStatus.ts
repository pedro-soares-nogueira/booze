import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end()
  }

  const { orderId, status } = req.body

  const newOrder = await prisma.order.update({
    include: {
      ProductsOnOrder: true,
      Adress: true,
      orderStatus: true,
    },
    where: {
      id: orderId,
    },
    data: { orderStatusId: status },
  })

  return res.status(201).json({ newOrder })
}

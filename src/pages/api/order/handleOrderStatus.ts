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

  const newStatus = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: { orderStatusId: status },
  })

  return res.status(201).json({ newStatus })
}

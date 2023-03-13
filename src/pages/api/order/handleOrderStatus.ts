import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end()
  }

  const { status, orderId } = req.body

  /*   const status = "dc5b8719-d01c-46df-8b48-1e974c660470"
  const orderId = "6809f588-18b8-417e-86f5-65b9c76b36d5" */

  const newStatus = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: { orderStatusId: status },
  })

  return res.status(201).json({ newStatus })
}

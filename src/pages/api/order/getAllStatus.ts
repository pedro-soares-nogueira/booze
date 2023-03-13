import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const ordersStatus = await prisma.orderStatus.findMany({
    where: {},
  })

  return res.status(201).json({ ordersStatus })
}

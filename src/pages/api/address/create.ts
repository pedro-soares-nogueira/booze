import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const {} = req.body

  const createdAddress = await prisma.order.create({
    data: {},
  })

  return res.status(201).json({ createdAddress })
}

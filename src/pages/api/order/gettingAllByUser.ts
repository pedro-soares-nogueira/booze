import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user!.email,
    },
  })

  const ordersArray = await prisma.order.findMany({
    where: {
      userId: user!.id,
    },
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

import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end()
  }

  const { userEmail } = req.query

  let createdAddress

  if (userEmail) {
    const userId = await prisma.user.findFirst({
      where: { email: userEmail },
    })

    createdAddress = await prisma.adress.findMany({
      where: { User: userId },
    })
  } else {
    throw new Error("User not found")
  }

  return res.status(201).json({ createdAddress })
}

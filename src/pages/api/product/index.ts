import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  //const { categoryId } = req.body

  const products = await prisma.product.findMany({
    where: {},
  })

  return res.status(201).json(products)
}

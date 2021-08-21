import { PrismaClient, Prisma, Server } from '@prisma/client'
import { errorHandler } from './errors'

const prisma = new PrismaClient()

export async function getAllServers() {
  try {
    return await prisma.server.findMany()
  } catch (err) {
    console.log('Failed to get all products:', err)
    return null
  }
}

export async function findUnique(where: object) {
  try {
    return await prisma.server.findUnique({
      where: where,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function findServerById(id: number) {
  return findUnique({ id })
}

export async function findServerByAddress(address: string) {
  return findUnique({ address })
}

export async function createServer(data: {
  address: string
  name: string
  desc: string
  productId: number
}) {
  try {
    return await prisma.server.create({
      data: data,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function updateServerById(id: number, data: object) {
  try {
    return await prisma.server.update({
      where: {
        id: id,
      },
      data,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export default Server

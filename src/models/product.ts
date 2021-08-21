import { PrismaClient, Prisma, Product } from '@prisma/client'
import { errorHandler } from './errors'

const prisma = new PrismaClient()

export async function getAllProducts() {
  try {
    return await prisma.product.findMany()
  } catch (err) {
    console.log('Failed to get all products:', err)
    return null
  }
}

export async function findUnique(where: object) {
  try {
    return await prisma.product.findUnique({
      where: where,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function findProdctByName(name: string) {
  return findUnique({ name })
}

export async function createProduct(name: string) {
  try {
    return await prisma.product.create({
      data: {
        name: name,
      },
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function updateProductById(id: number, data: object) {
  try {
    return await prisma.product.update({
      where: {
        id: id,
      },
      data,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function getServers(product: Product) {
  try {
    return await prisma.product.findUnique({
      where: {
        id: product.id,
      },
      include: {
        servers: true,
      },
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export default Product

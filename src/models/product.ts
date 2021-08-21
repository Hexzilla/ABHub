import { PrismaClient, Prisma, Product } from '@prisma/client'

const prisma = new PrismaClient()

const errorHandler = (e: any) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code == 'P2025') {
      return new Error('record_not_found')
    } else if (e.code == 'P2002') {
      return new Error('unique_error')
    }
  }
  console.error(e.meta)
  return new Error('unknown')
}

export async function getAllProducts() {
  try {
    return await prisma.product.findMany()
  } catch (err) {
    console.log('Failed to get all products:', err)
    return null
  }
}

export async function findProdct(where: object) {
  try {
    return await prisma.product.findUnique({
      where: where,
    })
  } catch (e) {
    return errorHandler(e)
  }
}

export async function findProdctByName(name: string) {
  return findProdct({ name })
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

export default Product

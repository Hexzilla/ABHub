import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()

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
  } catch (err) {
    console.log('Failed to find product:', where, err)
    return null
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
  } catch (err) {
    console.log('Failed to create a product:', err)
    return null
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
  } catch (err) {
    console.log('Failed to update product:', id, name, err)
    return null
  }
}

export default Product

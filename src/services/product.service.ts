import { Request, Response } from 'express'
import * as _products from 'models/product'

export async function getProducts() {
  const items = await _products.getAllProducts()
  if (!items || items instanceof Error) {
    return {
      success: false,
      message: items?.message,
    }
  }

  const servers = await _products.getServerCounts()
  if (!servers || servers instanceof Error) {
    return {
      success: false,
      message: servers?.message,
    }
  }
  console.log('servers', servers)

  const products = items.map((it) => ({
    ...it,
    servers: servers.find((s) => s.productId === it.id)?._count || 0,
  }))

  return {
    success: true,
    data: {
      products,
    },
  }
}

export async function createProduct(name: string, code: string) {
  console.log('createProduct', name, code)
  const product = await _products.createProduct(name, code)
  console.log('createProduct-2', product)
  if (!product || product instanceof Error) {
    return {
      success: false,
      message: product?.message,
    }
  }

  console.log('createProduct-3', product)
  return {
    success: true,
    data: {
      product: product,
    },
  }
}

export async function updateProduct(data: {
  id: number
  name: string
  code: string
}) {
  const updated = await _products.updateProductById(data.id, {
    name: data.name,
    code: data.code,
  })
  if (!updated || updated instanceof Error) {
    return {
      success: false,
      message: updated?.message,
    }
  }

  return {
    success: true,
    data: {
      updatedId: data.id,
    },
  }
}

export async function deleteProduct(id: number) {
  if (!id) {
    return {
      success: false,
      message: 'invalid_record',
    }
  }

  const deleted = await _products.deleteProductById(Number(id))
  if (!deleted || deleted instanceof Error) {
    return {
      success: false,
      message: deleted?.message,
    }
  }

  return {
    success: true,
    data: {
      deletedId: id,
    },
  }
}

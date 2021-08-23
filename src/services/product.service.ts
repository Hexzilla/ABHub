import { Request, Response } from 'express'
import { errorMessage, resultData } from 'helpers'
import * as _products from 'models/product'

export async function getProducts() {
  const items = await _products.getAllProducts()
  if (!items || items instanceof Error) {
    return errorMessage(items?.message)
  }

  const servers = await _products.getServerCounts()
  if (!servers || servers instanceof Error) {
    return errorMessage(servers?.message)
  }

  const products = items.map((it) => ({
    ...it,
    servers: servers.find((s) => s.productId === it.id)?._count || 0,
  }))

  return resultData({
    products,
  })
}

export async function createProduct(name: string, code: string) {
  const product = await _products.createProduct(name, code)
  if (!product || product instanceof Error) {
    return errorMessage(product?.message)
  }

  return resultData({
    product,
  })
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
    return errorMessage(updated?.message)
  }

  return resultData({
    updatedId: data.id,
  })
}

export async function deleteProduct(id: number) {
  if (!id) {
    return errorMessage('invalid_record')
  }

  const deleted = await _products.deleteProductById(Number(id))
  if (!deleted || deleted instanceof Error) {
    return errorMessage(deleted?.message)
  }

  return resultData({
    deletedId: id,
  })
}

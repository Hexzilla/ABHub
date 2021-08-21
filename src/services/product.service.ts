import { Request, Response } from 'express'
import Product, {
  getAllProducts,
  findUnique,
  findProdctByName,
  createProduct,
  updateProductById,
} from 'models/product'

export async function getProducts(req: Request, res: Response) {
  const products = await getAllProducts()
  return res.json({
    products: products,
  })
}

export async function storeProduct(req: Request, res: Response) {
  const product = await createProduct(req.body.name)
  if (!product || product instanceof Error) {
    return res.status(500).json({
      success: false,
      message: product?.message,
    })
  }

  return res.json({
    success: true,
    product: product,
  })
}

export async function updateProduct(req: Request, res: Response) {
  const updated = await updateProductById(req.body.id, {
    name: req.body.name,
  })
  if (!updated || updated instanceof Error) {
    return res.status(500).json({
      success: false,
      message: updated?.message,
    })
  }

  return res.json({
    success: true,
  })
}

import { Request, Response } from 'express'
import Product, {
  getAllProducts,
  findProdctByName,
  createProduct,
  updateProductById,
  deleteProductById,
} from 'models/product'

export async function getProducts(req: Request, res: Response) {
  const products = await getAllProducts()
  return res.json({
    products: products,
  })
}

export async function storeProduct(req: Request, res: Response) {
  const product = await createProduct(req.body.name, req.body.code)
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
  const productId = Number(req.body.id)
  const updated = await updateProductById(productId, {
    name: req.body.name,
    code: req.body.code,
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

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params

  const deleted = await deleteProductById(Number(id))
  if (!deleted || deleted instanceof Error) {
    return res.status(500).json({
      success: false,
      message: deleted?.message,
    })
  }

  return res.json({
    success: true,
  })
}

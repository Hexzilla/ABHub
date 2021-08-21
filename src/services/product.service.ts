import { Request, Response } from 'express'
import {
  getAllProducts,
  findProdct,
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
  let product = await findProdctByName(req.body.name)
  if (product) {
    return res.status(422).json({
      success: false,
      message: 'The name is already exists',
    })
  }

  product = await createProduct(req.body.name)
  if (!product) {
    return res.status(500).json({
      success: false,
    })
  }

  return res.json({
    success: true,
    product: product,
  })
}

export async function updateProduct(req: Request, res: Response) {
  const product = await updateProductById(req.body.id, {
    name: req.body.name,
  })
  if (!product) {
    return res.status(500).json({
      success: false,
    })
  }

  return res.json({
    success: true,
  })
}

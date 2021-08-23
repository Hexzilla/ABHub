import { Request, Response } from 'express'
import Product, {
  getAllProducts,
  findProdctByName,
  createProduct,
  updateProductById,
  deleteProductById,
  getServerCounts,
} from 'models/product'

export async function getProducts(req: Request, res: Response) {
  const items = await getAllProducts()
  if (!items || items instanceof Error) {
    return res.status(500).json({
      success: false,
      message: items?.message,
    })
  }

  const servers = await getServerCounts()
  if (!servers || servers instanceof Error) {
    return res.status(500).json({
      success: false,
      message: servers?.message,
    })
  }
  console.log('servers', servers)

  const products = items.map((it) => ({
    ...it,
    servers: servers.find((s) => s.productId === it.id)?._count || 0,
  }))

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
  const { id } = req.params
  const updated = await updateProductById(Number(id), {
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
  if (!id) {
    return res.status(422).json({
      success: false,
      message: 'invalid_record',
    })
  }

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

import { Request, Response } from 'express'
import Server, {
  getAllServers,
  findUnique,
  createServer,
  updateServerById,
  deleteServerById,
} from 'models/servers'

export async function getServers(req: Request, res: Response) {
  const products = await getAllServers()
  return res.json({
    products: products,
  })
}

export async function storeServer(req: Request, res: Response) {
  const server = await createServer({
    address: String(req.body.address),
    name: String(req.body.name),
    desc: String(req.body.desc),
    productId: Number(req.body.productId),
  })
  if (!server || server instanceof Error) {
    return res.status(500).json({
      success: false,
      message: server?.message,
    })
  }

  return res.json({
    success: true,
    server: server,
  })
}

export async function updateServer(req: Request, res: Response) {
  const serverId = Number(req.body.id)
  const updated = await updateServerById(serverId, {
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

export async function deleteServer(req: Request, res: Response) {
  const { id } = req.params

  const deleted = await deleteServerById(Number(id))
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

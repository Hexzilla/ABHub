import { Request, Response } from 'express'
import { errorMessage, resultData } from 'helpers'
import * as _servers from 'models/servers'

export async function getServers(productId: number) {
  const servers = await _servers.getAllServers(productId)
  return {
    success: true,
    data: {
      servers,
    },
  }
}

export async function createServer(
  productId: number,
  address: string,
  name: string,
  desc: string
) {
  const server = await _servers.createServer({
    address,
    name,
    desc,
    productId,
  })
  if (!server || server instanceof Error) {
    return errorMessage(server?.message)
  }

  return resultData({
    server,
  })
}

export async function updateServer(
  serverId: number,
  address: string,
  name: string,
  desc: string,
  state: number
) {
  const updated = await _servers.updateServerById(serverId, {
    address,
    name,
    desc,
    state,
  })
  if (!updated || updated instanceof Error) {
    return errorMessage(updated?.message)
  }

  return resultData({
    updatedId: serverId,
  })
}

export async function deleteServer(serverId: number) {
  if (!serverId) {
    return errorMessage('invalid_record')
  }

  const deleted = await _servers.deleteServerById(serverId)
  if (!deleted || deleted instanceof Error) {
    return errorMessage(deleted?.message)
  }

  return resultData({
    deletedId: serverId,
  })
}

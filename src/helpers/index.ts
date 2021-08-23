import { Response } from 'express'

export function sendJsonResponse(res: Response, paylod: any) {
  if (!paylod.success) {
    return res.status(500).json(paylod)
  }
  return res.json(paylod)
}

export function errorMessage(message: any) {
  return {
    success: false,
    message: message,
  }
}

export function resultData(data: any) {
  return {
    success: true,
    data: data,
  }
}

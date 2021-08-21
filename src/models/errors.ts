import { Prisma } from '@prisma/client'

export function errorHandler(e: any) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code == 'P2025') {
      return new Error('record_not_found')
    } else if (e.code == 'P2002') {
      return new Error('unique_error')
    }
  }
  console.error(e.meta)
  return new Error('unknown')
}

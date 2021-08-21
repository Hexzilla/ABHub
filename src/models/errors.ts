import { Prisma } from '@prisma/client'

export function errorHandler(e: any) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(e.code, e.meta)
    if (e.code == 'P2025') {
      return new Error('record_not_found')
    } else if (e.code == 'P2002') {
      return new Error('unique_error')
    }
  } else {
    console.error(e)
    return new Error('unknown')
  }
}

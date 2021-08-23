import { PrismaClient, User } from '@prisma/client'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from 'config'

const prisma = new PrismaClient()

export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createUser(data: {
  name: string
  email: string
  password: string
}) {
  try {
    const encrypted = encryptPassword(data.password)
    return await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        salt: encrypted.salt,
        hash: encrypted.hash,
      },
    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export function verifyPassword(user: User, password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 10000, 64, 'sha256')
    .toString('hex')
  return user.hash === hash
}

export function encryptPassword(password: string): {
  salt: string
  hash: string
} {
  const salt = crypto.randomBytes(16).toString('hex')
  return {
    salt,
    hash: crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha256')
      .toString('hex'),
  }
}

export function generateJWT(user: User): string {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      exp: parseInt((exp.getTime() / 1000).toString()),
    },
    config.secret
  )
}

export default User

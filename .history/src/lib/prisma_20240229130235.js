import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknow as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
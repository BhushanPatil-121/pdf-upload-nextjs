import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknow as {
  prisma: PrismaClient | undefined
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
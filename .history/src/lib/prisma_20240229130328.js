import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClient()


if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
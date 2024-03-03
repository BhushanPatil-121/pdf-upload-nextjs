import { PrismaClient } from '@prisma/client'



const prisma = globalForPrisma.prisma ?? prismaClient()


if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
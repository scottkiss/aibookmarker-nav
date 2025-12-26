// lib/prisma.ts

import { PrismaClient } from '@prisma/client';


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionUrl = process.env.POSTGRES_PRISMA_URL;
const finalUrl = connectionUrl && !connectionUrl.includes('pgbouncer=true')
  ? `${connectionUrl}${connectionUrl.includes('?') ? '&' : '?'}pgbouncer=true`
  : connectionUrl;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: finalUrl ? {
    db: {
      url: finalUrl
    }
  } : undefined,
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
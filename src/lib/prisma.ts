// lib/prisma.ts

import { PrismaClient } from '@prisma/client';


declare global {
  var prisma: PrismaClient
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, create a single instance of PrismaClient
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to ensure a single instance across hot reloads
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

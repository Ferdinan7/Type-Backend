import { PrismaClient } from "@prisma/client";

declare global {
  // Esto le dice a TypeScript que global.prisma puede existir
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;

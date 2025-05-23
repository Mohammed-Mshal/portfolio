'use server'
import { PrismaClient } from "@prisma/client";
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default async function getHeroData() {
    try {

        const heroSection = await prisma.heroSection.findFirst({
            where: {},
        })

        return {
            data: {
                hero: heroSection
            },
            message: ''
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        return {
            data: null,
            message: error.message as string
        }
    }
}
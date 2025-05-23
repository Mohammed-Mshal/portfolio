'use server'
import { PrismaClient, SocialMedia } from "@prisma/client"
interface ResponseType {
    status: number;
    statusText: string;
    message?: string;
    data?: {
        socialMedia: SocialMedia[];
    };
}
const prisma = new PrismaClient()

export default async function GetSocialMedia(): Promise<ResponseType> {
    try {
        const listSocial = await prisma.socialMedia.findMany({
            where: {},
        })
        return {
            status: 200,
            statusText: 'SUCCESS',
            data: {
                socialMedia: listSocial
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            statusText: 'FAIL',
            message: error instanceof Error ? error.message : 'An unexpected error occurred'
        }
    } finally {
        await prisma.$disconnect()
    }
}
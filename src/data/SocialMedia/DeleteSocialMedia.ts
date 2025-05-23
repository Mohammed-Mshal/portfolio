'use server'
import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client";
import ImageKit from "imagekit";
import { revalidatePath } from "next/cache";

interface ResponseType {
    status: number | null;
    statusText: string;
    message: string;
}
const prisma = new PrismaClient()
const imgKIT = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DeleteSocialMedia(prevState: any, formData: FormData): Promise<ResponseType> {
    try {
        const session = await verifySession()
        if (!session || !session.userID) {
            return {
                message: 'Unauthorize',
                status: 400,
                statusText: 'ERROR'
            }
        }
        if (typeof session.userID !== 'string') {
            return {
                message: 'Admin Id Is Not Valid',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const socialId = formData.get('socialId') as string
        if (!socialId) {
            return {
                message: 'Id Social Item Is Required',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const socialMediaItem = await prisma.socialMedia.findUnique({
            where: {
                id: socialId,
                adminId: session.userID,
            }
        })
        if (!socialMediaItem) {
            return {
                message: 'Social Item Is Not Found',
                status: 400,
                statusText: 'ERROR'
            }
        }
        await imgKIT.deleteFile(socialMediaItem?.iconId as string)
        await prisma.socialMedia.delete({
            where: {
                id: socialId,
                adminId: session.userID,
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Delete Social Item Is Complete',
        }

    } catch (error) {
        console.log(error);
        return {
            status: 500,
            statusText: 'FAIL',
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        }
    } finally {
        await prisma.$disconnect()
    }
}
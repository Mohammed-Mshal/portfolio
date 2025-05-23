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
export default async function EditProjectLink(prevState: any, formData: FormData): Promise<ResponseType> {
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
        const linkId = formData.get('itemId') as string
        if (!linkId || linkId.length === 0) {
            return {
                message: 'Id Project Is Required',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const linkInfo = await prisma.projectLink.findUnique({
            where: {
                id: linkId,
            }
        })
        if (!linkInfo) {
            return {
                message: 'Project Is Not Found',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const nameLink = formData.get('nameLink') as string
        const imageLink = formData.get('imageLink') as File || null
        const link = formData.get('link') as string
        let urlFile;
        if (imageLink.size > 0) {
            await imgKIT.deleteFile(linkInfo?.iconId)
            const arrayBuffer = await imageLink.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            urlFile = await imgKIT.upload({
                file: buffer,
                fileName: `${Date.now()}-${linkInfo.title}`,
                folder: 'portfolio/projects/imageLinks',
            })

        }
        if (urlFile) {
            await prisma.projectLink.update({
                where: {
                    id: linkInfo.id
                },
                data: {
                    title: nameLink,
                    icon: urlFile?.url,
                    iconId: urlFile?.fileId,
                    link: link
                }
            })
        }
        else {
            await prisma.projectLink.update({
                where: {
                    id: linkInfo.id
                },
                data: {
                    title: nameLink,
                    link: link
                }
            })
        }
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Delete Link Is Complete',
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Database connection error:', error);

        if (error.code === 'P2021' || error.message.includes('No available servers')) {
            return {
                message: 'connection error. Please try again later.',
                status: 503,
                statusText: 'FAIL',
            };
        }

        return {
            message: 'An unexpected error occurred. Please try again later.',
            status: 500,
            statusText: 'FAIL',
        };
    }
    finally {
        await prisma.$disconnect()
    }
}
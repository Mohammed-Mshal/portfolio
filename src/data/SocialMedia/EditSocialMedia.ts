'use server'
import { verifySession } from "@/libs/session";
import { PrismaClient, Social } from "@prisma/client";
import ImageKit from "imagekit";
import { revalidatePath } from "next/cache";

interface ResponseType {
    status: number | null;
    statusText: string;
    message: string;
}

const imgKIT = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditSocialMedia(prevState: any, formData: FormData): Promise<ResponseType> {
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
        const admin = await prisma.admin.findUnique({
            where: {
                id: session.userID as string
            },
            include: {
                SocialMedia: true
            }
        })
        if (!admin) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Admin Is Not Exist'
            }
        }
        const socialId = formData.get('socialId') as string
        const social = await prisma.socialMedia.findUnique({
            where: {
                id: socialId,
                adminId: session.userID as string,
            },
        })
        if (!social) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Social Is Exist'
            }
        }
        const link = formData.get('link') as string
        const typeSocial = formData.get('typeSocial') as Social
        const icon = formData.get('icon') as File
        let urlFile;
        if (icon.size > 0) {
            await imgKIT.deleteFile(social.iconId)
            const arrayBuffer = await icon.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            urlFile = await imgKIT.upload({
                file: buffer,
                fileName: `${Date.now()}-${icon.name}`,
                folder: 'socialmedia'
            })

        }
        if (urlFile) {
            await prisma.socialMedia.update({
                where: {
                    id: socialId
                },
                data: {
                    adminId: admin.id,
                    icon: urlFile?.url,
                    iconId: urlFile?.fileId,
                    link: link
                }
            })
        }
        else {
            await prisma.socialMedia.update({
                where: {
                    id: socialId
                },
                data: {
                    type: typeSocial,
                    adminId: admin.id,
                    link: link
                }
            })
        }
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Update Social Item Is Complete',
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
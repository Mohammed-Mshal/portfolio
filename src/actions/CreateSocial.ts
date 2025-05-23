'use server'
import { verifySession } from "@/libs/session";
import { PrismaClient, Social } from "@prisma/client";
import ImageKit from "imagekit";
import { revalidatePath } from "next/cache";

const imgKIT = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

/* eslint-disable @typescript-eslint/no-explicit-any */
const prisma = new PrismaClient()
export default async function CreateSocial(prevState: any, formData: FormData) {
    try {
        const session = await verifySession()
        if (!session || !session.userID) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Admin Is Unauthorized'
            }
        }
        const admin = await prisma.admin.findUnique({
            where: {
                id: session.userID as string
            },
            include: {
                Description: true
            }
        })
        if (!admin) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Admin Is Exist'
            }
        }
        const link = formData.get('link') as string
        const typeSocial = formData.get('typeSocial') as Social
        const icon = formData.get('icon') as File
        if (!link || link.trim() === '' || !icon || !typeSocial) {
            return {
                statusText: 'Bad Request',
                status: 400,
                message: 'Some Fields Is Missing'
            };
        }
        const arrayBuffer = await icon.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const urlFile = await imgKIT.upload({
            file: buffer,
            fileName: `${Date.now()}-${icon.name}`,
            folder: 'portfolio/social-media'
        })
        await prisma.socialMedia.create({
            data: {
                type: typeSocial,
                adminId: admin.id,
                icon: urlFile.url,
                iconId: urlFile.fileId,
                link: link
            }
        })
        revalidatePath('/');
        return {
            statusText: 'SUCCESS',
            status: 200,
            message: 'Description Added Successfully'
        }

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
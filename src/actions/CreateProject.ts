/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import ImageKit from "imagekit"
import { verifySession } from "@/libs/session"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
const imageKit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    privateKey: process.env.PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});
export default async function CreateProject(prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string
        const thumbnailProject = formData.get('image') as File || null
        const description = formData.get('description') as string
        const session = await verifySession()
        const userID = session?.userID as string
        if (!userID) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Admin Is Unauthorized'
            }
        }
        const admin = await prisma.admin.findUnique({
            where: {
                id: userID
            },
            include: {
                Projects: true
            }
        })
        if (!admin) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Admin Is Not Exist'
            }
        }
        let imageSrc: string | null = null
        let imageId: string | null = null
        if (!thumbnailProject || thumbnailProject?.size <= 0) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Thumbnail Is Required'
            }
        }
        if (thumbnailProject?.size > 1024 * 1024 * 5) {
            return {
                statusText: 'ERROR',
                status: 413,
                message: 'Thumbnail Size Should Be less than 4MB'
            }

        }
        const arrayBufferImage = await thumbnailProject.arrayBuffer()
        const bufferImage = Buffer.from(arrayBufferImage)
        const imageUploaded = await imageKit.upload({
            file: bufferImage,
            fileName: thumbnailProject.name,
            folder: 'portfolio/projects'

        })
        imageSrc = imageUploaded.url;
        imageId = imageUploaded.fileId;
        await prisma.projects.create({
            data: {
                adminId: admin.id,
                title: title,
                imageId,
                description,
                image: imageSrc,
            }
        })
        revalidatePath('/')
        return {
            statusText: 'SUCCESSFUL',
            status: 200,
            message: 'Project Updated Successfully'
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
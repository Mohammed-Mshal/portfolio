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
export default async function CreateLinkProject(prevState: any, formData: FormData) {
    try {
        const nameLink = formData.get('nameLink') as string
        const imageLink = formData.get('imageLink') as File || null
        const link = formData.get('link') as string
        const projectId = formData.get('projectId') as string
        const session = await verifySession()
        const userID = session?.userID as string
        if (!nameLink || !link || !projectId) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Missing Fields'
            }
        }
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
        })
        if (!admin) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Admin Is Not Exist'
            }
        }

        const projectInfo = await prisma.projects.findUnique({
            where: {
                id: projectId
            }
        })
        if (!projectInfo) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Project Is Not Exist'
            }
        }

        let imageSrc: string | null = null
        let imageId: string | null = null
        if (!imageLink || imageLink?.size <= 0) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Image Link Is Required'
            }
        }
        if (imageLink?.size > 1024 * 1024 * 5) {
            return {
                statusText: 'ERROR',
                status: 413,
                message: 'Image Link Size Should Be less than 4MB'
            }

        }
        const arrayBufferImage = await imageLink.arrayBuffer()
        const bufferImage = Buffer.from(arrayBufferImage)
        const imageUploaded = await imageKit.upload({
            file: bufferImage,
            fileName: imageLink.name,
            folder: 'portfolio/projects/imageLinks'

        })
        imageSrc = imageUploaded.url;
        imageId = imageUploaded.fileId;
        await prisma.projectLink.create({
            data: {
                projectsId: projectId,
                title: nameLink,
                iconId: imageId,
                icon: imageSrc,
                link,
            }
        })
        revalidatePath('/')
        return {
            statusText: 'SUCCESSFUL',
            status: 200,
            message: 'Link Created Successfully'
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
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
export default async function EditProject(prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string
        const thumbnailProject = formData.get('image') as File || null
        const description = formData.get('description') as string
        const projectId = formData.get('itemId') as string
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
        const projectInfo = await prisma.projects.findUnique({
            where: {
                id: projectId,
                adminId: userID
            }
        })
        if (!projectInfo) {
            return {
                statusText: 'ERROR',
                status: 400,
                message: 'Project Is Not Exist'
            }
        }
        if (thumbnailProject && thumbnailProject?.size > 0) {
            let imageSrc: string | null = projectInfo.image
            let imageId: string | null = projectInfo.imageId
            if (projectInfo.image && projectInfo?.image.length > 0 && imageId) {
                await imageKit.deleteFile(imageId)
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
            await prisma.projects.update({
                where: {
                    id: projectId,
                    adminId: userID
                },
                data: {
                    adminId: admin.id,
                    title: title,
                    imageId,
                    description,
                    image: imageSrc,
                }
            })
        }
        else{
            await prisma.projects.update({
                where: {
                    id: projectId,
                    adminId: userID
                },
                data: {
                    adminId: admin.id,
                    title: title,
                    description,
                }
            })
        }
        revalidatePath('/')
        return {
            statusText: 'SUCCESSFUL',
            status: 200,
            message: 'Project Updated Successfully'
        }

    } catch (error: any) {

        return {
            statusText: 'FAIL',
            status: 500,
            message: error.message as string
        }
    } finally {
        await prisma.$disconnect()
    }
}
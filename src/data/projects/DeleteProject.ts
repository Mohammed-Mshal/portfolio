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
export default async function DeleteProject(prevState: any, formData: FormData): Promise<ResponseType> {
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
        const projectId = formData.get('itemId') as string
        if (!projectId || projectId.length === 0) {
            return {
                message: 'Id Project Is Required',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const projectInfo = await prisma.projects.findUnique({
            where: {
                id: projectId,
                adminId: session.userID,
            }
        })
        if (!projectInfo) {
            return {
                message: 'Project Is Not Found',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const projectLinks = await prisma.projectLink.findMany({
            where: {
                projectsId: projectId
            },
        })
        await imgKIT.bulkDeleteFiles(projectLinks.map((e) => e.iconId))
        await prisma.projectLink.deleteMany({
            where: {
                projectsId: projectId
            },
        })
        await prisma.tool.deleteMany({
            where: {
                projectsId: projectId,
                adminId: session.userID,
            },
        })
        await prisma.projects.delete({
            where: {
                id: projectId
            },
        })
        await imgKIT.deleteFile(projectInfo?.imageId as string)
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Delete Project Is Complete',
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
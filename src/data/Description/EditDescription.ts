'use server'
import { verifySession } from "@/libs/session";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface ResponseType {
    status: number | null;
    statusText: string;
    message: string;
}
const prisma = new PrismaClient()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditDescription(prevState: any, formData: FormData): Promise<ResponseType> {
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
        const descriptionId = formData.get('descriptionId') as string
        const newDescription = formData.get('newDescription') as string
        if (!descriptionId || !newDescription) {
            return {
                message: 'Id Description Is Required',
                status: 400,
                statusText: 'ERROR'
            }
        }
        await prisma.description.update({
            where: {
                id: descriptionId,
                adminId: session.userID
            },
            data: {
                description: newDescription
            }
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Update Description Is Complete',
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
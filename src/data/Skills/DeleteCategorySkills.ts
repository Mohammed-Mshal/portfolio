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
export default async function DeleteCategorySkill(prevState: any, formData: FormData): Promise<ResponseType> {
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
        const categoryId = formData.get('itemId') as string
        if (!categoryId || categoryId.length === 0) {
            return {
                message: 'Id Category Is Required',
                status: 400,
                statusText: 'ERROR'
            }
        }
        const categoryItem = await prisma.categorySkill.findUnique({
            where: {
                id: categoryId,
                adminId: session.userID,
            }
        })
        if (!categoryItem) {
            return {
                message: 'Category Is Not Found',
                status: 400,
                statusText: 'ERROR'
            }
        }

        await prisma.skills.deleteMany({
            where: {
                categorySkillId: categoryId
            },
        })
        await prisma.categorySkill.delete({
            where: {
                id: categoryId,
                adminId: session.userID,
            },
        })
        revalidatePath('/')
        return {
            status: 200,
            statusText: 'SUCCESS',
            message: 'Delete Category Is Complete',
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
'use server'
import { PrismaClient, Technologies } from "@prisma/client"
interface ResponseType {
    status: number;
    statusText: string;
    message?: string;
    data?: {
        technologies: ({
            Experience: {
                id: string;
                companyName: string;
            } | null;
        } & Technologies)[];
    };
}
const prisma = new PrismaClient()

export default async function GetTechnologies(): Promise<ResponseType> {
    try {

        const technologies = await prisma.technologies.findMany({
            where: {},
            include: {
                Experience: {
                    select: {
                        id: true,
                        companyName: true,
                    }
                }
            }
        }
        )
        return {
            status: 200,
            statusText: 'SUCCESS',
            data: {
                technologies
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            statusText: 'FAIL',
            message: error instanceof Error ? error.message : 'An unexpected error occurred'
        }
    } finally {
        await prisma.$disconnect()
    }
}
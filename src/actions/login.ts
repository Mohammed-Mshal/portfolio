'use server'

import { createSession } from "@/libs/session"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"
import { redirect } from "next/navigation"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
    try {
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        if (!email || !password) {

            return { message: 'Email Required' }
        }
        const admin = await prisma.admin.findUnique({
            where: {
                email: email as string
            }
        })
        if (!admin) {
            return {
                message: 'Admin Not Exist',
                status: 403,
            }
        }
        const isPasswordValid = await compare(password, admin.password)
        if (!isPasswordValid) {
            return {
                message: 'Password Is Not Valid',
                status: 403,
            }

        }
        await createSession(admin.id)

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
    redirect('/dashboard')
}
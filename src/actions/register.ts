'use server'

import { createSession } from "@/libs/session";
import { PrismaClient } from "@prisma/client"
    ;
import { genSalt, hash } from "bcryptjs";
import { redirect } from "next/navigation";

const prisma = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function register(prevState: any, formData: FormData) {
    try {
        await prisma.$connect()
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string
        if (!name || !email || !password || !confirmPassword) {
            return {
                status: 403,
                message: 'Some Fields Is Missing'
            }
        }
        const isEmailExist = await prisma.admin.findFirst({
            where: {
                email: email
            }
        })
        if (isEmailExist) {
            return {
                status: '404',
                message: "Email Already Is Exist"
            }
        }
        if (password !== confirmPassword) {
            return {
                status: '404',
                message: "Password Should be same Confirm Password"
            }

        }
        const salt = await genSalt(10)
        const passwordHashing = await hash(password, salt)
        const newAdmin = await prisma.admin.create({
            data: {
                name,
                email,
                password: passwordHashing,
            }
        })
        await createSession(newAdmin.id)

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
    finally {
        await prisma.$disconnect()
    }
    redirect('/dashboard')
}
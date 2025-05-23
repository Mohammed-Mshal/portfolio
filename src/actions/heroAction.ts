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
export default async function heroAction(prevState: any, formData: FormData) {
    try {
        const title = formData.get('title') as string
        const bgImage = formData.get('bgImage') as File || null
        const subtitle = formData.get('subtitle') as string
        const buttonText = formData.get('buttonText') as string
        const buttonLink = formData.get('buttonLink') as string
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
                HeroSection: true
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
        let imageId: string | null = admin.HeroSection?.imageId || null
        if (bgImage && bgImage?.size > 0) {
            if (admin.HeroSection?.image && admin.HeroSection?.image.length > 0 && imageId) {
                await imageKit.deleteFile(imageId)
            }
            const arrayBufferImage = await bgImage.arrayBuffer()
            const bufferImage = Buffer.from(arrayBufferImage)
            const imageUploaded = await imageKit.upload({
                file: bufferImage,
                fileName: bgImage.name,
                folder: 'portfolio/hero-action'

            })

            imageSrc = imageUploaded.url;
            imageId = imageUploaded.fileId;
        }
        if (admin.HeroSection) {
            await prisma.heroSection.update({
                where: {
                    adminId: admin.id
                }, data: {
                    title: title || admin.HeroSection?.title,
                    buttonLink: buttonLink || admin.HeroSection?.buttonLink,
                    imageId: imageId ? imageId : admin.HeroSection.imageId,
                    description: description || admin.HeroSection.description,
                    image: imageSrc ? imageSrc : admin.HeroSection.image,
                    subtitle: subtitle || admin.HeroSection?.subtitle,
                    buttonText: buttonText || admin.HeroSection?.buttonText,
                }
            })
        } else {
            await prisma.heroSection.create({
                data: {
                    adminId: admin.id,
                    title: title,
                    buttonLink: buttonLink,
                    imageId,
                    description,
                    image: imageSrc,
                    subtitle: subtitle,
                    buttonText: buttonText,
                }
            })
        }
        revalidatePath('/')
        return {
            statusText: 'SUCCESSFUL',
            status: 200,
            message: 'Updated Hero Section Is Successful'
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
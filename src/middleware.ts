import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, updateCookies } from "./libs/session";

export async function middleware(request: NextRequest) {
    const authRoutes = '/dashboard/auth'
    const protectedRoute = ['/dashboard/cms']
    const currentPath = request.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(currentPath)
    if (currentPath === '/') {
        return NextResponse.redirect(new URL('/portfolio', request.nextUrl))
    }
    if (isProtectedRoute && !currentPath.startsWith(authRoutes)) {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        if (!session?.userID) {
            return NextResponse.redirect(new URL('/dashboard/auth/login', request.nextUrl))
        }
    }
    if (currentPath.startsWith(authRoutes)) {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        if (session?.userID) {
            return NextResponse.redirect(new URL('/dashboard/cms', request.nextUrl))
        }
    }
    if (currentPath === '/dashboard') {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        if (session?.userID) {
            return NextResponse.redirect(new URL('/dashboard/cms', request.nextUrl))
        }
        else {
            return NextResponse.redirect(new URL('/dashboard/auth/login', request.nextUrl))

        }
    }
    return await updateCookies(request)

}
export const config = {
    matcher: [
        '/',
        '/dashboard/:path*'
    ],
}
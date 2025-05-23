/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWTPayload, jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import 'server-only'

const key = new TextEncoder().encode(process.env.SECRET)

export async function encrypt(payload: any) {
    // Creates a new JWT instance with your payload data.
    return await new SignJWT(payload)
        // Sets the iat (issued at) claim in the JWT to the current timestamp.w
        .setIssuedAt()
        // Sets the exp (expiration) claim to 24 hours from now.
        .setExpirationTime('1day')
        // Sets the JWT header to use the HMAC-SHA256 algorithm for signing.
        .setProtectedHeader({
            alg: 'HS256'
        })
        // Signs the JWT using the secret key defined earlier in the file (
        .sign(key)
}

export async function decrypt(session: string | undefined) {
    try {
        // Validate that session is a non-empty string
        if (!session || typeof session !== 'string' || session.trim() === '') {
            return null;
        }
        // - Verify the token's signature using the same secret key used for encryption
        // - Confirm it was signed with the HS256 algorithm
        // - Check if the token has expired
        const { payload } = await jwtVerify(session, key, { algorithms: ['HS256'] })
        return payload
    } catch (error: any) {
        console.log(error);
        return null
    }
}
export async function createSession(userID: any) {
    // set expires of session after 1 day
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    // encrypt data which provided
    const session = await encrypt({ userID, expires });
    // set cookies 
    (await cookies()).set('session', session, {
        httpOnly: true,
        expires,
        sameSite: 'lax',
        path: '/'
    })
}
export async function verifySession() {
    const userCookies = (await cookies()).get('session')?.value
    if (!userCookies) return
    const session = await decrypt(userCookies)
    return session
}
export async function updateCookies(request: NextRequest) {
    const session = request.cookies.get('session')?.value
    if (!session) return
    const parsed = await decrypt(session) as JWTPayload
    if (!parsed) return;
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const res = NextResponse.next()
    res.cookies.set({
        name: 'session',
        expires: parsed.expires as Date,
        value: await encrypt(parsed),
        httpOnly: true
    })
    return res;
}
export async function deleteCookies() {
    (await cookies()).delete('session')
    redirect('/dashboard/auth/login')
}
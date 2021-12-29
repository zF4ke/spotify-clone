import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {

    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    const { pathname } = req.nextUrl

    console.log(token)

    // allow the request if:
    // 1) it's a request for next-auth session & provider fetching
    // 2) the token exists

    if (pathname.includes('/api/auth') || token) return NextResponse.next()

    // redirect them to login if they dont have a token AND are requesting a protected route

    if (!token && pathname !== "/login") return NextResponse.redirect('/login')

}
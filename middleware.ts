import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const protectedPath = path === '/cart' || path === '/create'

    // Get the token from the cookies
    const token = request.cookies.get('token')?.value || ''

    // Redirect logic based on the path and token presence
    if(!protectedPath && token) {
        // If trying to access a public path with a token, redirect to the home page
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    // If trying to access a protected path without a token, redirect to the login page
    if (protectedPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
  matcher: [
    '/cart',
    '/create',
    '/login',
    '/signup',
  ]
}
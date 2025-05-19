import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value

  if (request.nextUrl.pathname.startsWith('/home') && !token) {
    console.log('No token found, redirecting to create-profile')
    return NextResponse.redirect(new URL('/create-profile', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/home/:path*'],
}

import { NextResponse, NextRequest } from 'next/server';

// Paths for public pages
const publicPaths = ['/login', '/forget-password', '/developers', '/downloadapp'];

export async function middleware(request: NextRequest) {
  try {
    const isAuthenticated = request.cookies.get('is_auth')?.value==='true';
    const path = request.nextUrl.pathname;

    if (isAuthenticated) {
      if (publicPaths.includes(path)) {
        return NextResponse.redirect(new URL('/profile', request.url));
      }
    }

    if (!isAuthenticated && !publicPaths.includes(path)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next()
  } catch (error) {
    console.error('Error occurred while checking authentication:', error);
    return NextResponse.error();
  }
}
// This specifies which paths the middleware should run on. In this case, the middleware will apply to all paths except the ones specified in the matcher array.
export const config = {
  matcher: [
    '/login', '/forget-password', '/user/:path*',  '/products', '/list-product', '/contacts', '/profile', '/products/:path*', '/developers', '/downloadapp',
  ],
};

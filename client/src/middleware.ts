import { NextResponse, NextRequest } from 'next/server';

// Paths for public and protected routes
const publicPaths = ['/login', '/register', '/forgot-password'];
const protectedPaths = ['/profile', '/user/:path*', '/store', '/store/:path*', '/contact', '/product' , '/list-product'];

export async function middleware(request: NextRequest) {
//   try {
//     const isAuthenticated = request.cookies.get('is_auth')?.value === 'true'; 
//     const path = request.nextUrl.pathname;

//     if (isAuthenticated && publicPaths.some((p) => path.startsWith(p))) {
//       return NextResponse.redirect(new URL('/profile', request.url));
//     }

//     if (!isAuthenticated && protectedPaths.some((p) => path.startsWith(p))) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error('Error occurred while checking authentication:', error);
//     return NextResponse.error();
//   }
}

export const config = {
  matcher: [
    '/login', '/register', '/forgot-password', '/user/:path*', '/store/:path*', '/product', '/list-product', '/contact', '/profile'
  ],
};

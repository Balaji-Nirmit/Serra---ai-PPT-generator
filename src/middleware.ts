// middleware.ts or middleware.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Your middleware logic goes here
  console.log('Middleware is running!');

  // Example: Redirect user if they try to access /secret without a token
  // if (!request.cookies.has('auth_token') && request.nextUrl.pathname.startsWith('/secret')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // Continue to the next step (either the page or the next middleware)
  return NextResponse.next();
}

// Optional: Define a config object to specify which paths the middleware should run on
export const config = {
  // Matches all paths except for static files (_next/static), public files (favicon.ico),
  // and the root of the site (/)
  matcher: '/:path*', 
};
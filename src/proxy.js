import { NextResponse } from 'next/server';

// This proxy acts to protect your routes based on the refreshToken
export function proxy(request) {
    const token = request.cookies.get('refreshToken')?.value;
    const { pathname } = request.nextUrl;

    const isPublicFile = pathname.match(/\.[^/]+$/);
    // matches anything like /logo.png, /image.jpg, /file.css, etc.

    if (isPublicFile) {
        return NextResponse.next();
    }


    // Define routes that shouldn't be protected by this proxy
    const isPublicRoute =
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        // Add any other public asset paths here if needed
        pathname === '/favicon.ico';

    if (isPublicRoute) {
        return NextResponse.next();
    }

    const isLoginRoute = pathname === '/login';

    // 1. If user HAS a token and tries to access /login -> Redirect to dashboard (/)
    if (token && isLoginRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. If user DOES NOT HAVE a token and tries to access any page EXCEPT /login -> Redirect to /login
    if (!token && !isLoginRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Otherwise, let them proceed normally
    return NextResponse.next();
}

export const config = {
    // Apply this proxy to all routes except Next.js internals and static files
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

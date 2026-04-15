import { NextResponse } from 'next/server';

// Lightweight JWT payload decoder (no verification — that's the backend's job).
// We only need the role claim to gate admin routes on the frontend.
function decodeJwtPayload(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = JSON.parse(
            Buffer.from(parts[1], 'base64url').toString('utf-8')
        );
        return payload;
    } catch {
        return null;
    }
}

const API_URL = process.env.NODE_ENV === 'development' 
    ? process.env.LOCAL_API_HOST 
    : process.env.API_HOST;

async function verifyTokenOnServer(request) {
    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: {
                'Cookie': request.headers.get('cookie') || '',
            },
        });
        const data = await response.json();
        return {
            isValid: response.ok,
            user: data?.user || null,
            setCookie: response.headers.get('set-cookie')
        };
    } catch (error) {
        console.error('Middleware verification failed:', error);
        return { isValid: false, user: null };
    }
}

// This proxy acts to protect your routes based on the refreshToken
export async function proxy(request) {
    const token = request.cookies.get('refreshToken')?.value;
    const accessToken = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    const isPublicFile = pathname.match(/\.[^/]+$/);
    if (isPublicFile) {
        return NextResponse.next();
    }

    const isPublicRoute =
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname === '/favicon.ico' ||
        pathname === '/verify';

    if (isPublicRoute) {
        return NextResponse.next();
    }

    const isLoginRoute = pathname === '/login';

    // 1. If user HAS a token and tries to access /login -> Verify and potentially redirect
    if (token && isLoginRoute) {
        const { isValid, setCookie } = await verifyTokenOnServer(request);
        if (isValid) {
            const response = NextResponse.redirect(new URL('/', request.url));
            if (setCookie) response.headers.set('set-cookie', setCookie);
            return response;
        }
        // If token is invalid, allow them to stay on /login (invalid cookies will be cleared by the backend or ignored)
    }

    // 2. If user DOES NOT HAVE a token and tries to access any page EXCEPT /login -> Redirect to /login
    if (!token && !isLoginRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. Admin route protection
    const isAdminRoute = pathname.startsWith('/admin');

    if (isAdminRoute) {
        const { isValid, user, setCookie } = await verifyTokenOnServer(request);
        
        if (!isValid || (user?.role !== 'admin' && user?.role !== 'superadmin')) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        const response = NextResponse.next();
        if (setCookie) response.headers.set('set-cookie', setCookie);
        return response;
    }

    // Otherwise, let them proceed normally
    return NextResponse.next();
}

export const config = {
    // Apply this proxy to all routes except Next.js internals and static files
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

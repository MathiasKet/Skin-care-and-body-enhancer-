import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/auth/callback',
  '/check-email',
  '/api/auth/callback',
  '/_next',
  '/favicon.ico',
];

// List of auth paths that should redirect to dashboard if already authenticated
const authPaths = ['/login', '/signup', '/forgot-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Initialize Supabase client
  const supabase = createServerClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  try {
    // Get the user's session
    const { data: { session } } = await supabase.auth.getSession();
    
    // If user is not authenticated and trying to access a protected route
    if (!session && !publicPaths.some(path => pathname.startsWith(path))) {
      // Redirect to login with the current path as the return URL
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is authenticated and trying to access an auth page, redirect to dashboard
    if (session && authPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // For authenticated users, we can refresh the session if needed
    if (session) {
      await supabase.auth.getSession();
    }
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of error, redirect to login
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('error', 'session_error');
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

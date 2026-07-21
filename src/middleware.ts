import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'zh']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // --- ADMIN & API AUTHENTICATION ---
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/cms')) {
    // Allow public access to login page and auth APIs
    if (pathname === '/admin/login' || pathname === '/api/cms/login' || pathname === '/api/cms/logout') {
      return NextResponse.next()
    }

    // Check for session cookie
    const session = request.cookies.get('cms_session')
    if (!session || session.value !== 'authenticated') {
      if (pathname.startsWith('/api/cms')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Authenticated - skip i18n logic for admin/api routes
    return NextResponse.next()
  }

  // Public API routes — skip i18n locale redirect
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Don't run i18n middleware on Sanity Studio paths
  if (pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  // Check if pathname already has a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Retrieve preferred language or default to 'en'
  const acceptLanguage = request.headers.get('accept-language') || ''
  let locale = defaultLocale
  if (acceptLanguage.includes('zh') || acceptLanguage.includes('CN') || acceptLanguage.includes('HK') || acceptLanguage.includes('TW')) {
    locale = 'zh'
  }

  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Match all paths except static files, favicons, next-images, and Sanity studio
    '/((?!_next/static|_next/image|favicon.ico|studio|.*\\..*).*)',
  ],
}

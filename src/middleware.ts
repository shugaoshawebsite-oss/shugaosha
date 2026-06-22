import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'zh']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Don't run middleware on Sanity Studio paths
  if (pathname.startsWith('/studio')) {
    return
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
    // Match all paths except static files, favicons, next-images, api routes, and Sanity studio
    '/((?!api|_next/static|_next/image|favicon.ico|studio|.*\\..*).*)',
  ],
}

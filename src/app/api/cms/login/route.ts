import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { password, username_confirm } = await request.json()

    // Honeypot Check: if the hidden field is filled out, it's a bot.
    if (username_confirm) {
      // Simulate a successful login to trick the bot, or just return 400
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 })
    }

    const correctPassword = process.env.CMS_PASSWORD || 'admin123'

    if (password === correctPassword) {
      // Set the session cookie
      const cookieStore = await cookies()
      cookieStore.set('cms_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/cms/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          username_confirm: honeypot, // the honeypot field
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // Redirect to dashboard
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal">Admin CMS</h1>
            <p className="text-sm text-charcoal/60">Enter your password to access the content management system.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* HONEYPOT FIELD - Hidden from users, visible to bots */}
            <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <label htmlFor="username_confirm">Do not fill this out</label>
              <input
                type="text"
                id="username_confirm"
                name="username_confirm"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-charcoal uppercase">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Secure Login'}
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
          <p className="text-xs text-charcoal/40">Protected by Honeypot Anti-Bot Security</p>
        </div>
      </div>
    </div>
  )
}

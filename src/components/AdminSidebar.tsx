'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Image as ImageIcon, CalendarDays, Menu, X } from 'lucide-react'

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/celebrities', icon: Users, label: 'Celebrities' },
    { href: '/admin/case-studies', icon: ImageIcon, label: 'Before & After' },
    { href: '/admin/tours', icon: CalendarDays, label: 'Upcoming Visits' },
  ]

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <h1 className="text-xl font-semibold text-charcoal">CMS Admin</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-charcoal/70 hover:bg-gray-100 rounded-lg">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col shadow-xl md:shadow-sm
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-100 hidden md:block">
          <h1 className="text-xl font-semibold text-charcoal">CMS Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-charcoal/70 hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={async () => {
              await fetch('/api/cms/logout', { method: 'POST' })
              window.location.href = '/admin/login'
            }}
            className="text-sm font-medium text-red-500/80 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center justify-center w-full"
          >
            Log Out
          </button>
          <Link
            href="/"
            className="text-sm font-medium text-charcoal/50 hover:text-primary hover:bg-gray-50 p-2 rounded-lg transition-colors flex items-center justify-center w-full"
          >
            &larr; Back to Website
          </Link>
        </div>
      </aside>
    </>
  )
}

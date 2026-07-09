import AdminSidebar from '@/components/AdminSidebar'
import '../globals.css'

export const metadata = {
  title: 'Admin CMS | Shugaosha',
  description: 'Content Management System',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans relative">
          <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
        </div>
      </body>
    </html>
  )
}

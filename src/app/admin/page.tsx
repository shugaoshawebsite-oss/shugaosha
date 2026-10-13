import AdminGoogleReviewsSync from '@/components/AdminGoogleReviewsSync'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight">Dashboard</h1>
        <p className="text-charcoal/60">Welcome to the Content Management System.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminGoogleReviewsSync />

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-charcoal">Celebrities</h2>
          <p className="text-sm text-charcoal/60">Manage celebrity endorsements and their quotes.</p>
          <a href="/admin/celebrities" className="text-primary text-sm font-medium hover:underline inline-block mt-2">Manage &rarr;</a>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-charcoal">Before & After</h2>
          <p className="text-sm text-charcoal/60">Manage case studies and progression photos.</p>
          <a href="/admin/case-studies" className="text-primary text-sm font-medium hover:underline inline-block mt-2">Manage &rarr;</a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-medium text-charcoal">Upcoming Visits</h2>
          <p className="text-sm text-charcoal/60">Manage global tour schedule and dates.</p>
          <a href="/admin/tours" className="text-primary text-sm font-medium hover:underline inline-block mt-2">Manage &rarr;</a>
        </div>
      </div>
    </div>
  )
}

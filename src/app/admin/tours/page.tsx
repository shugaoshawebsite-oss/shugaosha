'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

interface LocalizedString {
  en: string
  zh: string
}

interface Tour {
  _id: string
  city: LocalizedString
  dates: string[]
  isActive: boolean
}

export default function ToursAdmin() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Tour>>({})
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const res = await fetch('/api/cms/tours', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setTours(data)
      }
    } catch (error) {
      console.error('Failed to fetch tours', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async (updatedData: Tour[]) => {
    setSaving(true)
    try {
      const res = await fetch('/api/cms/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      if (res.ok) {
        setTours(updatedData)
        setEditingId(null)
      } else {
        alert('Failed to save changes')
      }
    } catch (error) {
      console.error(error)
      alert('Error saving changes')
    } finally {
      setSaving(false)
    }
  }

  const handleAdd = () => {
    const newId = `tour${Date.now()}`
    const newTour: Tour = {
      _id: newId,
      city: { en: '', zh: '' },
      dates: [''],
      isActive: true,
    }
    setEditForm(newTour)
    setEditingId(newId)
  }

  const handleEdit = (tour: Tour) => {
    setEditForm(tour)
    setEditingId(tour._id)
  }

  const handleDelete = (id: string) => {
    setDeletingId(id)
  }

  const handleSaveEdit = () => {
    if (!editForm._id) return

    const exists = tours.some(c => c._id === editForm._id)
    let updated: Tour[]

    if (exists) {
      updated = tours.map(c => c._id === editForm._id ? (editForm as Tour) : c)
    } else {
      updated = [...tours, editForm as Tour]
    }

    handleSaveAll(updated)
  }

  const updateDate = (index: number, value: string) => {
    const newDates = [...(editForm.dates || [])]
    newDates[index] = value
    setEditForm({ ...editForm, dates: newDates })
  }

  const addDate = () => {
    setEditForm({ ...editForm, dates: [...(editForm.dates || []), ''] })
  }

  const removeDate = (index: number) => {
    const newDates = [...(editForm.dates || [])]
    newDates.splice(index, 1)
    setEditForm({ ...editForm, dates: newDates })
  }

  if (loading) return <div className="p-8 text-charcoal/60">Loading upcoming visits...</div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Manage Upcoming Visits</h1>
          <p className="text-sm text-charcoal/60">Update global tour schedule and dates.</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={saving || editingId !== null}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Add Tour
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-gray-50 text-charcoal/60 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium">City (EN/ZH)</th>
              <th className="px-6 py-4 font-medium">Dates</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tours.map((tour) => (
              <tr key={tour._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="font-medium text-charcoal">{tour.city.en}</div>
                  <div className="text-charcoal/50 text-xs">{tour.city.zh}</div>
                </td>
                <td className="px-6 py-4">
                  {tour.dates.map((date, i) => (
                    <div key={i} className="text-charcoal">{date}</div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tour.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {tour.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button onClick={() => handleEdit(tour)} disabled={editingId !== null} className="p-2 text-charcoal/40 hover:text-primary transition-colors disabled:opacity-50">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(tour._id)} disabled={editingId !== null} className="p-2 text-charcoal/40 hover:text-red-500 transition-colors disabled:opacity-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {tours.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-charcoal/50">No tours found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-charcoal">
                {tours.some(c => c._id === editingId) ? 'Edit Tour' : 'Add Tour'}
              </h2>
              <button onClick={() => setEditingId(null)} className="text-charcoal/40 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">City (English)</label>
                  <input type="text" value={editForm.city?.en || ''} onChange={(e) => setEditForm({...editForm, city: {...editForm.city!, en: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">City (Chinese)</label>
                  <input type="text" value={editForm.city?.zh || ''} onChange={(e) => setEditForm({...editForm, city: {...editForm.city!, zh: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-charcoal uppercase">Dates</label>
                <div className="space-y-2">
                  {(editForm.dates || []).map((date, index) => (
                    <div key={index} className="flex gap-2">
                      <input type="text" placeholder="e.g. 27 September – 18 October 2026" value={date} onChange={(e) => updateDate(index, e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                      <button onClick={() => removeDate(index)} className="px-3 py-2 text-charcoal/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addDate} className="text-xs font-medium text-primary hover:underline mt-2">
                  + Add another date
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isActive" checked={editForm.isActive || false} onChange={(e) => setEditForm({...editForm, isActive: e.target.checked})} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                <label htmlFor="isActive" className="text-sm font-medium text-charcoal">Active (Display on website)</label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button onClick={handleSaveEdit} disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50">
                  <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletingId && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4 border border-gray-100 transform scale-100 transition-transform">
            <h2 className="text-lg font-semibold text-charcoal">Delete Tour</h2>
            <p className="text-sm text-charcoal/60 leading-relaxed">Are you sure you want to delete this tour? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updated = tours.filter(c => c._id !== deletingId)
                  handleSaveAll(updated)
                  setDeletingId(null)
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

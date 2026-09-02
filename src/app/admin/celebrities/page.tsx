'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X, GripVertical } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

interface LocalizedString {
  en: string
  zh: string
}

interface Celebrity {
  _id: string
  name: LocalizedString
  role: LocalizedString
  quote: LocalizedString
  imageRelativeUrl: string
  updatedAt?: string
}

function formatLastEdit(dateString?: string, fallbackId?: string) {
  if (dateString) {
    const d = new Date(dateString)
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    }
  }
  if (fallbackId) {
    const match = fallbackId.match(/\d{10,13}/)
    if (match) {
      const ts = parseInt(match[0])
      const d = new Date(ts > 1e11 ? ts : ts * 1000)
      if (!isNaN(d.getTime()) && d.getFullYear() >= 2020) {
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    }
  }
  return '—'
}

export default function CelebritiesAdmin() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Celebrity>>({})
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const updated = [...celebrities]
    const [draggedItem] = updated.splice(draggedIndex, 1)
    updated.splice(index, 0, draggedItem)

    setCelebrities(updated)
    handleSaveAll(updated)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  useEffect(() => {
    fetchCelebrities()
  }, [])

  const fetchCelebrities = async () => {
    try {
      const res = await fetch('/api/cms/celebrities', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setCelebrities(data)
      }
    } catch (error) {
      console.error('Failed to fetch celebrities', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async (updatedData: Celebrity[]) => {
    setSaving(true)
    try {
      const res = await fetch('/api/cms/celebrities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      if (res.ok) {
        setCelebrities(updatedData)
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
    const newId = `c${Date.now()}`
    const newCeleb: Celebrity = {
      _id: newId,
      name: { en: '', zh: '' },
      role: { en: '', zh: '' },
      quote: { en: '', zh: '' },
      imageRelativeUrl: '',
      updatedAt: new Date().toISOString(),
    }
    setEditForm(newCeleb)
    setEditingId(newId)
  }

  const handleEdit = (celeb: Celebrity) => {
    setEditForm(celeb)
    setEditingId(celeb._id)
  }

  const handleDelete = (id: string) => {
    setDeletingId(id)
  }

  const handleSaveEdit = () => {
    if (!editForm._id) return

    const itemToSave = {
      ...editForm,
      updatedAt: new Date().toISOString(),
    }

    const exists = celebrities.some(c => c._id === editForm._id)
    let updated: Celebrity[]

    if (exists) {
      updated = celebrities.map(c => c._id === editForm._id ? (itemToSave as Celebrity) : c)
    } else {
      updated = [...celebrities, itemToSave as Celebrity]
    }

    handleSaveAll(updated)
  }

  if (loading) return <div className="p-8 text-charcoal/60">Loading celebrities...</div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Manage Celebrities</h1>
          <p className="text-sm text-charcoal/60">Update celebrity endorsements and quotes.</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={saving || editingId !== null}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Add Celebrity
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm min-w-full sm:min-w-[600px]">
          <thead className="bg-gray-50 text-charcoal/60 border-b border-gray-100">
            <tr>
              <th className="px-4 py-4 w-10"></th>
              <th className="px-6 py-4 font-medium">Name (EN/ZH)</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="hidden md:table-cell px-6 py-4 font-medium">Image Path</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
              <th className="px-6 py-4 font-medium text-right whitespace-nowrap">Last edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {celebrities.map((celeb, index) => (
              <tr
                key={celeb._id}
                draggable={!saving && editingId === null}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`hover:bg-gray-50/50 transition-all duration-150 ${draggedIndex === index ? 'opacity-40 bg-gray-100' : ''}`}
              >
                <td className="px-4 py-4 cursor-grab active:cursor-grabbing text-charcoal/40 hover:text-charcoal transition-colors">
                  <GripVertical className="w-4 h-4" />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-charcoal">{celeb.name.en}</div>
                  <div className="text-charcoal/50 text-xs">{celeb.name.zh}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-charcoal">{celeb.role.en}</div>
                  <div className="text-charcoal/50 text-xs">{celeb.role.zh}</div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 font-mono text-xs text-charcoal/60">
                  {celeb.imageRelativeUrl || 'None'}
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button onClick={() => handleEdit(celeb)} disabled={editingId !== null} className="p-2 text-charcoal/40 hover:text-primary transition-colors disabled:opacity-50">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(celeb._id)} disabled={editingId !== null} className="p-2 text-charcoal/40 hover:text-red-500 transition-colors disabled:opacity-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
                <td className="px-6 py-4 text-right text-xs text-charcoal/60 whitespace-nowrap">
                  {formatLastEdit(celeb.updatedAt, celeb._id)}
                </td>
              </tr>
            ))}
            {celebrities.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-charcoal/50">No celebrities found. Add one to get started.</td>
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
                {celebrities.some(c => c._id === editingId) ? 'Edit Celebrity' : 'Add Celebrity'}
              </h2>
              <button onClick={() => setEditingId(null)} className="text-charcoal/40 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Name (English)</label>
                  <input type="text" value={editForm.name?.en || ''} onChange={(e) => setEditForm({...editForm, name: { zh: editForm.name?.zh || '', en: e.target.value }})} className="w-full px-3 py-2 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Name (Chinese)</label>
                  <input type="text" value={editForm.name?.zh || ''} onChange={(e) => setEditForm({...editForm, name: { en: editForm.name?.en || '', zh: e.target.value }})} className="w-full px-3 py-2 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Role (English)</label>
                  <input type="text" value={editForm.role?.en || ''} onChange={(e) => setEditForm({...editForm, role: { zh: editForm.role?.zh || '', en: e.target.value }})} className="w-full px-3 py-2 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Role (Chinese)</label>
                  <input type="text" value={editForm.role?.zh || ''} onChange={(e) => setEditForm({...editForm, role: { en: editForm.role?.en || '', zh: e.target.value }})} className="w-full px-3 py-2 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Quote (English)</label>
                  <textarea rows={8} value={editForm.quote?.en || ''} onChange={(e) => setEditForm({...editForm, quote: { zh: editForm.quote?.zh || '', en: e.target.value }})} className="w-full px-3 py-2 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Quote (Chinese)</label>
                  <textarea rows={8} value={editForm.quote?.zh || ''} onChange={(e) => setEditForm({...editForm, quote: { en: editForm.quote?.en || '', zh: e.target.value }})} className="w-full px-3 py-2 border border-gray-200 rounded-[4px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"></textarea>
                </div>
              </div>

              <ImageUpload 
                label="Celebrity Image"
                value={editForm.imageRelativeUrl || ''} 
                onChange={(url) => setEditForm({...editForm, imageRelativeUrl: url})} 
              />

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
            <h2 className="text-lg font-semibold text-charcoal">Delete Celebrity</h2>
            <p className="text-sm text-charcoal/60 leading-relaxed">Are you sure you want to delete this celebrity? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-sm font-medium text-charcoal/70 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updated = celebrities.filter(c => c._id !== deletingId)
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

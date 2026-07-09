'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
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
}

export default function CelebritiesAdmin() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Celebrity>>({})

  useEffect(() => {
    fetchCelebrities()
  }, [])

  const fetchCelebrities = async () => {
    try {
      const res = await fetch('/api/cms/celebrities')
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
    }
    setEditForm(newCeleb)
    setEditingId(newId)
  }

  const handleEdit = (celeb: Celebrity) => {
    setEditForm(celeb)
    setEditingId(celeb._id)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this celebrity?')) {
      const updated = celebrities.filter(c => c._id !== id)
      handleSaveAll(updated)
    }
  }

  const handleSaveEdit = () => {
    if (!editForm._id) return

    const exists = celebrities.some(c => c._id === editForm._id)
    let updated: Celebrity[]

    if (exists) {
      updated = celebrities.map(c => c._id === editForm._id ? (editForm as Celebrity) : c)
    } else {
      updated = [...celebrities, editForm as Celebrity]
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
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-gray-50 text-charcoal/60 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium">Name (EN/ZH)</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Image Path</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {celebrities.map((celeb) => (
              <tr key={celeb._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="font-medium text-charcoal">{celeb.name.en}</div>
                  <div className="text-charcoal/50 text-xs">{celeb.name.zh}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-charcoal">{celeb.role.en}</div>
                  <div className="text-charcoal/50 text-xs">{celeb.role.zh}</div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-charcoal/60">
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
              </tr>
            ))}
            {celebrities.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-charcoal/50">No celebrities found. Add one to get started.</td>
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
                  <input type="text" value={editForm.name?.en || ''} onChange={(e) => setEditForm({...editForm, name: {...editForm.name!, en: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Name (Chinese)</label>
                  <input type="text" value={editForm.name?.zh || ''} onChange={(e) => setEditForm({...editForm, name: {...editForm.name!, zh: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Role (English)</label>
                  <input type="text" value={editForm.role?.en || ''} onChange={(e) => setEditForm({...editForm, role: {...editForm.role!, en: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Role (Chinese)</label>
                  <input type="text" value={editForm.role?.zh || ''} onChange={(e) => setEditForm({...editForm, role: {...editForm.role!, zh: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Quote (English)</label>
                  <textarea rows={3} value={editForm.quote?.en || ''} onChange={(e) => setEditForm({...editForm, quote: {...editForm.quote!, en: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Quote (Chinese)</label>
                  <textarea rows={3} value={editForm.quote?.zh || ''} onChange={(e) => setEditForm({...editForm, quote: {...editForm.quote!, zh: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"></textarea>
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
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

interface LocalizedString {
  en: string
  zh: string
}

interface CaseStudy {
  _id: string
  title: LocalizedString
  sessionsCount: number
  category: '4-session' | '8-session' | 'maintenance'
  imageRelativeUrl: string
  description?: LocalizedString
}

export default function CaseStudiesAdmin() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<CaseStudy>>({})

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const fetchCaseStudies = async () => {
    try {
      const res = await fetch('/api/cms/caseStudies')
      if (res.ok) {
        const data = await res.json()
        setCaseStudies(data)
      }
    } catch (error) {
      console.error('Failed to fetch case studies', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async (updatedData: CaseStudy[]) => {
    setSaving(true)
    try {
      const res = await fetch('/api/cms/caseStudies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      if (res.ok) {
        setCaseStudies(updatedData)
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
    const newId = `cs${Date.now()}`
    const newStudy: CaseStudy = {
      _id: newId,
      title: { en: '', zh: '' },
      sessionsCount: 4,
      category: '4-session',
      imageRelativeUrl: '',
      description: { en: '', zh: '' }
    }
    setEditForm(newStudy)
    setEditingId(newId)
  }

  const handleEdit = (study: CaseStudy) => {
    setEditForm(study)
    setEditingId(study._id)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      const updated = caseStudies.filter(c => c._id !== id)
      handleSaveAll(updated)
    }
  }

  const handleSaveEdit = () => {
    if (!editForm._id) return

    const exists = caseStudies.some(c => c._id === editForm._id)
    let updated: CaseStudy[]

    if (exists) {
      updated = caseStudies.map(c => c._id === editForm._id ? (editForm as CaseStudy) : c)
    } else {
      updated = [...caseStudies, editForm as CaseStudy]
    }

    handleSaveAll(updated)
  }

  if (loading) return <div className="p-8 text-charcoal/60">Loading case studies...</div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Manage Before & After</h1>
          <p className="text-sm text-charcoal/60">Update progression case studies and photos.</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={saving || editingId !== null}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Add Case Study
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-gray-50 text-charcoal/60 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium">Title (EN/ZH)</th>
              <th className="px-6 py-4 font-medium">Category / Sessions</th>
              <th className="px-6 py-4 font-medium">Image Path</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {caseStudies.map((study) => (
              <tr key={study._id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4">
                  <div className="font-medium text-charcoal">{study.title.en}</div>
                  <div className="text-charcoal/50 text-xs">{study.title.zh}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-charcoal capitalize">{study.category}</div>
                  <div className="text-charcoal/50 text-xs">{study.sessionsCount} sessions</div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-charcoal/60">
                  {study.imageRelativeUrl || 'None'}
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button onClick={() => handleEdit(study)} disabled={editingId !== null} className="p-2 text-charcoal/40 hover:text-primary transition-colors disabled:opacity-50">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(study._id)} disabled={editingId !== null} className="p-2 text-charcoal/40 hover:text-red-500 transition-colors disabled:opacity-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {caseStudies.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-charcoal/50">No case studies found. Add one to get started.</td>
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
                {caseStudies.some(c => c._id === editingId) ? 'Edit Case Study' : 'Add Case Study'}
              </h2>
              <button onClick={() => setEditingId(null)} className="text-charcoal/40 hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Title (English)</label>
                  <input type="text" value={editForm.title?.en || ''} onChange={(e) => setEditForm({...editForm, title: {...editForm.title!, en: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Title (Chinese)</label>
                  <input type="text" value={editForm.title?.zh || ''} onChange={(e) => setEditForm({...editForm, title: {...editForm.title!, zh: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Category</label>
                  <select value={editForm.category || '4-session'} onChange={(e) => setEditForm({...editForm, category: e.target.value as any})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option value="4-session">4-session</option>
                    <option value="8-session">8-session</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Sessions Count</label>
                  <input type="number" value={editForm.sessionsCount || 0} onChange={(e) => setEditForm({...editForm, sessionsCount: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Description (English)</label>
                  <textarea rows={2} value={editForm.description?.en || ''} onChange={(e) => setEditForm({...editForm, description: {...(editForm.description || {zh: ''}), en: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-charcoal uppercase">Description (Chinese)</label>
                  <textarea rows={2} value={editForm.description?.zh || ''} onChange={(e) => setEditForm({...editForm, description: {...(editForm.description || {en: ''}), zh: e.target.value}})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"></textarea>
                </div>
              </div>

              <ImageUpload 
                label="Progression Image"
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

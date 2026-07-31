'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Optional size limit (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setError(null)
    setIsUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      if (!data.url) {
        throw new Error('No URL returned from server')
      }

      onChange(data.url)
    } catch (err: any) {
      setError(err?.message || 'Failed to upload image')
      console.error('Image upload error:', err)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-charcoal uppercase">{label}</label>
      
      {value ? (
        <div className="relative inline-block w-full">
          <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
            <Image 
              src={encodeURI(value)} 
              alt="Uploaded preview" 
              fill 
              className="object-cover"
              unoptimized // Preview uploaded file directly
            />
          </div>
          <button
            onClick={handleRemove}
            type="button"
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-sm hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="mt-2 font-mono text-xs text-charcoal/60 break-all">{value}</div>
        </div>
      ) : (
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 hover:bg-gray-50 hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-primary/50 animate-spin mb-2" />
            ) : (
              <Upload className="w-8 h-8 text-charcoal/30 group-hover:text-primary/60 mb-2 transition-colors" />
            )}
            <span className="text-sm font-medium text-charcoal/70">
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </span>
            <span className="text-xs text-charcoal/40 mt-1">
              Supports JPG, PNG, WEBP (Max 5MB)
            </span>
          </button>
        </div>
      )}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}

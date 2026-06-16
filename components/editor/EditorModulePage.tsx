'use client'

import { useState } from 'react'
import { Upload, Play, Loader2, CheckCircle, AlertCircle, Copy, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export interface EditorModuleConfig {
  id: string
  title: string
  description: string
  iconColor: string
  icon: React.ElementType
  apiEndpoint: string
  inputFields?: {
    key: string
    label: string
    type: 'number' | 'text' | 'select'
    default: string | number
    options?: { value: string; label: string }[]
    min?: number
    max?: number
    step?: number
    unit?: string
  }[]
  outputLabel?: string
  outputFormat?: 'json' | 'text' | 'srt'
}

interface Result {
  success: boolean
  data?: unknown
  error?: string
}

export default function EditorModulePage({ config }: { config: EditorModuleConfig }) {
  const [videoPath, setVideoPath] = useState('')
  const [params, setParams] = useState<Record<string, string | number>>(() =>
    Object.fromEntries((config.inputFields ?? []).map(f => [f.key, f.default]))
  )
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const Icon = config.icon

  async function handleAnalyze() {
    if (!videoPath.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`http://localhost:8472${config.apiEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_path: videoPath, ...params }),
      })
      const data = await res.json()
      setResult({ success: res.ok, data: res.ok ? data : undefined, error: res.ok ? undefined : data.detail ?? 'Hata oluştu' })
    } catch {
      setResult({ success: false, error: 'Backend\'e bağlanılamadı. python main.py komutunu çalıştır.' })
    } finally {
      setLoading(false)
    }
  }

  function copyResult() {
    if (result?.data) {
      navigator.clipboard.writeText(JSON.stringify(result.data, null, 2))
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-4xl space-y-6">

        {/* Back */}
        <Link href="/dashboard/editor" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Video Editöre Dön
        </Link>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-purple-900/40 border border-purple-800 flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${config.iconColor}`} />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">{config.title}</h1>
            <p className="text-zinc-400 text-sm mt-1 leading-relaxed max-w-xl">{config.description}</p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
          {/* Video Path */}
          <div>
            <label className="block text-zinc-300 text-xs font-semibold mb-2">
              Video Dosya Yolu
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={videoPath}
                onChange={e => setVideoPath(e.target.value)}
                placeholder="C:/Users/.../video.mp4"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !videoPath.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {loading ? 'Analiz ediliyor...' : 'Analiz Et'}
              </button>
            </div>
          </div>

          {/* Custom Fields */}
          {config.inputFields && config.inputFields.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
              {config.inputFields.map(field => (
                <div key={field.key}>
                  <label className="block text-zinc-400 text-xs font-medium mb-1.5">
                    {field.label} {field.unit && <span className="text-zinc-600">({field.unit})</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={String(params[field.key])}
                      onChange={e => setParams(p => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      value={String(params[field.key])}
                      min={field.min}
                      max={field.max}
                      step={field.step ?? 1}
                      onChange={e => setParams(p => ({ ...p, [field.key]: parseFloat(e.target.value) }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(params[field.key])}
                      onChange={e => setParams(p => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className={`rounded-xl border p-5 space-y-3 ${result.success ? 'border-emerald-800 bg-emerald-950/30' : 'border-red-800 bg-red-950/30'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {result.success
                  ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                  : <AlertCircle className="w-4 h-4 text-red-400" />
                }
                <span className={`text-sm font-semibold ${result.success ? 'text-emerald-300' : 'text-red-300'}`}>
                  {result.success ? (config.outputLabel ?? 'Analiz Tamamlandı') : 'Hata'}
                </span>
              </div>
              {result.success && (
                <div className="flex items-center gap-2">
                  <button onClick={copyResult} className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                    Kopyala
                  </button>
                </div>
              )}
            </div>
            {result.error && (
              <p className="text-red-400 text-sm">{result.error}</p>
            )}
            {result.success && result.data !== undefined && (
              <pre className="text-xs text-zinc-300 bg-zinc-950/50 rounded-lg p-4 overflow-x-auto max-h-96 whitespace-pre-wrap">
                {JSON.stringify(result.data as Record<string, unknown>, null, 2)}
              </pre>
            )}
          </div>
        )}

        {/* Info box */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 flex items-start gap-3">
          <Upload className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-500 leading-relaxed">
            <p className="font-semibold text-zinc-400 mb-1">Nasıl çalışır?</p>
            <p>Video dosyasının tam yolunu gir. Analiz yerel Python backend&#39;inde (port 8472) çalışır.
            Sonuçlar JSON formatında döner ve Premiere Pro ile kullanılmak üzere kopyalanabilir.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

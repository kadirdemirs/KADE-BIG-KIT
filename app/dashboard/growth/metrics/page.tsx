'use client'

import { useState } from 'react'
import { BarChart2, ArrowLeft, TrendingUp, TrendingDown, Users, Eye, Heart, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const metricFields = [
  { key: 'followers', label: 'Takipçi / Abone', icon: Users, suffix: '', placeholder: '10000', color: 'text-violet-400' },
  { key: 'views', label: 'Ortalama Görüntüleme', icon: Eye, suffix: '', placeholder: '1500', color: 'text-sky-400' },
  { key: 'likes', label: 'Beğeni / Etkileşim', icon: Heart, suffix: '', placeholder: '450', color: 'text-pink-400' },
  { key: 'growth', label: 'Aylık Büyüme', icon: TrendingUp, suffix: '%', placeholder: '2.1', color: 'text-emerald-400' },
]

export default function MetricsPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [platform, setPlatform] = useState('youtube')
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function analyze() {
    setLoading(true)
    setError(null)
    setAnalysis(null)
    const summary = metricFields
      .filter(f => values[f.key])
      .map(f => `${f.label}: ${values[f.key]}${f.suffix}`)
      .join(', ')

    try {
      const res = await fetch('/api/generate/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ period: 'weekly', platform, metricsNote: summary }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setAnalysis(data.summary)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analiz yapılamadı')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-4 py-6 sm:px-6 lg:px-10 w-full max-w-5xl space-y-6">
        <Link href="/dashboard/growth" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Büyüme Analitiğine Dön
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-900/30 flex items-center justify-center flex-shrink-0">
            <BarChart2 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Metrik Takip</h1>
            <p className="text-zinc-400 text-sm">Metriklerini gir, AI büyüme analizi al</p>
          </div>
        </div>

        {/* Platform seçimi */}
        <div className="flex gap-2 flex-wrap">
          {['youtube', 'instagram', 'tiktok', 'x', 'linkedin'].map(p => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors capitalize',
                platform === p
                  ? 'bg-sky-900/40 border-sky-700 text-sky-300'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300'
              )}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Metrik girişleri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metricFields.map(field => {
            const Icon = field.icon
            const val = parseFloat(values[field.key] || '0')
            const filled = !!values[field.key]
            return (
              <div key={field.key} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${field.color}`} />
                  <span className="text-zinc-400 text-xs font-medium">{field.label}</span>
                  {filled && (
                    <span className="ml-auto text-xs text-emerald-400">✓</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="any"
                    value={values[field.key] || ''}
                    onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {field.suffix && <span className="text-zinc-500 text-sm">{field.suffix}</span>}
                </div>
                {filled && (
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${field.color.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min(100, (val / parseFloat(field.placeholder)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-zinc-600 text-[10px]">{val.toLocaleString('tr-TR')}{field.suffix}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={analyze}
          disabled={loading || Object.values(values).every(v => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Analiz ediliyor...' : 'AI Büyüme Analizi Al'}
        </button>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-sm">{error}</div>
        )}

        {analysis && (
          <div className="rounded-xl border border-sky-800/50 bg-sky-950/20 p-5 space-y-2">
            <div className="flex items-center gap-2 text-sky-300 font-semibold text-sm">
              <BarChart2 className="w-4 h-4" />
              Metrik Analizi
            </div>
            <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{analysis}</div>
          </div>
        )}

        {!analysis && !loading && (
          <div className="px-4 py-3 rounded-xl bg-sky-950/30 border border-sky-800/40 text-sky-300 text-xs leading-relaxed">
            Metrikleri gir ve AI analizi al. Platform bağlandıktan sonra veriler otomatik dolar —{' '}
            <Link href="/dashboard/growth/platforms" className="underline">Platform Bağlantıları</Link>
          </div>
        )}
      </div>
    </div>
  )
}

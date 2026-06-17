'use client'
import { useState } from 'react'
import { Brain, Loader2, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function InsightsPage() {
  const [loading, setLoading] = useState(false)
  const [period, setPeriod] = useState('weekly')
  const [insight, setInsight] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function generateInsight() {
    setLoading(true)
    setError(null)
    setInsight(null)
    try {
      const res = await fetch(`/api/generate/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ period }),
      })
      const data = await res.json()
      if (res.ok) {
        setInsight(data.summary ?? JSON.stringify(data, null, 2))
      } else {
        setError(data.error ?? 'Hata oluştu')
      }
    } catch {
      setError('İçgörü oluşturulamadı. Lütfen tekrar dene.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-3xl space-y-6">
        <Link href="/dashboard/growth" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Büyüme Analitiğine Dön
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-900/30 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Claude AI İçgörüler</h1>
            <p className="text-zinc-400 text-sm">Verilerini analiz et, büyüme önerileri al</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-2">Analiz Periyodu</label>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors"
            >
              <option value="daily">Günlük</option>
              <option value="weekly">Haftalık</option>
              <option value="monthly">Aylık</option>
            </select>
          </div>
          <button
            onClick={generateInsight}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Analiz ediliyor...' : 'İçgörü Oluştur'}
          </button>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-sm">{error}</div>
        )}

        {insight && (
          <div className="rounded-xl border border-purple-800/50 bg-purple-950/20 p-5 space-y-3">
            <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
              <Brain className="w-4 h-4" />
              Claude AI Analizi
            </div>
            <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{insight}</div>
          </div>
        )}
      </div>
    </div>
  )
}


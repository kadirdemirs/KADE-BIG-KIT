'use client'
import { useState } from 'react'
import { FileText, ArrowLeft, Loader2, Download } from 'lucide-react'
import Link from 'next/link'

export default function ReportsPage() {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function generateReport() {
    setLoading(true)
    setError(null)
    setReport(null)
    try {
      const res = await fetch('http://localhost:8472/reports/weekly', { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setReport(data.report ?? JSON.stringify(data, null, 2))
      } else {
        setError(data.detail ?? 'Rapor oluşturulamadı')
      }
    } catch {
      setError('Growth backend\'e bağlanılamadı (port 8472). python main.py komutunu çalıştır.')
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
          <div className="w-10 h-10 rounded-xl bg-emerald-900/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Haftalık Raporlar</h1>
            <p className="text-zinc-400 text-sm">Claude AI büyüme analizi ve eylem planı</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <button
            onClick={generateReport}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            {loading ? 'Rapor oluşturuluyor...' : 'Haftalık Rapor Oluştur'}
          </button>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-sm">{error}</div>
        )}

        {report && (
          <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-emerald-300 font-semibold text-sm">Haftalık Büyüme Raporu</span>
              <button
                onClick={() => navigator.clipboard.writeText(report)}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200"
              >
                <Download className="w-3.5 h-3.5" />
                Kopyala
              </button>
            </div>
            <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{report}</div>
          </div>
        )}
      </div>
    </div>
  )
}


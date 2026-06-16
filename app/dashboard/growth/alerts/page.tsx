'use client'
import { useState } from 'react'
import { Bell, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function AlertsPage() {
  const [threshold, setThreshold] = useState(20)
  const [saved, setSaved] = useState(false)

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-3xl space-y-6">
        <Link href="/dashboard/growth" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Büyüme Analitiğine Dön
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-900/30 flex items-center justify-center">
            <Bell className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Performans Uyarıları</h1>
            <p className="text-zinc-400 text-sm">Anomalileri otomatik algıla, bildirim al</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-5">
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-2">
              Düşüş Uyarısı Eşiği: <span className="text-amber-400">%{threshold}</span>
            </label>
            <input
              type="range"
              min={5} max={50} step={5}
              value={threshold}
              onChange={e => setThreshold(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
            <p className="text-zinc-600 text-xs mt-1">
              Bir metrik bu oranda düşerse uyarı tetiklenir.
            </p>
          </div>

          <button
            onClick={save}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-colors"
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            {saved ? 'Kaydedildi!' : 'Kaydet'}
          </button>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-zinc-400 text-sm font-semibold mb-3">Son Uyarılar</p>
          <div className="text-zinc-600 text-sm text-center py-6">
            Henüz uyarı yok. Platform bağlandıktan sonra burada görünür.
          </div>
        </div>
      </div>
    </div>
  )
}

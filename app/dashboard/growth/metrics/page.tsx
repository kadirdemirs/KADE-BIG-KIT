import { BarChart2, ArrowLeft, TrendingUp, Users, Eye, Heart } from 'lucide-react'
import Link from 'next/link'

const placeholderMetrics = [
  { label: 'Toplam Takipçi', value: '—', change: null, icon: Users },
  { label: 'Toplam İzlenme', value: '—', change: null, icon: Eye },
  { label: 'Beğeni Sayısı',  value: '—', change: null, icon: Heart },
  { label: 'Büyüme Oranı',  value: '—', change: null, icon: TrendingUp },
]

export default function MetricsPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-5xl space-y-6">
        <Link href="/dashboard/growth" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Büyüme Analitiğine Dön
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-900/30 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Metrik Takip</h1>
            <p className="text-zinc-400 text-sm">Zaman serisi verileri ve platform karşılaştırmaları</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {placeholderMetrics.map(metric => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-2">
                <Icon className="w-4 h-4 text-sky-400" />
                <p className="text-zinc-200 font-bold text-2xl">{metric.value}</p>
                <p className="text-zinc-500 text-xs">{metric.label}</p>
              </div>
            )
          })}
        </div>

        {/* Chart placeholder */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400 text-sm font-semibold mb-4">Son 30 Gün — Takipçi Büyümesi</p>
          <div className="h-48 flex items-center justify-center text-zinc-600 text-sm border border-dashed border-zinc-800 rounded-lg">
            Platform bağlandıktan sonra grafik burada görünür
          </div>
        </div>

        <div className="px-4 py-3 rounded-xl bg-sky-950/30 border border-sky-800/40 text-sky-300 text-xs leading-relaxed">
          Metrikleri görmek için önce <Link href="/dashboard/growth/platforms" className="underline">Platform Bağlantıları</Link> sayfasından hesaplarını bağla.
          Growth backend (port 8472) çalışıyor olmalı.
        </div>
      </div>
    </div>
  )
}


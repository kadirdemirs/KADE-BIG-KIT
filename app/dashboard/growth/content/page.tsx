import { MonitorPlay, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ContentPerformancePage() {
  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-5xl space-y-6">
        <Link href="/dashboard/growth" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Büyüme Analitiğine Dön
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-900/30 flex items-center justify-center">
            <MonitorPlay className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">İçerik Performansı</h1>
            <p className="text-zinc-400 text-sm">Her içerik parçasının bireysel performans metrikleri</p>
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-500 text-sm mb-4">İçerik listesi</p>
          <div className="h-48 flex items-center justify-center text-zinc-600 text-sm border border-dashed border-zinc-800 rounded-lg">
            Platform bağlandıktan ve ilk veri çekildikten sonra içerikler burada listelenir.
          </div>
        </div>
        <div className="px-4 py-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-300 text-xs leading-relaxed">
          Önce <Link href="/dashboard/growth/platforms" className="underline">Platform Bağlantıları</Link> sayfasından hesaplarını bağla.
          Growth backend (port 8472) çalışıyor olmalı.
        </div>
      </div>
    </div>
  )
}


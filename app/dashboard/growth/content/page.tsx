'use client'

import { useEffect, useState } from 'react'
import { MonitorPlay, ArrowLeft, TrendingUp, Eye, Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import CopyButton from '@/components/ui/CopyButton'
import { cn } from '@/lib/utils'

interface ContentItem {
  id: string
  tool: string
  output: string
  created_at: string
}

const toolLabels: Record<string, string> = {
  title: 'Başlık', script: 'Script', hook: 'Hook', hashtag: 'Hashtag',
  description: 'Açıklama', thumbnail: 'Thumbnail', 'viral-score': 'Viral Skor',
  repurpose: 'Dönüştür', thread: 'Thread', podcast: 'Podcast',
  blog: 'Blog', newsletter: 'Newsletter',
}

const toolColors: Record<string, string> = {
  title: 'text-orange-400 bg-orange-900/20 border-orange-800/40',
  script: 'text-emerald-400 bg-emerald-900/20 border-emerald-800/40',
  hook: 'text-yellow-400 bg-yellow-900/20 border-yellow-800/40',
  hashtag: 'text-pink-400 bg-pink-900/20 border-pink-800/40',
  description: 'text-blue-400 bg-blue-900/20 border-blue-800/40',
  thumbnail: 'text-violet-400 bg-violet-900/20 border-violet-800/40',
}

export default function ContentPerformancePage() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('tümü')

  useEffect(() => {
    fetch('/api/history')
      .then(r => r.json())
      .then(data => setItems(Array.isArray(data?.history) ? data.history : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const tools = ['tümü', ...Array.from(new Set(items.map(i => i.tool))).slice(0, 8)]
  const filtered = filter === 'tümü' ? items : items.filter(i => i.tool === filter)

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-4 py-6 sm:px-6 lg:px-10 w-full max-w-5xl space-y-6">
        <Link href="/dashboard/growth" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Büyüme Analitiğine Dön
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
            <MonitorPlay className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">İçerik Performansı</h1>
            <p className="text-zinc-400 text-sm">Ürettiğin içeriklerin geçmişi ve çıktıları</p>
          </div>
        </div>

        {/* Filter tabs */}
        {items.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tools.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors capitalize',
                  filter === t
                    ? 'bg-indigo-900/40 border-indigo-700 text-indigo-300'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:text-zinc-300'
                )}
              >
                {t === 'tümü' ? 'Tümü' : (toolLabels[t] ?? t)}
                {t !== 'tümü' && (
                  <span className="ml-1 text-zinc-600">{items.filter(i => i.tool === t).length}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="text-zinc-600 text-sm text-center py-12">Yükleniyor...</div>
        )}

        {!loading && items.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center space-y-3">
            <MonitorPlay className="w-8 h-8 text-zinc-700 mx-auto" />
            <p className="text-zinc-500 text-sm">Henüz içerik geçmişi yok.</p>
            <p className="text-zinc-600 text-xs">
              Araçları kullandıkça içerikler burada listelenir.
              {' '}<Link href="/dashboard/title" className="text-indigo-400 hover:text-indigo-300 underline">Başlık üretmeyi dene →</Link>
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.slice(0, 50).map(item => {
              const colorClass = toolColors[item.tool] ?? 'text-zinc-400 bg-zinc-800/30 border-zinc-700/50'
              const preview = item.output?.slice(0, 200) ?? ''
              return (
                <div key={item.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', colorClass)}>
                      {toolLabels[item.tool] ?? item.tool}
                    </span>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-zinc-600 text-[10px]">
                        {new Date(item.created_at).toLocaleDateString('tr-TR')}
                      </span>
                      <CopyButton text={item.output} />
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">{preview}</p>
                  {item.output.length > 200 && (
                    <p className="text-zinc-600 text-xs">+{item.output.length - 200} karakter daha</p>
                  )}
                </div>
              )
            })}
            {filtered.length > 50 && (
              <p className="text-zinc-600 text-xs text-center">
                {filtered.length - 50} içerik daha var —{' '}
                <Link href="/dashboard/history" className="text-indigo-400 underline">Tam geçmişe git</Link>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { Globe, Play, Radio, Tv2, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const platforms = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Play,
    color: 'text-red-400',
    bg: 'bg-red-900/20',
    border: 'border-red-800/50',
    description: 'YouTube Analytics API ile kanal metriklerini ve video performansını çek.',
    authEndpoint: 'http://localhost:8472/oauth/youtube/auth-url',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Radio,
    color: 'text-pink-400',
    bg: 'bg-pink-900/20',
    border: 'border-pink-800/50',
    description: 'Instagram Graph API ile gönderi, reel ve story metriklerini takip et.',
    authEndpoint: null,
    comingSoon: true,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Tv2,
    color: 'text-zinc-300',
    bg: 'bg-zinc-800',
    border: 'border-zinc-700',
    description: 'TikTok Video API ile içerik performansı ve büyüme verilerini analiz et.',
    authEndpoint: null,
    comingSoon: true,
  },
  {
    id: 'kick',
    name: 'Kick',
    icon: Tv2,
    color: 'text-green-400',
    bg: 'bg-green-900/20',
    border: 'border-green-800/50',
    description: 'Kick stream verilerini ve izleyici büyüme metriklerini entegre et.',
    authEndpoint: null,
    comingSoon: true,
  },
]

export default function PlatformsPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function connectPlatform(platform: typeof platforms[number]) {
    if (!platform.authEndpoint) return
    setLoading(platform.id)
    setError(null)
    try {
      const res = await fetch(platform.authEndpoint)
      const data = await res.json()
      if (data.auth_url) {
        window.open(data.auth_url, '_blank', 'width=600,height=700')
      } else {
        setError('Yetkilendirme URL\'i alınamadı. Backend\'in çalıştığından emin ol.')
      }
    } catch {
      setError('Growth backend\'e bağlanılamadı (port 8472). python main.py komutunu çalıştır.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-3xl space-y-6">
        <Link href="/dashboard/growth" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Büyüme Analitiğine Dön
        </Link>

        <div>
          <h1 className="text-white font-bold text-xl flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-400" />
            Platform Bağlantıları
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Hesaplarını bağla ve otomatik veri toplamayı başlat.</p>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {platforms.map(platform => {
            const Icon = platform.icon
            return (
              <div key={platform.id} className={`rounded-xl border ${platform.border} ${platform.bg} p-5 flex items-center gap-4`}>
                <div className="w-10 h-10 rounded-xl bg-zinc-900/50 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${platform.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-zinc-100 font-semibold text-sm">{platform.name}</h3>
                    {platform.comingSoon && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700">
                        Yakında
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs mt-0.5 leading-relaxed">{platform.description}</p>
                </div>
                {!platform.comingSoon && (
                  <button
                    onClick={() => connectPlatform(platform)}
                    disabled={loading === platform.id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium transition-colors flex-shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {loading === platform.id ? 'Bağlanıyor...' : 'Bağla'}
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


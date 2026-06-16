import Link from 'next/link'
import {
  Globe, BarChart2, Brain, MonitorPlay, Bell, FileText,
  ArrowRight, LineChart, TrendingUp, Users, Tv2, Play, Radio,
} from 'lucide-react'

const sections = [
  {
    id: 'platforms',
    title: 'Platform Bağlantıları',
    description: 'YouTube, Instagram, TikTok ve Kick hesaplarını OAuth2 ile bağla. Veri toplamayı başlat.',
    href: '/dashboard/growth/platforms',
    icon: Globe,
    color: 'text-teal-400',
    bg: 'bg-teal-900/30',
    tag: 'Kurulum',
  },
  {
    id: 'metrics',
    title: 'Metrik Takip',
    description: 'Takipçi, izlenme, beğeni ve etkileşim oranlarını zaman serisi grafiğiyle takip et.',
    href: '/dashboard/growth/metrics',
    icon: BarChart2,
    color: 'text-sky-400',
    bg: 'bg-sky-900/30',
    tag: 'Analiz',
  },
  {
    id: 'insights',
    title: 'Claude AI İçgörüler',
    description: 'Verilerini Claude AI ile analiz et. Günlük ve haftalık büyüme raporları, eylem planı önerileri al.',
    href: '/dashboard/growth/insights',
    icon: Brain,
    color: 'text-purple-400',
    bg: 'bg-purple-900/30',
    tag: 'AI',
  },
  {
    id: 'content',
    title: 'İçerik Performansı',
    description: 'Her video/post için görüntülenme, beğeni, yorum ve elde tutma oranlarını karşılaştır.',
    href: '/dashboard/growth/content',
    icon: MonitorPlay,
    color: 'text-indigo-400',
    bg: 'bg-indigo-900/30',
    tag: 'İçerik',
  },
  {
    id: 'alerts',
    title: 'Performans Uyarıları',
    description: 'Olağandışı düşüşleri veya ani yükselişleri otomatik algıla. Bildirim eşiklerini kendin ayarla.',
    href: '/dashboard/growth/alerts',
    icon: Bell,
    color: 'text-amber-400',
    bg: 'bg-amber-900/30',
    tag: 'Uyarı',
  },
  {
    id: 'reports',
    title: 'Haftalık Raporlar',
    description: 'Tüm platformları kapsayan haftalık PDF raporu. Claude AI büyüme yorumuyla birlikte.',
    href: '/dashboard/growth/reports',
    icon: FileText,
    color: 'text-emerald-400',
    bg: 'bg-emerald-900/30',
    tag: 'Rapor',
  },
]

const statCards = [
  { label: 'Bağlı Platform', value: '—', icon: Globe,         color: 'text-teal-400',   iconBg: 'bg-teal-900/30'   },
  { label: 'Toplam Takipçi', value: '—', icon: Users,         color: 'text-sky-400',    iconBg: 'bg-sky-900/30'    },
  { label: 'Son 7 Gün İzlenme', value: '—', icon: TrendingUp, color: 'text-emerald-400',iconBg: 'bg-emerald-900/30'},
  { label: 'Etkileşim Oranı', value: '—', icon: BarChart2,    color: 'text-purple-400', iconBg: 'bg-purple-900/30' },
]

const platforms = [
  { name: 'YouTube',   icon: Play,  color: 'text-red-400',    bg: 'bg-red-900/20',   connected: false },
  { name: 'Instagram', icon: Radio, color: 'text-pink-400',   bg: 'bg-pink-900/20',  connected: false },
  { name: 'TikTok',   icon: Tv2,   color: 'text-zinc-300',   bg: 'bg-zinc-800',     connected: false },
  { name: 'Kick',     icon: Tv2,   color: 'text-green-400',  bg: 'bg-green-900/20', connected: false },
]

export default function GrowthPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-7xl space-y-8">

        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden border border-emerald-900/50 bg-gradient-to-br from-emerald-950/80 to-zinc-950 px-8 py-10">
          <div className="absolute top-0 right-0 w-72 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
                <LineChart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Büyüme Analitiği</h1>
                <p className="text-emerald-300 text-xs">KADE Growth AI — 5 Platform Entegrasyonu</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-xl leading-relaxed mb-6">
              Tüm sosyal medya platformlarındaki büyümeni tek ekrandan takip et.
              Claude AI ile verilerini analiz et, haftalık raporlar ve eylem planları al.
            </p>
            <div className="flex flex-wrap gap-2">
              {platforms.map(p => {
                const PIcon = p.icon
                return (
                  <div key={p.name} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${p.bg} border border-zinc-800 text-xs`}>
                    <PIcon className={`w-3.5 h-3.5 ${p.color}`} />
                    <span className="text-zinc-400">{p.name}</span>
                    <span className={`text-[10px] ${p.connected ? 'text-emerald-400' : 'text-zinc-600'}`}>
                      {p.connected ? '● Bağlı' : '○ Bağlanmadı'}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex flex-col gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-zinc-200 font-bold text-xl">{stat.value}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Sections */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-zinc-200 font-bold text-sm">Büyüme Araçları</span>
            <span className="flex-1 h-px bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map(sec => {
              const Icon = sec.icon
              return (
                <Link
                  key={sec.id}
                  href={sec.href}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800/80 hover:border-zinc-700 p-5 flex flex-col gap-3 transition-all duration-150"
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${sec.bg}`}>
                      <Icon className={`w-4 h-4 ${sec.color}`} />
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sec.bg} ${sec.color}`}>
                      {sec.tag}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-zinc-100 font-semibold text-sm mb-1">{sec.title}</h2>
                    <p className="text-zinc-500 text-xs leading-relaxed">{sec.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <span className={`text-xs font-medium ${sec.color}`}>Aç</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-150" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

import Link from 'next/link'
import {
  Wand2, FileCode, Zap, RefreshCw, ArrowRight,
  Sparkles, Cpu, Activity, Clapperboard, LineChart,
  Scissors, Type, Flame, Music, Globe, Brain,
  FileText, Hash, TrendingUp, BarChart2, Bell,
  Video, Palette, Film, Captions,
} from 'lucide-react'

const modules = [
  {
    id: 'content',
    title: 'İçerik Stüdyosu',
    description: '48+ AI aracıyla YouTube, Instagram, TikTok ve diğer platformlar için içerik üret.',
    href: '/dashboard/title',
    icon: Sparkles,
    gradient: 'from-orange-400 to-amber-500',
    bg: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
    tag: '48 Araç',
    tagColor: 'text-orange-600 bg-orange-100 border-orange-200',
    tools: [
      { label: 'Başlık Üretici',  href: '/dashboard/title',      icon: Wand2     },
      { label: 'Script Yazarı',   href: '/dashboard/script',     icon: FileCode  },
      { label: 'Hook Jeneratörü', href: '/dashboard/hook',       icon: Zap       },
      { label: 'İçerik Dönüştür', href: '/dashboard/repurpose',  icon: RefreshCw },
      { label: 'Hashtag AI',      href: '/dashboard/hashtag',    icon: Hash      },
      { label: 'Viral Skor',      href: '/dashboard/viral-score',icon: TrendingUp},
    ],
  },
  {
    id: 'editor',
    title: 'Video Editör',
    description: 'Whisper AI, FFmpeg ve makine öğrenmesiyle videoları otomatik analiz et ve düzenle.',
    href: '/dashboard/editor',
    icon: Clapperboard,
    gradient: 'from-purple-400 to-violet-600',
    bg: 'from-purple-50 to-violet-50',
    border: 'border-purple-200',
    tag: '14 Modül',
    tagColor: 'text-purple-600 bg-purple-100 border-purple-200',
    tools: [
      { label: 'Sessizlik Kesici', href: '/dashboard/editor/silence-cutter', icon: Scissors  },
      { label: 'Transkript',       href: '/dashboard/editor/transcript',     icon: Type      },
      { label: 'Sahne Dedektörü', href: '/dashboard/editor/scene-detector', icon: Film      },
      { label: 'Viral Klip',      href: '/dashboard/editor/viral-clip',     icon: Flame     },
      { label: 'Beat Senkron',    href: '/dashboard/editor/beat-sync',      icon: Music     },
      { label: 'Otomatik Renk',   href: '/dashboard/editor/auto-color',     icon: Palette   },
    ],
  },
  {
    id: 'growth',
    title: 'Büyüme Analitiği',
    description: 'YouTube, Instagram, TikTok ve Kick verilerini bağla. Claude AI ile büyüme raporları al.',
    href: '/dashboard/growth',
    icon: LineChart,
    gradient: 'from-emerald-400 to-teal-600',
    bg: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    tag: '7 Araç',
    tagColor: 'text-emerald-600 bg-emerald-100 border-emerald-200',
    tools: [
      { label: 'Platform Bağla',   href: '/dashboard/growth/platforms', icon: Globe     },
      { label: 'Metrik Takip',     href: '/dashboard/growth/metrics',   icon: BarChart2 },
      { label: 'AI İçgörüler',     href: '/dashboard/growth/insights',  icon: Brain     },
      { label: 'İçerik Performans',href: '/dashboard/growth/content',   icon: Video     },
      { label: 'Uyarılar',         href: '/dashboard/growth/alerts',    icon: Bell      },
      { label: 'Haftalık Rapor',   href: '/dashboard/growth/reports',   icon: FileText  },
    ],
  },
]

const quickTools = [
  { label: 'Başlık Üretici',   href: '/dashboard/title',                      icon: Wand2,      color: 'text-orange-400', bg: 'bg-orange-900/30' },
  { label: 'Script Yazarı',    href: '/dashboard/script',                     icon: FileCode,   color: 'text-emerald-400',bg: 'bg-emerald-900/30'},
  { label: 'Hook Jeneratörü',  href: '/dashboard/hook',                       icon: Zap,        color: 'text-amber-400',  bg: 'bg-amber-900/30'  },
  { label: 'Viral Skor',       href: '/dashboard/viral-score',                icon: TrendingUp, color: 'text-red-400',    bg: 'bg-red-900/30'    },
  { label: 'Sessizlik Kesici', href: '/dashboard/editor/silence-cutter',      icon: Scissors,   color: 'text-purple-400', bg: 'bg-purple-900/30' },
  { label: 'Transkript',       href: '/dashboard/editor/transcript',          icon: Type,       color: 'text-violet-400', bg: 'bg-violet-900/30' },
  { label: 'Otomatik Altyazı', href: '/dashboard/editor/auto-captions',       icon: Captions,   color: 'text-indigo-400', bg: 'bg-indigo-900/30' },
  { label: 'AI İçgörüler',     href: '/dashboard/growth/insights',            icon: Brain,      color: 'text-emerald-400',bg: 'bg-emerald-900/30'},
  { label: 'Platform Bağla',   href: '/dashboard/growth/platforms',           icon: Globe,      color: 'text-teal-400',   bg: 'bg-teal-900/30'   },
  { label: 'Metrik Takip',     href: '/dashboard/growth/metrics',             icon: Activity,   color: 'text-sky-400',    bg: 'bg-sky-900/30'    },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-7xl space-y-10">

        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 px-8 py-10">
          <div className="absolute top-0 right-0 w-80 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-60 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300 text-[11px] font-semibold">KADE AI Platform v1.0</span>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
              Tek platformda{' '}
              <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                her şey
              </span>
            </h1>
            <p className="text-zinc-400 text-base mb-8 max-w-xl leading-relaxed">
              İçerik üretimi, video editlenmesi ve büyüme analitiği — üç güçlü modül, tek çatı altında.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              {[
                { icon: Sparkles, label: '48 İçerik Aracı',    color: 'text-orange-400' },
                { icon: Clapperboard, label: '14 Video Modülü', color: 'text-purple-400' },
                { icon: LineChart, label: '5 Platform Entegre', color: 'text-emerald-400' },
                { icon: Cpu, label: '60+ AI Model',             color: 'text-sky-400'    },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700">
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <span className="text-zinc-300 text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Ana Modül */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-zinc-200 font-bold text-sm">Platform Modülleri</span>
            <span className="flex-1 h-px bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {modules.map((mod) => {
              const ModIcon = mod.icon
              return (
                <div key={mod.id} className={`rounded-2xl border ${mod.border} bg-gradient-to-br ${mod.bg} p-5 flex flex-col gap-4`}>
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${mod.gradient} flex items-center justify-center shadow-md`}>
                      <ModIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${mod.tagColor}`}>
                      {mod.tag}
                    </span>
                  </div>

                  {/* Info */}
                  <div>
                    <h2 className="text-zinc-800 font-bold text-sm mb-1">{mod.title}</h2>
                    <p className="text-zinc-500 text-xs leading-relaxed">{mod.description}</p>
                  </div>

                  {/* Tool pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {mod.tools.map((tool) => {
                      const TIcon = tool.icon
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/70 hover:bg-white border border-white/80 hover:border-zinc-200 text-zinc-600 hover:text-zinc-800 text-[11px] font-medium transition-all duration-100 shadow-sm"
                        >
                          <TIcon className="w-3 h-3" />
                          {tool.label}
                        </Link>
                      )
                    })}
                  </div>

                  {/* CTA */}
                  <Link
                    href={mod.href}
                    className={`flex items-center justify-between mt-auto pt-3 border-t border-white/50 text-xs font-semibold transition-opacity hover:opacity-80 ${mod.id === 'editor' ? 'text-purple-600' : mod.id === 'growth' ? 'text-emerald-600' : 'text-orange-600'}`}
                  >
                    <span>Modüle Git</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Hızlı Erişim */}
        <div className="pb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-zinc-200 font-bold text-sm">Hızlı Erişim</span>
            <span className="flex-1 h-px bg-zinc-800" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickTools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 hover:shadow-sm transition-all duration-150 p-4 flex flex-col gap-3"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tool.bg}`}>
                    <Icon className={`w-4 h-4 ${tool.color}`} />
                  </div>
                  <span className="text-zinc-300 font-semibold text-xs leading-tight">{tool.label}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 mt-auto transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

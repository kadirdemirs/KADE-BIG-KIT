import Link from 'next/link'
import {
  Scissors, Type, Music, Film, Palette, Captions,
  ZoomIn, Flame, Mic2, Repeat, ShieldAlert, List,
  Maximize, Video, ArrowRight, Clapperboard, Cpu,
  Info,
} from 'lucide-react'

const modules = [
  {
    id: 'silence-cutter',
    label: 'Sessizlik Kesici',
    description: 'Sessiz bölgeleri tespit eder, belirlediğin eşiğe göre kesim noktaları önerir. Premiere Pro\'da tek tıkla uygula.',
    icon: Scissors,
    href: '/dashboard/editor/silence-cutter',
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100 hover:border-red-200',
    tag: 'Temel',
  },
  {
    id: 'transcript',
    label: 'Whisper Transkript',
    description: 'OpenAI Whisper ile Türkçe/İngilizce transkript ve zaman damgaları üret. Altyazı ve chapter\'a dönüştür.',
    icon: Type,
    href: '/dashboard/editor/transcript',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100 hover:border-violet-200',
    tag: 'AI',
  },
  {
    id: 'beat-sync',
    label: 'Beat Senkron',
    description: 'Müzik ritimlerini tespit et. Video kesimlerini otomatik olarak beat\'lere senkronize et.',
    icon: Music,
    href: '/dashboard/editor/beat-sync',
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    border: 'border-pink-100 hover:border-pink-200',
    tag: 'Ses',
  },
  {
    id: 'scene-detector',
    label: 'Sahne Dedektörü',
    description: 'Renk ve içerik analizi ile sahne değişimlerini bul. Otomatik kesim noktaları oluştur.',
    icon: Film,
    href: '/dashboard/editor/scene-detector',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100 hover:border-blue-200',
    tag: 'Görüntü',
  },
  {
    id: 'auto-color',
    label: 'Otomatik Renk',
    description: 'Renk tonu, doygunluk ve ses dengesini analiz et. LUT önerileri ile renk gradingini hızlandır.',
    icon: Palette,
    href: '/dashboard/editor/auto-color',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100 hover:border-orange-200',
    tag: 'Görsel',
  },
  {
    id: 'auto-captions',
    label: 'Otomatik Altyazı',
    description: 'Transkriptten SRT formatında altyazı dosyası oluştur. Türkçe karakter desteğiyle.',
    icon: Captions,
    href: '/dashboard/editor/auto-captions',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    border: 'border-teal-100 hover:border-teal-200',
    tag: 'Altyazı',
  },
  {
    id: 'auto-zoom',
    label: 'Otomatik Zoom',
    description: 'Konuşmacı ses yoğunluğuna göre zoom keyframe noktaları öner. Dinamik çekim hissi ver.',
    icon: ZoomIn,
    href: '/dashboard/editor/auto-zoom',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    border: 'border-sky-100 hover:border-sky-200',
    tag: 'Hareket',
  },
  {
    id: 'viral-clip',
    label: 'Viral Klip Bulucu',
    description: 'Video içindeki en viral potansiyelli segmentleri tespit et. Reels/Shorts için hazır klipler.',
    icon: Flame,
    href: '/dashboard/editor/viral-clip',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100 hover:border-amber-200',
    tag: 'Viral',
  },
  {
    id: 'podcast-mode',
    label: 'Podcast Modu',
    description: 'Konuşmacıları ayır, diyalog segmentlerini tanı. Podcast editlemesi için optimize et.',
    icon: Mic2,
    href: '/dashboard/editor/podcast-mode',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    border: 'border-purple-100 hover:border-purple-200',
    tag: 'Ses',
  },
  {
    id: 'repeat-detector',
    label: 'Tekrar Dedektörü',
    description: 'Tekrarlanan çekimleri ve benzer segmentleri bul. Sadece en iyi çekimi tut.',
    icon: Repeat,
    href: '/dashboard/editor/repeat-detector',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100 hover:border-indigo-200',
    tag: 'Analiz',
  },
  {
    id: 'profanity-filter',
    label: 'Küfür Filtresi',
    description: 'Uygunsuz içeriği transkriptten tespit et ve zaman damgalarını işaretle. Bip sesi ekle.',
    icon: ShieldAlert,
    href: '/dashboard/editor/profanity-filter',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100 hover:border-rose-200',
    tag: 'Güvenlik',
  },
  {
    id: 'auto-chapters',
    label: 'Otomatik Bölümler',
    description: 'İçerik konularına göre chapter markerları oluştur. YouTube chapter formatında export.',
    icon: List,
    href: '/dashboard/editor/auto-chapters',
    color: 'text-lime-600',
    bg: 'bg-lime-50',
    border: 'border-lime-100 hover:border-lime-200',
    tag: 'Yapı',
  },
  {
    id: 'auto-resize',
    label: 'Otomatik Boyutlandırma',
    description: 'YouTube (16:9), Reels (9:16), TikTok ve diğer formatlar için boyutlandırma önerileri.',
    icon: Maximize,
    href: '/dashboard/editor/auto-resize',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100 hover:border-cyan-200',
    tag: 'Format',
  },
  {
    id: 'broll-suggest',
    label: 'B-Roll Öneri',
    description: 'Transkript içeriğine göre B-roll çekim anlarını belirle. Hangi sahneye ne gerektiğini göster.',
    icon: Video,
    href: '/dashboard/editor/broll-suggest',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100 hover:border-emerald-200',
    tag: 'B-Roll',
  },
]

export default function EditorPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950">
      <div className="px-6 py-8 lg:px-10 w-full max-w-7xl space-y-8">

        {/* Header */}
        <div className="relative rounded-2xl overflow-hidden border border-purple-900/50 bg-gradient-to-br from-purple-950/80 to-zinc-950 px-8 py-10">
          <div className="absolute top-0 right-0 w-72 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-900/50">
                <Clapperboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Video Editör</h1>
                <p className="text-purple-300 text-xs">KADE AutoEdit AI — 14 Analiz Modülü</p>
              </div>
            </div>
            <p className="text-zinc-400 text-sm max-w-xl leading-relaxed mb-6">
              Videolarını yükle, analiz et ve Premiere Pro için hazır kesim noktaları, altyazılar ve öneriler al.
              Yerel Python sunucusu üzerinde çalışır — verilen hiçbir veri buluta gönderilmez.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Cpu, label: 'Whisper AI (Yerel)' },
                { icon: Cpu, label: 'FFmpeg İşleme' },
                { icon: Cpu, label: 'OpenCV Analiz' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/40 border border-purple-800 text-purple-300 text-xs">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backend Notice */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-950/40 border border-amber-800/50">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-300 text-xs leading-relaxed">
            Video Editör modülü çalışmak için yerel Python backend&#39;e ihtiyaç duyar.
            <code className="ml-1 px-1.5 py-0.5 rounded bg-amber-900/50 font-mono text-[10px]">cd backend && python main.py</code>
            komutunu çalıştır, ardından modülleri kullanmaya başla.
          </p>
        </div>

        {/* Modules Grid */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-zinc-200 font-bold text-sm">Analiz Modülleri</span>
            <span className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-500 text-xs">{modules.length} modül</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => {
              const Icon = mod.icon
              return (
                <Link
                  key={mod.id}
                  href={mod.href}
                  className={`group rounded-xl border ${mod.border} bg-zinc-900 hover:bg-zinc-800/80 p-5 flex flex-col gap-3 transition-all duration-150`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${mod.bg}`}>
                      <Icon className={`w-4 h-4 ${mod.color}`} />
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${mod.bg} ${mod.color}`}>
                      {mod.tag}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-zinc-100 font-semibold text-sm mb-1">{mod.label}</h2>
                    <p className="text-zinc-500 text-xs leading-relaxed">{mod.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                    <span className={`text-xs font-medium ${mod.color}`}>Modülü Aç</span>
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

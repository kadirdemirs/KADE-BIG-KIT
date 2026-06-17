'use client'

import { useState } from 'react'
import { useModel } from '@/lib/context/ModelContext'
import TopBar from '@/components/layout/TopBar'
import ModelSelector from '@/components/layout/ModelSelector'
import LoadingState from '@/components/ui/LoadingState'
import CopyButton from '@/components/ui/CopyButton'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

const LANGUAGES = [
  'İngilizce', 'İspanyolca', 'Fransızca', 'Almanca', 'Portekizce',
  'İtalyanca', 'Japonca', 'Korece', 'Arapça', 'Rusça',
  'Hollandaca', 'Hintçe', 'Endonezce', 'Lehçe', 'İsveççe',
]

const SOURCE_LANGS = ['Türkçe', 'İngilizce', 'Otomatik Algıla']

export default function TranslatePage() {
  const { selectedModel, setSelectedModel } = useModel()
  const [content, setContent] = useState('')
  const [sourceLang, setSourceLang] = useState('Türkçe')
  const [targetLang, setTargetLang] = useState('İngilizce')
  const [includePronunciation, setIncludePronunciation] = useState(false)
  const [includeCulturalNotes, setIncludeCulturalNotes] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handleTranslate() {
    if (!content.trim() || !targetLang) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/generate/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          sourceLang,
          targetLang,
          model: selectedModel,
          includePronunciation,
          includeTimingNotes: false,
          includeCulturalNotes,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data.translation ?? data.content ?? JSON.stringify(data))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Çeviri yapılamadı')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Çeviri & Yerelleştirme" description="İçeriğini dünya dillerine çevir" />
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-3xl mx-auto space-y-5">

          {/* Dil seçimi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5">Kaynak Dil</label>
              <div className="flex gap-1.5 flex-wrap">
                {SOURCE_LANGS.map(l => (
                  <button key={l} onClick={() => setSourceLang(l)}
                    className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                      sourceLang === l
                        ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                    )}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5">Hedef Dil</label>
              <select
                value={targetLang}
                onChange={e => setTargetLang(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-violet-500 transition-colors"
              >
                {LANGUAGES.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          {/* İçerik girişi */}
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5">
              Çevrilecek İçerik
              <span className="ml-2 text-zinc-600">{content.length} karakter</span>
            </label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={8}
              placeholder="Çevirmek istediğin metni buraya yapıştır..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 resize-none transition-colors"
            />
          </div>

          {/* Seçenekler */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setIncludePronunciation(v => !v)}
                className={`relative w-8 h-4 rounded-full transition-colors ${includePronunciation ? 'bg-violet-500' : 'bg-zinc-700'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${includePronunciation ? 'translate-x-4' : ''}`} />
              </div>
              <span className="text-zinc-400 text-xs">Telaffuz rehberi ekle</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setIncludeCulturalNotes(v => !v)}
                className={`relative w-8 h-4 rounded-full transition-colors ${includeCulturalNotes ? 'bg-violet-500' : 'bg-zinc-700'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${includeCulturalNotes ? 'translate-x-4' : ''}`} />
              </div>
              <span className="text-zinc-400 text-xs">Kültürel notlar ekle</span>
            </label>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <ModelSelector value={selectedModel} onChange={setSelectedModel} />
            <button
              onClick={handleTranslate}
              disabled={loading || !content.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            >
              <Languages className="w-4 h-4" />
              {loading ? 'Çevriliyor...' : 'Çevir'}
            </button>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">{error}</div>
          )}

          {loading && <LoadingState model={selectedModel} />}

          {result && !loading && (
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-violet-300 font-semibold text-sm">
                  <Languages className="w-4 h-4" />
                  {sourceLang} → {targetLang}
                </div>
                <CopyButton text={result} />
              </div>
              <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

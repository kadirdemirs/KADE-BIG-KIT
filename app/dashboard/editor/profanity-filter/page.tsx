'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { ShieldAlert } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'profanity-filter',
      title: 'Küfür Filtresi',
      description: 'Transkript üzerinden uygunsuz içeriği tespit eder. Zaman damgalarını işaretler. Bip sesi uygulamak için Premiere Pro\'ya hazır veri üretir.',
      iconColor: 'text-rose-400',
      icon: ShieldAlert,
      apiEndpoint: '/profanity-filter',
      outputLabel: 'Uygunsuz İçerik Tarandı',
      inputFields: [
        { key: 'language', label: 'Dil', type: 'select', default: 'tr', options: [
          { value: 'tr', label: 'Türkçe' },
          { value: 'en', label: 'İngilizce' },
          { value: 'both', label: 'İkisi de' },
        ]},
        { key: 'action', label: 'İşlem', type: 'select', default: 'mark', options: [
          { value: 'mark', label: 'Sadece İşaretle' },
          { value: 'mute', label: 'Sustur (FFmpeg)' },
        ]},
      ],
    }} />
  )
}


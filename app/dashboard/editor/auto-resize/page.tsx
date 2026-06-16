'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Maximize } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'auto-resize',
      title: 'Otomatik Boyutlandırma',
      description: 'Farklı platformlar için aspect ratio analizleri ve boyutlandırma önerileri. Konuşmacı pozisyonuna göre kırpma noktaları belirler.',
      iconColor: 'text-cyan-400',
      icon: Maximize,
      apiEndpoint: '/auto-resize',
      outputLabel: 'Boyutlandırma Analizi Tamamlandı',
      inputFields: [
        { key: 'target_format', label: 'Hedef Format', type: 'select', default: '9:16', options: [
          { value: '9:16', label: '9:16 — Reels/TikTok/Shorts' },
          { value: '1:1', label: '1:1 — Instagram Kare' },
          { value: '4:5', label: '4:5 — Instagram Dikey' },
          { value: '16:9', label: '16:9 — YouTube Standart' },
        ]},
      ],
    }} />
  )
}


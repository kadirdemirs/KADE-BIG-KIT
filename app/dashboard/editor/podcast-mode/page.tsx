'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Mic2 } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'podcast-mode',
      title: 'Podcast Modu',
      description: 'Konuşmacıları ayır ve diyalog segmentlerini tanı. Çok konuşmacılı podcast ve röportajlar için optimize edilmiş analiz.',
      iconColor: 'text-purple-400',
      icon: Mic2,
      apiEndpoint: '/podcast-mode',
      outputLabel: 'Konuşmacılar Ayrıştırıldı',
      inputFields: [
        { key: 'num_speakers', label: 'Konuşmacı Sayısı (0=otomatik)', type: 'number', default: 0, min: 0, max: 10, step: 1 },
      ],
    }} />
  )
}


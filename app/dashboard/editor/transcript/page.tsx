'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Type } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'transcript',
      title: 'Whisper Transkript',
      description: 'OpenAI Whisper ile videodan konuşmaları yazıya döker. Zaman damgalı transkript, altyazı ve chapter verisi üretir.',
      iconColor: 'text-violet-400',
      icon: Type,
      apiEndpoint: '/transcript',
      outputLabel: 'Transkript Oluşturuldu',
      inputFields: [
        { key: 'language', label: 'Dil', type: 'select', default: 'tr', options: [
          { value: 'tr', label: 'Türkçe' },
          { value: 'en', label: 'İngilizce' },
          { value: 'auto', label: 'Otomatik Algıla' },
        ]},
        { key: 'model_size', label: 'Model Boyutu', type: 'select', default: 'base', options: [
          { value: 'tiny', label: 'Tiny (Hızlı)' },
          { value: 'base', label: 'Base (Dengeli)' },
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium (Hassas)' },
        ]},
      ],
    }} />
  )
}


'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Captions } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'auto-captions',
      title: 'Otomatik Altyazı',
      description: 'Whisper transkriptinden SRT formatında altyazı dosyası oluşturur. Türkçe karakter ve imla desteği ile.',
      iconColor: 'text-teal-400',
      icon: Captions,
      apiEndpoint: '/auto-captions',
      outputLabel: 'Altyazı (SRT) Oluşturuldu',
      inputFields: [
        { key: 'language', label: 'Dil', type: 'select', default: 'tr', options: [
          { value: 'tr', label: 'Türkçe' },
          { value: 'en', label: 'İngilizce' },
        ]},
        { key: 'max_chars_per_line', label: 'Satır Başına Max Karakter', type: 'number', default: 42, min: 20, max: 80, step: 2 },
      ],
    }} />
  )
}


'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Music } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'beat-sync',
      title: 'Beat Senkron',
      description: 'Ses dosyasındaki ritim ve beat noktalarını tespit eder. Video kesimlerini müzikle senkronize etmek için zaman damgaları üretir.',
      iconColor: 'text-pink-400',
      icon: Music,
      apiEndpoint: '/beat-sync',
      outputLabel: 'Beat Noktaları Bulundu',
      inputFields: [
        { key: 'bpm_override', label: 'BPM (0 = otomatik)', type: 'number', default: 0, min: 0, max: 250, step: 1, unit: 'BPM' },
        { key: 'sensitivity', label: 'Hassasiyet', type: 'select', default: 'medium', options: [
          { value: 'low', label: 'Düşük' },
          { value: 'medium', label: 'Orta' },
          { value: 'high', label: 'Yüksek' },
        ]},
      ],
    }} />
  )
}


'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Video } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'broll-suggest',
      title: 'B-Roll Öneri',
      description: 'Transkript içeriğini analiz ederek B-roll çekim anlarını belirler. Her segment için uygun çekim türü ve anahtar kelime önerisi yapar.',
      iconColor: 'text-emerald-400',
      icon: Video,
      apiEndpoint: '/broll-suggest',
      outputLabel: 'B-Roll Noktaları Belirlendi',
      inputFields: [
        { key: 'language', label: 'Dil', type: 'select', default: 'tr', options: [
          { value: 'tr', label: 'Türkçe' },
          { value: 'en', label: 'İngilizce' },
        ]},
        { key: 'min_segment_duration', label: 'Min. Segment Süresi', type: 'number', default: 3.0, min: 1.0, max: 15.0, step: 0.5, unit: 'sn' },
      ],
    }} />
  )
}


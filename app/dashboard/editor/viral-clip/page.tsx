'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Flame } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'viral-clip',
      title: 'Viral Klip Bulucu',
      description: 'Ses yoğunluğu, transkript analizi ve tempo değişimlerini birleştirerek en viral potansiyelli segmentleri tespit eder.',
      iconColor: 'text-amber-400',
      icon: Flame,
      apiEndpoint: '/viral-detector',
      outputLabel: 'Viral Segmentler Bulundu',
      inputFields: [
        { key: 'min_clip_duration', label: 'Min. Klip Süresi', type: 'number', default: 15, min: 5, max: 60, step: 5, unit: 'sn' },
        { key: 'max_clip_duration', label: 'Max. Klip Süresi', type: 'number', default: 60, min: 15, max: 180, step: 5, unit: 'sn' },
        { key: 'top_n', label: 'Kaç Klip Önerilsin', type: 'number', default: 5, min: 1, max: 20, step: 1 },
      ],
    }} />
  )
}


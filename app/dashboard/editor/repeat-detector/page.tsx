'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Repeat } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'repeat-detector',
      title: 'Tekrar Dedektörü',
      description: 'Birden fazla çekilen sahneleri ve benzer segmentleri tespit eder. Sadece en kaliteli versiyonunu işaretler.',
      iconColor: 'text-indigo-400',
      icon: Repeat,
      apiEndpoint: '/repeat-detector',
      outputLabel: 'Tekrarlanan Segmentler Bulundu',
      inputFields: [
        { key: 'similarity_threshold', label: 'Benzerlik Eşiği', type: 'number', default: 0.85, min: 0.5, max: 0.99, step: 0.05, unit: '%' },
        { key: 'min_duration', label: 'Min. Segment Süresi', type: 'number', default: 2.0, min: 0.5, max: 10.0, step: 0.5, unit: 'sn' },
      ],
    }} />
  )
}


'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Palette } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'auto-color',
      title: 'Otomatik Renk Analizi',
      description: 'Videonun renk histogramı, ortalama parlaklık ve ses dengesini analiz eder. LUT önerileri ve renk grading tavsiyeleri üretir.',
      iconColor: 'text-orange-400',
      icon: Palette,
      apiEndpoint: '/auto-color',
      outputLabel: 'Renk Analizi Tamamlandı',
      inputFields: [
        { key: 'sample_rate', label: 'Örnekleme Sıklığı', type: 'number', default: 30, min: 5, max: 120, step: 5, unit: 'kare/sn' },
      ],
    }} />
  )
}


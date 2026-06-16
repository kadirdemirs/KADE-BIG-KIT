'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { ZoomIn } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'auto-zoom',
      title: 'Otomatik Zoom',
      description: 'Konuşmacı ses yoğunluğuna ve vurgu noktalarına göre zoom keyframe noktaları önerir. Dinamik çekim hissi katar.',
      iconColor: 'text-sky-400',
      icon: ZoomIn,
      apiEndpoint: '/auto-zoom',
      outputLabel: 'Zoom Noktaları Hesaplandı',
      inputFields: [
        { key: 'zoom_factor', label: 'Zoom Faktörü', type: 'number', default: 1.15, min: 1.05, max: 2.0, step: 0.05, unit: 'x' },
        { key: 'min_zoom_duration', label: 'Min. Zoom Süresi', type: 'number', default: 1.5, min: 0.5, max: 5.0, step: 0.5, unit: 'sn' },
      ],
    }} />
  )
}


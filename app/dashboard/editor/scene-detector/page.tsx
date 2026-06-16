'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Film } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'scene-detector',
      title: 'Sahne Dedektörü',
      description: 'OpenCV ile kare farklarını analiz eder ve sahne değişim anlarını tespit eder. Her sahne için küçük resim önizlemesi sağlar.',
      iconColor: 'text-blue-400',
      icon: Film,
      apiEndpoint: '/scene-detect',
      outputLabel: 'Sahneler Tespit Edildi',
      inputFields: [
        { key: 'threshold', label: 'Değişim Eşiği', type: 'number', default: 30, min: 5, max: 100, step: 5, unit: '%' },
        { key: 'min_scene_length', label: 'Min. Sahne Uzunluğu', type: 'number', default: 1.0, min: 0.5, max: 10.0, step: 0.5, unit: 'sn' },
      ],
    }} />
  )
}


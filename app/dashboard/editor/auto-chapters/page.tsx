'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { List } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'auto-chapters',
      title: 'Otomatik Bölümler',
      description: 'Transkript ve içerik analizine göre konu geçişlerini tespit eder. YouTube chapter formatında başlıklar ve zaman damgaları üretir.',
      iconColor: 'text-lime-500',
      icon: List,
      apiEndpoint: '/auto-chapters',
      outputLabel: 'Bölümler Oluşturuldu',
      inputFields: [
        { key: 'min_chapter_duration', label: 'Min. Bölüm Süresi', type: 'number', default: 60, min: 30, max: 600, step: 30, unit: 'sn' },
        { key: 'max_chapters', label: 'Max. Bölüm Sayısı', type: 'number', default: 15, min: 3, max: 50, step: 1 },
      ],
    }} />
  )
}


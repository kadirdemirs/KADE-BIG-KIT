'use client'
import EditorModulePage from '@/components/editor/EditorModulePage'
import { Scissors } from 'lucide-react'

export default function Page() {
  return (
    <EditorModulePage config={{
      id: 'silence-cutter',
      title: 'Sessizlik Kesici',
      description: 'Videodaki sessiz bölgeleri tespit eder. Belirlediğin dB eşiğinin altındaki alanları işaretler ve kesim noktaları önerir.',
      iconColor: 'text-red-400',
      icon: Scissors,
      apiEndpoint: '/silence-cut',
      outputLabel: 'Sessizlik Noktaları Bulundu',
      inputFields: [
        { key: 'threshold_db', label: 'Sessizlik Eşiği', type: 'number', default: -40, min: -70, max: -10, step: 5, unit: 'dB' },
        { key: 'min_silence_ms', label: 'Minimum Sessizlik', type: 'number', default: 500, min: 100, max: 5000, step: 100, unit: 'ms' },
        { key: 'padding_ms', label: 'Kenar Boşluğu', type: 'number', default: 100, min: 0, max: 500, step: 50, unit: 'ms' },
      ],
    }} />
  )
}


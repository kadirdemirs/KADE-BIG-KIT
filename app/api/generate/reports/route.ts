import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/ai/provider'
import { rateLimit, getRateLimitKey } from '@/lib/rateLimit'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getRateLimitKey(req))
  if (!allowed) return NextResponse.json({ error: 'Çok fazla istek. 1 dakika bekle.' }, { status: 429 })

  try {
    const body = await req.json().catch(() => ({}))
    const period = body.period ?? 'weekly'
    const periodLabel = period === 'daily' ? 'günlük' : period === 'monthly' ? 'aylık' : 'haftalık'

    const prompt = `Sosyal medya içerik üreticisi için detaylı ${periodLabel} büyüme raporu hazırla. Türkçe yaz.

Rapor şu bölümleri içermeli:

## ${periodLabel.charAt(0).toUpperCase() + periodLabel.slice(1)} Büyüme Raporu

### Performans Özeti
- Bu dönem genel performans değerlendirmesi (3-4 cümle)

### Güçlü Yönler (En Az 3)
- Her biri için kısa açıklama ve neden önemli olduğu

### Gelişim Alanları (2-3 Madde)
- Somut ve uygulanabilir önerilerle

### Bu Dönem Eylem Planı
1. Öncelikli eylem
2. İkincil eylem
3. Uzun vadeli adım

### Büyüme Tahmini
Mevcut trendle devam edilirse önümüzdeki dönem için beklentiler

Veri yoksa genel en iyi pratiklere dayalı gerçekçi öneriler sun.`

    const result = await generateContent({
      prompt,
      model: 'groq-llama-70b',
      systemPrompt: 'Sen sosyal medya büyüme analistlerindensin. Türkçe, veri odaklı ve uygulanabilir raporlar yazıyorsun.',
      maxTokens: 1800,
    })

    return NextResponse.json({ report: result.content, model: result.model })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rapor oluşturulamadı'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/ai/provider'
import { rateLimit, getRateLimitKey } from '@/lib/rateLimit'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  const { allowed } = rateLimit(getRateLimitKey(req))
  if (!allowed) return NextResponse.json({ error: 'Çok fazla istek. 1 dakika bekle.' }, { status: 429 })

  try {
    const { period = 'weekly', platform } = await req.json()

    const platformNote = platform ? `Platform: ${platform}. ` : ''
    const periodLabel = period === 'daily' ? 'günlük' : period === 'monthly' ? 'aylık' : 'haftalık'

    const prompt = `${platformNote}Sosyal medya içerik üreticisi için ${periodLabel} büyüme analizi yap ve Türkçe olarak şunları ver:

1. **En Güçlü 3 Büyüme Alanı** — Bu dönem neler iyi gitti?
2. **2 Kritik Zayıflık** — Dikkat edilmesi gereken noktalar
3. **Bu Hafta İçin 3 Somut Eylem** — Hemen yapılabilecek adımlar
4. **Büyüme Özeti** — 2-3 cümle genel değerlendirme

Veriler olmadan genel en iyi pratiklere dayalı öneriler sun.`

    const result = await generateContent({
      prompt,
      model: 'groq-llama-70b',
      systemPrompt: 'Sen deneyimli bir sosyal medya büyüme stratejistisin. Türkçe, net ve uygulanabilir öneriler veriyorsun.',
      maxTokens: 1200,
    })

    return NextResponse.json({ summary: result.content, model: result.model })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'İçgörü oluşturulamadı'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

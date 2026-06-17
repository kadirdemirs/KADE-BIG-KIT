import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Sunucu TTS devre dışı. Dublaj sayfasındaki tarayıcı ses sentezi kullanılıyor.' },
    { status: 503 }
  )
}

import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const PROJECT_REF = 'dizcwzfuxoaeeeogzvpt'

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS content_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tool        TEXT NOT NULL,
  model       TEXT NOT NULL,
  input_data  JSONB,
  output      TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='content_history' AND policyname='Users can view their own history') THEN
    CREATE POLICY "Users can view their own history" ON content_history FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='content_history' AND policyname='Users can insert their own history') THEN
    CREATE POLICY "Users can insert their own history" ON content_history FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='content_history' AND policyname='Users can delete their own history') THEN
    CREATE POLICY "Users can delete their own history" ON content_history FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS content_history_user_id_idx ON content_history(user_id);
CREATE INDEX IF NOT EXISTS content_history_created_at_idx ON content_history(created_at DESC);
`

export async function GET() {
  const pat = process.env.SUPABASE_PAT

  if (!pat) {
    return NextResponse.json({
      ok: false,
      adim: [
        '1. supabase.com/dashboard/account/tokens adresine git',
        '2. "Generate new token" ile bir token oluştur (isim: kadeai-setup)',
        '3. .env.local dosyasına ekle: SUPABASE_PAT=sbp_...',
        '4. npm run dev yeniden başlat',
        '5. Bu sayfayı tekrar aç: http://localhost:3000/api/setup',
      ]
    }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: SCHEMA_SQL }),
      }
    )

    const body = await res.json()

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: body }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      mesaj: 'content_history tablosu ve politikalar oluşturuldu. Platform hazır!',
      sonuc: body,
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: e instanceof Error ? e.message : 'Bağlantı hatası'
    }, { status: 500 })
  }
}

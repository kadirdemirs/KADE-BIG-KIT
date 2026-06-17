const ENV_KEYS = [
  'GROQ_API_KEY',
  'CEREBRAS_API_KEY',
  'OPENROUTER_API_KEY',
  'MISTRAL_API_KEY',
  'GEMINI_API_KEY',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const

export const dynamic = 'force-dynamic'

export async function GET() {
  const status = Object.fromEntries(
    ENV_KEYS.map((key) => [key, Boolean(process.env[key]?.trim())])
  )

  return Response.json(status, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}

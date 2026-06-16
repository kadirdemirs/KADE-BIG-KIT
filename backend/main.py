"""KADE AI Platform — Unified Backend
Combines KADE AutoEdit AI (video processing) and KADE Growth AI (analytics).

AutoEdit modules: port 8472 → unified as /video/* routes
Growth modules:   port 8473 → unified as /growth/* routes

Run: uvicorn main:app --reload --host 0.0.0.0 --port 8472
"""

import json
import time
import uuid
from contextlib import asynccontextmanager
from typing import Any, Dict, List, Optional

import uvicorn
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ─── AutoEdit modules ────────────────────────────────────────────────────────
from modules.silence_cutter import cut_silences
from modules.whisper_transcript import transcribe_audio
from modules.beat_sync import detect_beats
from modules.scene_detector import detect_scenes
from modules.auto_color import analyze_color_audio
from modules.auto_captions import generate_captions
from modules.auto_zoom import detect_zoom_points
from modules.viral_detector import detect_viral_segments
from modules.podcast_mode import detect_speakers
from modules.repeat_detector import detect_repeats
from modules.profanity_filter import filter_profanity
from modules.auto_chapters import generate_chapters
from modules.auto_resize import analyze_resize
from modules.broll_suggest import suggest_broll


# ─── WebSocket manager ───────────────────────────────────────────────────────
class ConnectionManager:
    def __init__(self):
        self.active: List[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)

    def disconnect(self, ws: WebSocket):
        if ws in self.active:
            self.active.remove(ws)

    async def broadcast(self, message: dict):
        dead = []
        for ws in self.active:
            try:
                await ws.send_json(message)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self.disconnect(ws)


manager = ConnectionManager()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("KADE AI Platform Backend starting...")
    yield
    print("KADE AI Platform Backend shutting down...")


app = FastAPI(
    title="KADE AI Platform Backend",
    version="1.0.0",
    description="Unified backend: AutoEdit AI + Growth AI",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Health ──────────────────────────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.0.0", "modules": ["autoedit", "growth"]}


# ─── WebSocket ───────────────────────────────────────────────────────────────
@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await manager.connect(ws)
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(ws)


# ══════════════════════════════════════════════════════════════════════════════
#  VIDEO EDITOR ROUTES (AutoEdit AI)
# ══════════════════════════════════════════════════════════════════════════════

class VideoRequest(BaseModel):
    video_path: str


class SilenceCutRequest(VideoRequest):
    threshold_db: float = -40.0
    min_silence_ms: int = 500
    padding_ms: int = 100


class TranscriptRequest(VideoRequest):
    language: str = "tr"
    model_size: str = "base"


class BeatSyncRequest(VideoRequest):
    bpm_override: float = 0
    sensitivity: str = "medium"


class SceneDetectRequest(VideoRequest):
    threshold: float = 30.0
    min_scene_length: float = 1.0


class AutoColorRequest(VideoRequest):
    sample_rate: int = 30


class AutoCaptionsRequest(VideoRequest):
    language: str = "tr"
    max_chars_per_line: int = 42


class AutoZoomRequest(VideoRequest):
    zoom_factor: float = 1.15
    min_zoom_duration: float = 1.5


class ViralDetectorRequest(VideoRequest):
    min_clip_duration: int = 15
    max_clip_duration: int = 60
    top_n: int = 5


class PodcastModeRequest(VideoRequest):
    num_speakers: int = 0


class RepeatDetectorRequest(VideoRequest):
    similarity_threshold: float = 0.85
    min_duration: float = 2.0


class ProfanityFilterRequest(VideoRequest):
    language: str = "tr"
    action: str = "mark"


class AutoChaptersRequest(VideoRequest):
    min_chapter_duration: int = 60
    max_chapters: int = 15


class AutoResizeRequest(VideoRequest):
    target_format: str = "9:16"


class BrollSuggestRequest(VideoRequest):
    language: str = "tr"
    min_segment_duration: float = 3.0


def _run_module(fn, *args, **kwargs) -> Dict[str, Any]:
    """Wraps module call, catches errors uniformly."""
    try:
        result = fn(*args, **kwargs)
        return {"success": True, "data": result}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Video dosyası bulunamadı: {kwargs.get('video_path','')}")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/silence-cut")
async def silence_cut(req: SilenceCutRequest):
    return _run_module(
        cut_silences,
        video_path=req.video_path,
        threshold_db=req.threshold_db,
        min_silence_ms=req.min_silence_ms,
        padding_ms=req.padding_ms,
    )


@app.post("/transcript")
async def transcript(req: TranscriptRequest):
    return _run_module(
        transcribe_audio,
        video_path=req.video_path,
        language=req.language,
        model_size=req.model_size,
    )


@app.post("/beat-sync")
async def beat_sync(req: BeatSyncRequest):
    return _run_module(
        detect_beats,
        video_path=req.video_path,
        bpm_override=req.bpm_override,
    )


@app.post("/scene-detect")
async def scene_detect(req: SceneDetectRequest):
    return _run_module(
        detect_scenes,
        video_path=req.video_path,
        threshold=req.threshold,
        min_scene_length=req.min_scene_length,
    )


@app.post("/auto-color")
async def auto_color(req: AutoColorRequest):
    return _run_module(
        analyze_color_audio,
        video_path=req.video_path,
        sample_rate=req.sample_rate,
    )


@app.post("/auto-captions")
async def auto_captions(req: AutoCaptionsRequest):
    return _run_module(
        generate_captions,
        video_path=req.video_path,
        language=req.language,
        max_chars_per_line=req.max_chars_per_line,
    )


@app.post("/auto-zoom")
async def auto_zoom(req: AutoZoomRequest):
    return _run_module(
        detect_zoom_points,
        video_path=req.video_path,
        zoom_factor=req.zoom_factor,
        min_zoom_duration=req.min_zoom_duration,
    )


@app.post("/viral-detector")
async def viral_detector(req: ViralDetectorRequest):
    return _run_module(
        detect_viral_segments,
        video_path=req.video_path,
        min_clip_duration=req.min_clip_duration,
        max_clip_duration=req.max_clip_duration,
        top_n=req.top_n,
    )


@app.post("/podcast-mode")
async def podcast_mode(req: PodcastModeRequest):
    return _run_module(
        detect_speakers,
        video_path=req.video_path,
        num_speakers=req.num_speakers,
    )


@app.post("/repeat-detector")
async def repeat_detector(req: RepeatDetectorRequest):
    return _run_module(
        detect_repeats,
        video_path=req.video_path,
        similarity_threshold=req.similarity_threshold,
        min_duration=req.min_duration,
    )


@app.post("/profanity-filter")
async def profanity_filter(req: ProfanityFilterRequest):
    return _run_module(
        filter_profanity,
        video_path=req.video_path,
        language=req.language,
        action=req.action,
    )


@app.post("/auto-chapters")
async def auto_chapters(req: AutoChaptersRequest):
    return _run_module(
        generate_chapters,
        video_path=req.video_path,
        min_chapter_duration=req.min_chapter_duration,
        max_chapters=req.max_chapters,
    )


@app.post("/auto-resize")
async def auto_resize(req: AutoResizeRequest):
    return _run_module(
        analyze_resize,
        video_path=req.video_path,
        target_format=req.target_format,
    )


@app.post("/broll-suggest")
async def broll_suggest(req: BrollSuggestRequest):
    return _run_module(
        suggest_broll,
        video_path=req.video_path,
        language=req.language,
        min_segment_duration=req.min_segment_duration,
    )


# ══════════════════════════════════════════════════════════════════════════════
#  GROWTH ANALYTICS ROUTES (Growth AI)
# ══════════════════════════════════════════════════════════════════════════════

# These routes proxy to or replicate Growth AI functionality.
# For full OAuth2 + PostgreSQL integration, configure core/config.py and
# run `alembic upgrade head` before starting.

try:
    from collectors.youtube import YouTubeCollector
    from collectors.base import MetricSnapshot
    _youtube_available = True
except ImportError:
    _youtube_available = False


@app.get("/growth/health")
async def growth_health():
    return {
        "status": "ok",
        "youtube_collector": _youtube_available,
        "platforms": ["youtube", "instagram", "tiktok", "kick"],
    }


@app.get("/oauth/youtube/auth-url")
async def youtube_auth_url():
    if not _youtube_available:
        raise HTTPException(status_code=503, detail="YouTube collector not available. Check requirements.")
    try:
        collector = YouTubeCollector()
        return {"auth_url": collector.get_auth_url()}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/oauth/youtube/callback")
async def youtube_callback(code: str, account_id: Optional[int] = None):
    if not _youtube_available:
        raise HTTPException(status_code=503, detail="YouTube collector not available.")
    try:
        collector = YouTubeCollector()
        tokens = await collector.exchange_code(code)
        return {"success": True, "tokens": tokens}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


class InsightRequest(BaseModel):
    period: str = "weekly"
    platform: Optional[str] = None


@app.post("/insights/generate")
async def generate_insight(req: InsightRequest):
    """Generate AI insights using Claude API."""
    import os
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
    if not anthropic_key:
        raise HTTPException(status_code=503, detail="ANTHROPIC_API_KEY ortam değişkeni bulunamadı.")
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=anthropic_key)
        prompt = f"""Sen bir sosyal medya büyüme analistisisin.
Kullanıcının {req.period} performans verilerini analiz et ve Türkçe olarak:
1. En güçlü 3 büyüme alanı
2. Dikkat edilmesi gereken 2 zayıflık
3. Bu hafta için 3 somut eylem önerisi
yazarak kısa bir rapor oluştur."""
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}],
        )
        return {"success": True, "period": req.period, "summary": message.content[0].text}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/reports/weekly")
async def weekly_report():
    """Generate weekly growth report using Claude API."""
    import os
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
    if not anthropic_key:
        raise HTTPException(status_code=503, detail="ANTHROPIC_API_KEY ortam değişkeni bulunamadı.")
    try:
        import anthropic
        client = anthropic.Anthropic(api_key=anthropic_key)
        prompt = """Bir içerik üreticisi için kapsamlı haftalık sosyal medya büyüme raporu oluştur.
Rapor şu bölümleri içersin:
📊 HAFTALIK ÖZET
📈 BÜYÜME METRİKLERİ
🏆 EN İYİ PERFORMANS
⚠️ DİKKAT EDİLECEKLER
🎯 GELECEK HAFTA STRATEJİSİ

Türkçe yaz, net ve eyleme geçirilebilir öneriler sun."""
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        return {"success": True, "report": message.content[0].text}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8472, reload=True)

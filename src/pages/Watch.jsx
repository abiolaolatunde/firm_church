import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { SITE } from "../config.js";
import { SCHEDULE } from "../data.js";
import { ArrowUpRight } from "lucide-react";

const SESSIONS = SCHEDULE.flatMap((d) => d.sessions);

export default function Watch() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);

  const live = SESSIONS.find((s) => now >= Date.parse(s.start) && now < Date.parse(s.end));
  const next = SESSIONS.find((s) => Date.parse(s.start) > now);
  const s = live || next;
  let t = s && !live ? Math.max(0, Math.floor((Date.parse(s.start) - now) / 1000)) : 0;
  const d = Math.floor(t / 86400); t -= d * 86400;
  const h = Math.floor(t / 3600); t -= h * 3600;
  const m = Math.floor(t / 60); const sec = t - m * 60;

  return (
    <>
      <Header dark />
      <main className="page">
        <h1 className="page__title">Watch</h1>
        <p className="page__lede">Join the FIRM CAMP 2026 livestream or catch up on recent broadcasts from our YouTube channel.</p>
        <section className="upnext" aria-live="polite">
          {s ? (
            <>
              <p className="upnext__label">{live ? "Live now" : "Up next"}</p>
              <h2 className="upnext__title">{s.title} ({s.kind})</h2>
              <p className="upnext__when">{s.day} • {s.time}</p>
              {!live && (
                <ul className="countdown" aria-label="Time until the session starts">
                  <li><b>{d}</b><span>Days</span></li><li><b>{h}</b><span>Hours</span></li>
                  <li><b>{m}</b><span>Minutes</span></li><li><b>{sec}</b><span>Seconds</span></li>
                </ul>
              )}
            </>
          ) : (
            <>
              <p className="upnext__label">Thank you</p>
              <h2 className="upnext__title">FIRM CAMP 2026 has ended</h2>
              <p className="upnext__when">Catch up on every session on our YouTube channel.</p>
            </>
          )}
        </section>
        <div className="player">
          {SITE.youtubeChannelId ? (
            <iframe src={`https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(SITE.youtubeChannelId)}`} title="FIRM CAMP livestream" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <div className="player__empty"><p>The livestream will appear here when we go live.</p><small>Sessions stream on our YouTube channel.</small></div>
          )}
        </div>
        <p className="watch__fallback">If the livestream does not appear, watch directly on our channel: <a href={SITE.youtubeChannelUrl} target="_blank" rel="noopener">@firmchurchglobal</a></p>
        <a className="btn-youtube" href={SITE.youtubeChannelUrl} target="_blank" rel="noopener">Open on YouTube <ArrowUpRight /></a>
      </main>
      <Footer />
    </>
  );
}

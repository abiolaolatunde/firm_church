import { useState } from "react";
import Header, { Glow } from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Crop from "../components/Crop.jsx";
import { useRegister } from "../components/Register.jsx";
import { Link } from "react-router-dom";
import { SITE } from "../config.js";
import { PILLARS, LEADERS, SCHEDULE, MOMENTS, FAQS, FAQ_TOPICS } from "../data.js";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";

export default function Home() {
  const openRegister = useRegister();
  return (
    <>
      <Header />
      <main>
        <section className="hero" aria-label="FIRM CAMP 2026">
          <Glow />
          <div className="hero__art">
            <img className="hero__bg" src="/assets/Background-landing.png" alt="" />
            <img className="hero__mark" src="/assets/hero-logo.png" alt="A Joy Culture" />
          </div>
          <div className="hero__info">
            <h1 className="hero__date">December 3-6, 2026</h1>
            <p className="hero__address">Umari Audi Road, Opposite Colors, Fate Roundabout, Ilorin, Kwara State</p>
            <a className="hero__directions" href={SITE.directionsUrl} target="_blank" rel="noopener">Get directions <ArrowUpRight /></a>
            <div><button className="pill pill--paper hero__cta" onClick={openRegister}>Register for FIRMCAMP <ArrowUpRight /></button></div>
          </div>
        </section>

        <section className="intro" id="gathering">
          <h2 className="intro__title">Raising a gospel movement in Ilorin, Kwara State, carried to every corner of the world - FIRM CAMP is where that vision takes root.</h2>
          <p className="intro__lede">FIRM CAMP is the annual gathering of FIRM CHURCH GLOBAL. Each year, FIRM CHURCH marks a moment to Indoctrinate, Rejuvenate and commission Men for Ministry in Faith.</p>
          <ol className="pillars">
            {PILLARS.map((p, i) => (
              <li className="pillar" key={p.word}>
                <span className="pillar__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="pillar__word">{p.word}</h3>
                <p className="pillar__text">{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="scripture" aria-label="Theme scripture">
          <h2 className="scripture__ref">Romans 15:13-14</h2>
          <blockquote>“Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost. And I myself also am persuaded of you, my brethren, that ye also are full of goodness, filled with all knowledge, able also to admonish one another.”</blockquote>
        </section>

        <section className="leaders" id="leaders">
          <div className="section-head">
            <h2 className="h2">Leading the Way</h2>
            <p className="leaders__sub">Meet the people leading us through FIRM CAMP 2026.</p>
          </div>
          <ul className="leaders__grid">
            {LEADERS.map((l) => (
              <li className="leader" key={l.name}>
                <div className="leader__photo"><Crop src={l.img} crop={l.crop} alt={l.alt || l.name} /></div>
                <h3 className="leader__name">{l.name}</h3>
                <div className="leader__rule" />
              </li>
            ))}
          </ul>
          <button className="pill pill--dark leaders__cta" onClick={openRegister}>Join the movement <ArrowUpRight /></button>
        </section>

        <Schedule />

        <section className="statement" aria-label="More than a moment">
          <p>This is more than a moment; it is a culture shift.</p>
        </section>

        <section className="moments" aria-label="Moments from past FIRM CAMP gatherings">
          <div className="moments__cols">
            {MOMENTS.map((col, c) => (
              <div className="moments__col" key={c}>
                {col.map(([src, crop, tall, alt]) => (
                  <div className={`tile${tall ? " tile--tall" : ""}`} key={src}><Crop src={src} crop={crop} alt={alt} /></div>
                ))}
              </div>
            ))}
          </div>
          <div className="moments__fade" aria-hidden="true" />
        </section>

        <Faq />

        <section className="closing">
          <div>
            <p className="closing__meta">December 3 - 6, 2026 · Ilorin, Kwara State, Nigeria</p>
            <h2 className="h2">Championing a <span>Gospel Movement</span></h2>
          </div>
          <div className="closing__actions">
            <button className="pill pill--paper" onClick={openRegister}>Register for FIRM CAMP ’26 <ArrowUpRight /></button>
            <Link className="pill pill--outline" to="/support">Support FIRM CAMP <ArrowRight /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Schedule() {
  const [active, setActive] = useState(0);
  const onKey = (e) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (active + dir + SCHEDULE.length) % SCHEDULE.length;
    setActive(next);
    document.getElementById(`tab-${SCHEDULE[next].id}`)?.focus();
  };
  return (
    <section className="schedule" id="schedule">
      <div className="section-head">
        <h2 className="h2">Four days of<br />gospel renewal.</h2>
        <div className="schedule__meta">
          <p className="schedule__dates">Thursday, 3rd December to Sunday, 6th December 2026</p>
          <p className="schedule__tz">All times West Africa Time (WAT)</p>
        </div>
      </div>
      <div className="tabs" role="tablist" aria-label="Schedule by day" onKeyDown={onKey}>
        {SCHEDULE.map((d, i) => (
          <button key={d.id} className="tab" role="tab" id={`tab-${d.id}`} aria-controls={`day-${d.id}`} aria-selected={i === active} tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)}>
            {d.tab}
            <ArrowUpRight />
          </button>
        ))}
      </div>
      {SCHEDULE.map((d, i) => (
        <div className="panel" role="tabpanel" id={`day-${d.id}`} aria-labelledby={`tab-${d.id}`} hidden={i !== active} key={d.id}>
          {d.sessions.map((s) => (
            <article className="session" key={s.title}>
              <div className="session__head">
                <div><p className="session__kind">{s.kind}</p><h3 className="session__title">{s.title}</h3></div>
                <p className="session__time">{s.time}</p>
              </div>
              <ul className="session__list">
                {s.items.map(([t, what], k) => <li key={k}><span>{t}</span><span>{what}</span></li>)}
              </ul>
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}

function Faq() {
  const [topic, setTopic] = useState(FAQ_TOPICS[0].id);
  return (
    <section className="faq" id="faqs">
      <div className="faq__intro">
        <h2 className="h2">A little<br />clarity.</h2>
        <p>Your questions about FIRM CAMP, answered.</p>
      </div>
      <div>
        <div className="faq__topics" role="group" aria-label="FAQ topics">
          {FAQ_TOPICS.map((t) => (
            <button key={t.id} className="chip" aria-pressed={topic === t.id} onClick={() => setTopic(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="faq__list">
          {FAQS.filter((f) => f.topic === topic).map((f) => (
            <details className="faq__item" key={f.q}>
              <summary>{f.q}<Plus className="faq__icon" /></summary>
              <div className="faq__answer">
                {f.a.map((part, i) => Array.isArray(part) ? (
                  <ul key={i}>{part.map((li, k) => <li key={k}>{Array.isArray(li) ? <><strong>{li[0]}:</strong> {li[1]}</> : li}</li>)}</ul>
                ) : <p key={i}>{part}</p>)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

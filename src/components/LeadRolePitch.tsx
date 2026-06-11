/// <reference types="vite/client" />
import { useState, useEffect, useCallback } from 'react'

// Base path for images — Vite serves public/ at root in dev and at base in prod
const BASE = import.meta.env.BASE_URL


interface SlideData {
  id: number
  tag: string
  title: string
  subtitle?: string
  body: React.ReactNode
  accentClass: string   // Tailwind gradient classes
  accentHex: string     // solid colour for borders/glow
  icon: string
  image: string
}

const slides: SlideData[] = [
  {
    id: 1,
    tag: 'An Opportunity',
    title: 'Stepping Into the\nFront-end Lead Role',
    subtitle: 'A message for Neeraj',
    body: null,
    accentClass: 'from-emerald-500 to-teal-600',
    accentHex: '#10b981',
    icon: '🚀',
    image: `${BASE}pitch/slide_01.png`,
  },
  {
    id: 2,
    tag: 'Your Track Record',
    title: "You've already been\nleading without the title.",
    body: (
      <p>
        Over the last several months, you've shown{' '}
        <strong>consistent growth and ownership</strong> across the front-end function —
        particularly on the mobile side. You've demonstrated the ability to understand
        requirements, drive execution, solve problems independently, and support the team when
        needed.
      </p>
    ),
    accentClass: 'from-violet-500 to-purple-600',
    accentHex: '#8b5cf6',
    icon: '📈',
    image: `${BASE}pitch/slide_02.png`,
  },
  {
    id: 3,
    tag: 'The Change',
    title: "This is not a title change.\nIt's a mindset shift.",
    body: (
      <div className="pitch-quote-block">
        <div className="pitch-quote-item pitch-quote-before">
          <span className="pitch-quote-label">Before</span>
          <p>"How do I complete my tasks?"</p>
        </div>
        <div className="pitch-quote-arrow">→</div>
        <div className="pitch-quote-item pitch-quote-after">
          <span className="pitch-quote-label">Going Forward</span>
          <p>"How do we ensure the front-end team succeeds?"</p>
        </div>
      </div>
    ),
    accentClass: 'from-orange-500 to-amber-500',
    accentHex: '#f59e0b',
    icon: '🧭',
    image: `${BASE}pitch/slide_03.png`,
  },
  {
    id: 4,
    tag: 'Your Responsibilities',
    title: 'Owning the front-end\nfunction end-to-end.',
    body: (
      <ul className="pitch-list">
        {[
          ['🖥️', 'Front-end delivery across web and mobile'],
          ['⚙️', 'Technical quality and consistency'],
          ['📋', 'Sprint planning inputs and execution visibility'],
          ['🤝', 'Mentoring and supporting other front-end developers'],
          ['🔍', 'Identifying risks before they become problems'],
          ['🔧', 'Driving improvements in engineering practices'],
          ['📣', 'Being the first point of escalation for front-end challenges'],
        ].map(([emoji, text], i) => (
          <li key={i}>
            <span className="pitch-list-emoji">{emoji}</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    ),
    accentClass: 'from-sky-500 to-blue-600',
    accentHex: '#0ea5e9',
    icon: '🎯',
    image: `${BASE}pitch/slide_04.png`,
  },
  {
    id: 5,
    tag: 'Why You?',
    title: "You've earned this.",
    body: (
      <p>
        You've shown the <strong>strongest promise within the team</strong>, especially on the
        mobile front where you've taken ownership and consistently delivered. More importantly,
        you've shown the <strong>willingness to learn and adapt</strong> — which is often more
        valuable than experience alone in a startup environment.
      </p>
    ),
    accentClass: 'from-rose-500 to-pink-600',
    accentHex: '#f43f5e',
    icon: '⭐',
    image: `${BASE}pitch/slide_05.png`,
  },
  {
    id: 6,
    tag: 'Growth Areas',
    title: '1. Product Thinking',
    subtitle: '“You have earned the opportunity. But leadership is not recognition of where you are today. It is a bet on who you can become.”',
    body: (
      <div className="flex flex-col gap-3">
        <p className="text-white/80">
          Today, your thinking is often focused on the <strong>implementation details</strong>.
        </p>
        <p className="text-white/60">
          A Front-end Lead must think beyond the happy path:
        </p>
        <ul className="list-disc pl-5 text-white/50 space-y-1 my-1">
          <li>What happens if the API fails or returns incomplete data?</li>
          <li>What happens if the user abandons midway?</li>
          <li>What happens on older devices or edge cases?</li>
        </ul>
        <p className="text-white/85 font-medium mt-1">
          🧠 Leadership requires understanding the product, not just the screens.
        </p>
      </div>
    ),
    accentClass: 'from-orange-500 to-rose-500',
    accentHex: '#f97316',
    icon: '🧠',
    image: `${BASE}pitch/slide_06.png`,
  },
  {
    id: 7,
    tag: 'Growth Areas',
    title: '2. Proactive Ownership',
    subtitle: '“You have earned the opportunity. But leadership is not recognition of where you are today. It is a bet on who you can become.”',
    body: (
      <div className="flex flex-col gap-3">
        <p className="text-white/80">
          Today, most actions happen <strong>after</strong> an issue becomes visible.
        </p>
        <p className="text-white/60">
          A Front-end Lead is expected to:
        </p>
        <ul className="list-disc pl-5 text-white/50 space-y-1 my-1">
          <li>Identify risks before they occur</li>
          <li>Raise concerns early and suggest improvements without being asked</li>
          <li>Create visibility before stakeholders ask for it</li>
        </ul>
        <p className="text-white/85 font-medium mt-1">
          🔭 Leadership is fundamentally proactive, not reactive.
        </p>
      </div>
    ),
    accentClass: 'from-rose-500 to-pink-600',
    accentHex: '#f43f5e',
    icon: '🔭',
    image: `${BASE}pitch/slide_07.png`,
  },
  {
    id: 8,
    tag: 'Growth Areas',
    title: '3. Front-end Depth',
    subtitle: '“None of these are reasons you cannot become a Front-end Lead. These are the reasons you need to become one.”',
    body: (
      <div className="flex flex-col gap-3">
        <p className="text-white/80">
          You have built good execution capability. The next level requires <strong>stronger engineering expertise</strong> in:
        </p>
        <ul className="list-disc pl-5 text-white/50 space-y-1 my-1">
          <li>Performance optimization & rendering efficiency</li>
          <li>Architecture decisions & scalability patterns</li>
          <li>Reusability, maintainability, and front-end best practices</li>
        </ul>
        <p className="text-white/85 font-medium mt-1">
          ⚙️ The team should look to you for answers and direction.
        </p>
      </div>
    ),
    accentClass: 'from-violet-500 to-purple-600',
    accentHex: '#8b5cf6',
    icon: '⚙️',
    image: `${BASE}pitch/slide_08.png`,
  },
  {
    id: 9,
    tag: 'Accountability',
    title: '1. Quality',
    subtitle: '“As Front-end Lead, you own the outcome.”',
    body: (
      <div className="flex flex-col gap-3">
        <p className="text-white/80">
          The quality of the product is <strong>your responsibility</strong>.
        </p>
        <ul className="list-disc pl-5 text-white/50 space-y-1 my-1">
          <li>Not just the bugs you write yourself.</li>
          <li>Not just the tasks explicitly assigned to you.</li>
        </ul>
        <p className="text-white/85 font-medium mt-1">
          ✅ You own the overall quality bar of the entire front-end function.
        </p>
      </div>
    ),
    accentClass: 'from-emerald-500 to-teal-600',
    accentHex: '#10b981',
    icon: '✅',
    image: `${BASE}pitch/slide_09.png`,
  },
  {
    id: 10,
    tag: 'Accountability',
    title: '2. Scalability & Maintainability',
    subtitle: '“As Front-end Lead, you own the outcome.”',
    body: (
      <div className="flex flex-col gap-3">
        <p className="text-white/80">
          You are responsible for ensuring that the front-end:
        </p>
        <ul className="list-disc pl-5 text-white/50 space-y-1 my-1">
          <li>Scales smoothly alongside the business growth</li>
          <li>Is configurable where needed, clean, and well-documented</li>
          <li>Is easily maintainable by future developers</li>
        </ul>
        <p className="text-white/85 font-medium mt-1">
          🏗️ You avoid short-term decisions that create long-term pain.
        </p>
      </div>
    ),
    accentClass: 'from-cyan-500 to-teal-500',
    accentHex: '#06b6d4',
    icon: '🏗️',
    image: `${BASE}pitch/slide_10.png`,
  },
  {
    id: 11,
    tag: 'Accountability',
    title: '3. Predictability',
    subtitle: '“Your success is no longer measured by the code you write. It is measured by the outcomes the front-end team consistently delivers.”',
    body: (
      <div className="flex flex-col gap-3">
        <p className="text-white/85">
          Leadership is measured by <strong>predictability</strong>. The organization should be able to trust:
        </p>
        <ul className="list-disc pl-5 text-white/50 space-y-1 my-1">
          <li>What will be delivered & when it will be delivered</li>
          <li>What risks exist & what support is needed</li>
        </ul>
        <p className="text-white/85 font-medium mt-1">
          📈 Surprises should become rare.
        </p>
      </div>
    ),
    accentClass: 'from-blue-500 to-indigo-600',
    accentHex: '#3b82f6',
    icon: '📈',
    image: `${BASE}pitch/slide_11.png`,
  },
  {
    id: 12,
    tag: 'The Startup Advantage',
    title: 'You left a large company\nfor a reason.',
    body: (
      <p>
        In a larger company, it may take <strong>years</strong> before someone gets a chance to
        lead a function. Layers of hierarchy, predefined career paths, and organizational
        structures slow that progression. You left that environment to join a startup.{' '}
        <strong>
          The people who grow fastest in startups are the ones who actively grab responsibility
          rather than wait for it to be assigned.
        </strong>
      </p>
    ),
    accentClass: 'from-cyan-500 to-teal-500',
    accentHex: '#06b6d4',
    icon: '⚡',
    image: `${BASE}pitch/slide_12.png`,
  },
  {
    id: 13,
    tag: 'The Moment',
    title: 'This is one\nof those moments.',
    body: (
      <p>
        The company is growing. The complexity of our product is increasing. We need{' '}
        <strong>stronger leadership within the front-end function</strong>. When opportunities
        emerge in a startup, you get the chance to step into them{' '}
        <strong>much earlier than most people at your career stage</strong>. I believe you're
        ready for that next step.
      </p>
    ),
    accentClass: 'from-yellow-500 to-orange-500',
    accentHex: '#eab308',
    icon: '🌟',
    image: `${BASE}pitch/slide_13.png`,
  },
  {
    id: 14,
    tag: 'On Mistakes',
    title: "You will make mistakes.\nThat's expected.",
    body: (
      <p>
        What matters is that you <strong>take ownership</strong>, learn quickly, and continue{' '}
        <strong>raising the bar</strong> for yourself and the team. No leader has ever been
        perfect from day one. The best ones are the ones who grow the fastest through every
        challenge they face.
      </p>
    ),
    accentClass: 'from-indigo-500 to-violet-600',
    accentHex: '#6366f1',
    icon: '💪',
    image: `${BASE}pitch/slide_14.png`,
  },
  {
    id: 15,
    tag: 'The Path Forward',
    title: "You won't be\ndoing this alone.",
    body: (
      <p>
        Over the coming months, I'll work closely with you as you transition into this role.
        But I want you to{' '}
        <strong>
          start thinking and acting as the Front-end Lead from this point forward
        </strong>
        . The responsibilities are yours — and so are the wins that come with them.
      </p>
    ),
    accentClass: 'from-teal-500 to-emerald-600',
    accentHex: '#14b8a6',
    icon: '🤝',
    image: `${BASE}pitch/slide_15.png`,
  },
  {
    id: 16,
    tag: 'Closing',
    title: 'This is your\nnatural next step.',
    subtitle: "I have confidence that you'll do well. — Manthan",
    body: null,
    accentClass: 'from-emerald-500 to-teal-600',
    accentHex: '#10b981',
    icon: '🎉',
    image: `${BASE}pitch/slide_16.png`,
  },
  {
    id: 17,
    tag: 'Empowerment',
    title: 'Own this function.\nWe have your back.',
    subtitle: "A message from Manthan & the leadership team",
    body: (
      <div className="flex flex-col gap-4 text-xs md:text-sm">
        <p className="text-white/70 leading-relaxed">
          To build a world-class front-end, you need the authority, resources, and trust to make decisions. <strong>This role is yours to shape.</strong>
        </p>
        
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 my-2 text-center">
          <p className="font-semibold text-emerald-300 text-sm md:text-base leading-relaxed">
            We need you to own this function end-to-end.
          </p>
          <p className="text-white/80 text-xs md:text-sm mt-2">
            Whatever tools, resources, training, or support you need and want — <strong>you can ask of us.</strong> We've got your back.
          </p>
        </div>

        <p className="text-white/60 italic text-center">
          Let's build the future of Spring Money's front-end, together.
        </p>
      </div>
    ),
    accentClass: 'from-amber-400 to-orange-500',
    accentHex: '#f59e0b',
    icon: '🔑',
    image: `${BASE}pitch/slide_17.png`,
  },
]

export default function LeadRolePitch() {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'exit' | 'enter'>('idle')
  const [dir, setDir] = useState<'next' | 'prev'>('next')

  const goTo = useCallback(
    (index: number, direction: 'next' | 'prev') => {
      if (phase !== 'idle') return
      setDir(direction)
      setPhase('exit')
      setTimeout(() => {
        setCurrent(index)
        setPhase('enter')
        setTimeout(() => setPhase('idle'), 400)
      }, 280)
    },
    [phase],
  )

  const goNext = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1, 'next')
  }, [current, goTo])

  const goPrev = useCallback(() => {
    if (current > 0) goTo(current - 1, 'prev')
  }, [current, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const slide = slides[current]
  const isFirst = current === 0
  const isLast = current === slides.length - 1

  // Animation classes
  const slideClass = [
    'pitch-slide',
    phase === 'exit'
      ? dir === 'next'
        ? 'pitch-slide--exit-left'
        : 'pitch-slide--exit-right'
      : '',
    phase === 'enter'
      ? dir === 'next'
        ? 'pitch-slide--enter-right'
        : 'pitch-slide--enter-left'
      : '',
    phase === 'idle' ? 'pitch-slide--idle' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="pitch-shell">
      {/* Ambient background blobs that change colour with each slide */}
      <div
        className="pitch-blob pitch-blob-1"
        style={{ background: `radial-gradient(circle, ${slide.accentHex}55 0%, transparent 70%)` }}
      />
      <div
        className="pitch-blob pitch-blob-2"
        style={{ background: `radial-gradient(circle, ${slide.accentHex}33 0%, transparent 70%)` }}
      />

      {/* Top progress bar */}
      <div className="pitch-progress-track">
        <div
          className={`pitch-progress-fill bg-gradient-to-r ${slide.accentClass}`}
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide counter top-right */}
      <div className="pitch-counter">
        {current + 1} <span className="pitch-counter-sep">/</span> {slides.length}
      </div>

      {/* ─── Main content card ─────────────────────────────── */}
      <div className={slideClass}>
        <div className="pitch-card">
          {/* Left: text content */}
          <div className="pitch-card-text">
            {/* Tag pill */}
            <div className={`pitch-tag bg-gradient-to-r ${slide.accentClass}`}>{slide.tag}</div>

            {/* Icon */}
            <div className="pitch-icon">{slide.icon}</div>

            {/* Title */}
            <h1 className="pitch-title">
              {slide.title.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            {slide.subtitle && <p className="pitch-subtitle">{slide.subtitle}</p>}

            {/* Body content */}
            {slide.body && <div className="pitch-body">{slide.body}</div>}
          </div>

          {/* Right: image */}
          <div className="pitch-card-image">
            <img
              src={slide.image}
              alt={`Slide ${slide.id} visual`}
              className="pitch-image"
              style={{ boxShadow: `0 0 60px ${slide.accentHex}44` }}
            />
            {/* Gradient overlay on image edges */}
            <div
              className="pitch-image-overlay"
              style={{
                background: `linear-gradient(to right, #0f172a 0%, transparent 30%, transparent 70%, #0f172a 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── Navigation ───────────────────────────────────── */}
      <div className="pitch-nav">
        <button
          id="pitch-prev-btn"
          className={`pitch-nav-btn pitch-nav-btn--ghost ${isFirst ? 'pitch-nav-btn--disabled' : ''}`}
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous slide"
        >
          <span className="pitch-nav-arrow">←</span> Prev
        </button>

        {/* Dot indicators */}
        <div className="pitch-dots" role="tablist" aria-label="Slide navigation">
          {slides.map((s, i) => (
            <button
              key={i}
              id={`pitch-dot-${i}`}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}: ${s.tag}`}
              className={`pitch-dot ${i === current ? 'pitch-dot--active' : ''}`}
              style={i === current ? { background: slide.accentHex, boxShadow: `0 0 8px ${slide.accentHex}` } : {}}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            />
          ))}
        </div>

        <button
          id="pitch-next-btn"
          className={`pitch-nav-btn pitch-nav-btn--primary bg-gradient-to-r ${slide.accentClass} ${isLast ? 'pitch-nav-btn--disabled' : ''}`}
          onClick={goNext}
          disabled={isLast}
          aria-label="Next slide"
        >
          Next <span className="pitch-nav-arrow">→</span>
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="pitch-hint">Use ← → arrow keys to navigate</p>
    </div>
  )
}

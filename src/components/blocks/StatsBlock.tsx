'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type StatItem = {
  id?: string | null
  value: string
  label: string
  source?: {
    linkLabel?: string | null
    linkHref?: string | null
    year?: string | null
  } | null
  icon?: { url?: string | null; width?: number | null; height?: number | null } | number | null
}

type Props = {
  title?: string | null
  items: StatItem[]
}

export function StatsBlock({ title, items }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const els = itemRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!section || els.length === 0) return

    gsap.set(els[0], { autoAlpha: 1, y: 0 })
    els.slice(1).forEach(el => gsap.set(el, { autoAlpha: 0, y: 48 }))

    const tl = gsap.timeline()

    els.forEach((el, i) => {
      tl.to({}, { duration: 1.2 })
      if (i < els.length - 1) {
        tl.to(el, { autoAlpha: 0, y: -48, duration: 0.4, ease: 'power2.in' }, '<')
        tl.fromTo(
          els[i + 1],
          { autoAlpha: 0, y: 48 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.1',
        )
      }
    })

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${items.length * 300}vh`,
      pin: true,
      scrub: 3,
      animation: tl,
      snap: {
        snapTo: 1 / (els.length - 1 || 1),
        duration: { min: 1.0, max: 2.0 },
        ease: 'power1.inOut',
      },
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [items])

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {items.map((item, i) => {
          const icon = typeof item.icon === 'object' && item.icon !== null ? item.icon : null

          return (
            <div
              key={item.id ?? i}
              ref={el => { itemRefs.current[i] = el }}
              className="absolute flex flex-col items-center gap-6 w-full max-w-[600px] px-6 text-center"
            >
              {title && i === 0 && (
                <h2 className="font-tanker text-white uppercase text-2xl tracking-[-0.01em]">
                  {title}
                </h2>
              )}

              <span className="font-tanker text-purple-500 leading-none text-[clamp(4rem,18vw,10rem)]">
                {item.value}
              </span>

              <p className="text-white text-lg leading-snug max-w-[480px]">
                {item.label}
              </p>

              {item.source && (item.source.linkLabel || item.source.year) && (
                <p className="text-white/40 text-sm">
                  {item.source.linkLabel && item.source.linkHref ? (
                    <div>
                      Source :{' '}
                      <a
                        href={item.source.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 underline underline-offset-2 hover:text-white transition-colors"
                      >
                        {item.source.linkLabel}
                      </a>
                    </div>
                  ) : item.source.linkLabel ? (
                    <div>Source : {item.source.linkLabel}</div>
                  ) : null}
                  {item.source.year && (
                    <div> — Année : {item.source.year}</div>
                  )}
                </p>
              )}

              {icon?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={icon.url}
                  alt=""
                  aria-hidden
                  className="w-12 h-12 object-contain"
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

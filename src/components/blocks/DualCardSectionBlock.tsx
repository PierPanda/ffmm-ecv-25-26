'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Media = { url?: string | null; alt?: string | null } | number | null

type Props = {
  backgroundImage?: Media
  logo?: Media
  leftTitle?: string | null
  description?: string | null
  title: string
  ctaLabel?: string | null
  ctaHref?: string | null
}

function mediaUrl(media: Media | undefined): string | null {
  return typeof media === 'object' && media ? (media.url ?? null) : null
}

function mediaAlt(media: Media | undefined): string {
  return typeof media === 'object' && media?.alt ? media.alt : ''
}

export function DualCardSectionBlock({
  backgroundImage,
  logo,
  leftTitle,
  description,
  title,
  ctaLabel,
  ctaHref,
}: Props) {
  const bgUrl = mediaUrl(backgroundImage)
  const logoUrl = mediaUrl(logo)

  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!bgRef.current || !sectionRef.current || !bgUrl) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [bgUrl])

  const sectionTwo = (
    <>
      <span
        aria-hidden="true"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-purple-400 text-mauve-900 transition-transform group-hover:translate-x-1"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
          <path
            d="M9.36399 0.26356C9.71548 -0.0878208 10.2852 -0.0878859 10.6367 0.26356L19.7364 9.36393C20.0879 9.71541 20.0879 10.2851 19.7364 10.6366L10.6367 19.7364C10.2852 20.0879 9.71547 20.0879 9.36399 19.7364C9.01251 19.3849 9.01251 18.8152 9.36399 18.4637L13.5132 14.3145C14.7731 13.0546 13.8808 10.9003 12.099 10.9003L0.900012 10.9003C0.403014 10.9003 0.000105437 10.4972 0 10.0003C0 9.5032 0.402949 9.10025 0.900012 9.10025L12.0992 9.10025C13.881 9.10025 14.7733 6.94605 13.5135 5.6861L9.36399 1.53624C9.01251 1.18476 9.01251 0.615039 9.36399 0.26356Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="whitespace-pre-line font-tanker text-5xl md:text-[clamp(2.25rem,3.8vw,3.625rem)] font-normal uppercase leading-[0.95] text-purple-400">
        {title}
      </span>
    </>
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-mauve-900 px-6 py-6"
    >
      {bgUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={bgRef}
            src={bgUrl}
            alt=""
            aria-hidden
            className="absolute inset-x-0 w-full object-cover object-center will-change-transform"
            style={{ height: '150%', top: '-25%' }}
          />
          <div aria-hidden className="absolute inset-0 bg-purple-400/50" />
        </>
      )}

      <div className="relative z-10 grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex aspect-6/7 flex-col justify-between bg-sand-100 p-6 text-mauve-900">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={mediaAlt(logo)}
              className="h-auto w-full object-contain"
            />
          ) : (
            leftTitle && (
              <span className="whitespace-pre-line font-tanker text-3xl md:text-[clamp(1.5rem,2.4vw,2.25rem)] font-normal uppercase leading-[0.95] text-mauve-900">
                {leftTitle}
              </span>
            )
          )}
          {description && (
            <div className="flex w-full flex-col gap-4 font-body text-xl md:text-lg leading-[1.1] tracking-[-0.02em]">
              {description
                .split('\n')
                .filter((line) => line.trim() !== '')
                .map((line, i) => (
                  <p key={`${i}-${line.slice(0, 20)}`}>{line}</p>
                ))}
            </div>
          )}
        </div>

        {ctaHref ? (
          <a
            href={ctaHref}
            aria-label={ctaLabel || title}
            className="group relative flex aspect-6/7 flex-col justify-end bg-mauve-900 p-6"
          >
            {sectionTwo}
          </a>
        ) : (
          <div className="group relative flex aspect-[6/7] flex-col justify-end bg-mauve-900 p-6">
            {sectionTwo}
          </div>
        )}
      </div>
    </section>
  )
}

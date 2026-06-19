'use client'

import { useState } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Section = {
  id?: string | null
  tag: string
  title: string
  content: SerializedEditorState
}

type Props = {
  sections: Section[]
}

function formatIndex(i: number): string {
  return String(i + 1).padStart(2, '0')
}

export function BonnesPratiquesBlock({ sections }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = sections[activeIndex]

  return (
    <section className="w-full bg-mauve-900">
      <div className="flex flex-col lg:flex-row min-h-[600px]">

        {/* ── Colonne gauche : index ── */}
        <nav
          aria-label="Index des bonnes pratiques"
          className="lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-0 lg:self-start lg:max-h-screen lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-purple-400/15"
        >
          <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible py-4 lg:py-8 px-4 lg:px-6 gap-1">
            {sections.map((section, i) => {
              const isActive = activeIndex === i
              return (
                <li key={section.id ?? i} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`group flex items-start gap-3 w-full text-left py-3 px-2 lg:px-0 transition-colors duration-200 ${
                      isActive ? 'text-purple-400' : 'text-purple-400/30 hover:text-purple-400/70'
                    }`}
                  >
                    <span className="font-tanker text-sm shrink-0 mt-0.5">
                      {formatIndex(i)}
                    </span>
                    <span className="text-xs lg:text-sm leading-snug">
                      {section.title}
                    </span>
                  </button>
                  {i < sections.length - 1 && (
                    <div className="hidden lg:block border-b border-purple-400/10 mt-1" />
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ── Colonne droite : contenu ── */}
        {active && (
          <div className="flex-1 px-6 py-8 lg:px-12 lg:py-16 flex flex-col gap-8">

            {/* Numéro large */}
            <div
              className="font-tanker text-purple-400 leading-none select-none"
              style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
              aria-hidden
            >
              {formatIndex(activeIndex)}
            </div>

            {/* Tag + Titre */}
            <div className="flex flex-col gap-3">
              <span className="inline-flex self-start items-center border border-purple-400 text-purple-400 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                {active.tag}
              </span>
              <h2 className="font-tanker text-purple-400 uppercase leading-tight text-3xl lg:text-4xl xl:text-5xl">
                {active.title}
              </h2>
            </div>

            {/* Séparateur */}
            <div className="border-t border-purple-400/25" />

            {/* Description */}
            <div className="richtext text-white/70 text-sm lg:text-base max-w-2xl">
              <RichText data={active.content} />
            </div>

          </div>
        )}

      </div>
    </section>
  )
}

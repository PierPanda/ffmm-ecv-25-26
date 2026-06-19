'use client'

import { useState } from 'react'

type Item = {
  id?: string | null
  question: string
  answer: string
}

type Props = {
  title?: string | null
  items: Item[]
}

export function FAQBlock({ title, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section className="w-full bg-mauve-900 px-8 md:px-16 py-16 md:py-24">
      <div className="flex flex-col md:flex-row gap-12 md:gap-16">

        {/* Left — icon + title */}
        <div className="md:w-2/5 shrink-0 flex flex-col gap-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-400 text-purple-400 text-lg font-bold select-none">
            ?
          </div>
          {title && (
            <h2 className="font-tanker text-purple-400 uppercase leading-none text-4xl md:text-5xl">
              {title}
            </h2>
          )}
        </div>

        {/* Right — accordion */}
        <dl className="flex-1 flex flex-col">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.id ?? i} className="border-t border-purple-400/25">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="group w-full flex items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <dt className="text-purple-400/70 text-sm md:text-base leading-snug group-hover:text-purple-400 transition-colors">
                    {item.question}
                  </dt>
                  <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-purple-400 text-purple-400 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <dd
                  className="overflow-hidden text-purple-400/50 text-sm leading-relaxed transition-all duration-300"
                  style={{ maxHeight: isOpen ? '400px' : '0px', paddingBottom: isOpen ? '1.25rem' : '0' }}
                >
                  {item.answer}
                </dd>
              </div>
            )
          })}
          <div className="border-t border-purple-400/25" />
        </dl>

      </div>
    </section>
  )
}

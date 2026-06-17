'use client'

import { useState } from 'react'
import { BlockRenderer } from '@/components/BlockRenderer'

type Tab = {
  id?: string | null
  label: string
  content?: unknown[]
}

type Props = {
  tabs: Tab[]
}

export function TabsBlock({ tabs }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section>
      <nav role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.id ?? i}
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => setActiveIndex(i)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div role="tabpanel">
        {tabs[activeIndex]?.content && (
          <BlockRenderer
            blocks={tabs[activeIndex].content as Array<Record<string, unknown> & { blockType: string }>}
          />
        )}
      </div>
    </section>
  )
}

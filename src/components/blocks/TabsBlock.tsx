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
        {tabs.map((tab, i) => {
          const panelId = `tabpanel-${tab.id ?? i}`
          const tabId = `tab-${tab.id ?? i}`
          return (
            <button
              key={tab.id ?? i}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={i === activeIndex}
              aria-controls={panelId}
              onClick={() => setActiveIndex(i)}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
      <div
        id={`tabpanel-${tabs[activeIndex]?.id ?? activeIndex}`}
        role="tabpanel"
        aria-labelledby={`tab-${tabs[activeIndex]?.id ?? activeIndex}`}
      >
        {tabs[activeIndex]?.content && (
          <BlockRenderer
            blocks={tabs[activeIndex].content as Array<Record<string, unknown> & { blockType: string }>}
          />
        )}
      </div>
    </section>
  )
}

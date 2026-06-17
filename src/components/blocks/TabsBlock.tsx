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
  const safeIndex = Math.min(activeIndex, Math.max(0, tabs.length - 1))

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
              aria-selected={i === safeIndex}
              aria-controls={panelId}
              onClick={() => setActiveIndex(i)}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
      <div
        id={`tabpanel-${tabs[safeIndex]?.id ?? activeIndex}`}
        role="tabpanel"
        aria-labelledby={`tab-${tabs[safeIndex]?.id ?? activeIndex}`}
      >
        {tabs[safeIndex]?.content && (
          <BlockRenderer
            blocks={tabs[safeIndex].content as Array<Record<string, unknown> & { blockType: string }>}
          />
        )}
      </div>
    </section>
  )
}

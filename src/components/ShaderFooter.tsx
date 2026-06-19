'use client'

import { useEffect, useRef } from 'react'
import { unicornSdkUrl, unicornFooterProjectId } from '@/server/public-env'

const ELEMENT_ID = 'unicorn-footer-scene'

type UnicornScene = { destroy: () => void }

export default function ShaderFooter(): React.JSX.Element | null {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!unicornFooterProjectId) return

    let isMounted = true
    let scene: UnicornScene | undefined
    let injectedScript: HTMLScriptElement | undefined

    const projectId = unicornFooterProjectId

    const initScene = async () => {
      if (!containerRef.current || !window.UnicornStudio) return
      try {
        const s = await window.UnicornStudio.addScene({
          elementId: ELEMENT_ID,
          projectId,
          scale: 1,
          dpi: 1.5,
          fps: 60,
          fixed: false,
        })
        if (!isMounted) { s.destroy(); return }
        scene = s
      } catch (err) {
        console.error('[ShaderFooter] init failed:', err)
      }
    }

    const boot = () => initScene()

    if (window.UnicornStudio) {
      boot()
    } else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${unicornSdkUrl}"]`)
      if (existing) {
        existing.addEventListener('load', boot, { once: true })
      } else {
        const script = document.createElement('script')
        script.src = unicornSdkUrl
        script.addEventListener('load', boot, { once: true })
        document.head.appendChild(script)
        injectedScript = script
      }
    }

    return () => {
      isMounted = false
      scene?.destroy()
      injectedScript?.remove()
    }
  }, [])

  if (!unicornFooterProjectId) return null

  return (
    <div
      id={ELEMENT_ID}
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

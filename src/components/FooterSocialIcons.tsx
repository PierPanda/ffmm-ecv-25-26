'use client'

import { Icon } from '@iconify/react'

const linkClass = 'text-white/60 hover:text-purple-400 transition-colors'

export function FooterSocialIcons() {
  return (
    <div className="flex items-center gap-5 mt-6 justify-end">
      <a
        href="https://www.instagram.com/federationmusiquesmetalliques/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={linkClass}
      >
        <Icon icon="mdi:instagram" className="h-8 w-8" />
      </a>

      <a
        href="https://www.facebook.com/p/F%C3%A9d%C3%A9ration-des-Musiques-M%C3%A9talliques-100086192674757/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={linkClass}
      >
        <Icon icon="mdi:facebook" className="h-8 w-8" />
      </a>

      <a
        href="https://federationdesmusiquesmetalliques.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Site Fédération des Musiques Métalliques"
        className={linkClass}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/FMM_Logo.png" alt="" className="h-8 w-auto invert mix-blend-screen" />
      </a>
    </div>
  )
}

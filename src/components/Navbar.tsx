'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS as BASE_NAV_LINKS, HANDICAP_LINKS } from '@/lib/nav'

const NAV_LINKS = BASE_NAV_LINKS.map((link) => ({
  ...link,
  subLinks: link.href === '/handicaps' ? HANDICAP_LINKS : [],
}))

const CTA = { label: 'Tester mon festival', href: '/contact' }

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BurgerIcon() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden>
      <line x1="0" y1="1" x2="24" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="9" x2="24" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="17" x2="24" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M1 1L19 19M19 1L1 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-24 pointer-events-auto">
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-[6px] bg-mauve-900/60 mask-[linear-gradient(to_bottom,black_85%,transparent)] pointer-events-none"
        />

        <div className="relative flex items-center justify-between h-full px-8">
          {/* Logo — seul à gauche */}
          <Link href="/" className="shrink-0" onClick={close}>
            <Image
              src="/icons/logo.png"
              alt="Festiv'all"
              width={160}
              height={56}
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop : liens + CTA groupés à droite */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 text-purple-400 uppercase text-sm font-bold tracking-widest"
                  >
                    {link.label}
                    {link.subLinks.length > 0 && <ChevronDown />}
                  </Link>

                  {link.subLinks.length > 0 && (
                    <ul className="absolute hidden group-hover:block group-focus-within:block top-full left-1/2 -translate-x-1/2 w-64 pt-2">
                      <div className="bg-purple-400 border border-purple-400/30 rounded-lg py-2">
                        {link.subLinks.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="block px-5 py-2.5 text-mauve-900 uppercase text-xs font-bold tracking-widest hover:bg-mauve-900/10 transition-colors"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </div>
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <span className="text-purple-400 text-lg leading-none select-none" aria-hidden>|</span>
            <Link
              href={CTA.href}
              className="border-4 border-purple-400 rounded-full px-5 py-2 text-purple-400 uppercase text-xs font-bold tracking-widest whitespace-nowrap"
            >
              {CTA.label}
            </Link>
          </div>

          {/* Mobile burger / close */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-11 h-11 text-purple-400"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-mauve-900 flex flex-col px-8 pt-24 pb-12 overflow-y-auto transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <ul className="flex flex-col gap-8 mt-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-tanker text-purple-400 uppercase text-4xl leading-none"
                onClick={close}
              >
                {link.label}
              </Link>

              {link.subLinks.length > 0 && (
                <ul className="mt-4 flex flex-col gap-3 pl-4 border-l-2 border-purple-400/30">
                  {link.subLinks.map((sub) => (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        className="text-purple-400/60 uppercase text-xs font-bold tracking-widest hover:text-purple-400 transition-colors"
                        onClick={close}
                      >
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-12">
          <Link
            href={CTA.href}
            className="inline-block border-4 border-purple-400 rounded-full px-8 py-3 text-purple-400 uppercase text-sm font-bold tracking-widest"
            onClick={close}
          >
            {CTA.label}
          </Link>
        </div>
      </div>
    </>
  )
}

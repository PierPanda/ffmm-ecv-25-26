import Link from 'next/link'
import Image from 'next/image'

const HANDICAP_LINKS = [
  { label: 'Handicaps Visuels', href: '/handicaps/visuels' },
  { label: 'Handicaps Moteurs', href: '/handicaps/moteur' },
  { label: 'Handicaps Auditifs', href: '/handicaps/auditifs' },
  { label: 'Déficiences Intellectuelles', href: '/handicaps/intellectuelles' },
  { label: 'Troubles Psychiques', href: '/handicaps/psychiques' },
  { label: 'Troubles du Spectre Autistique', href: '/handicaps/autistique' },
]

const NAV_LINKS = [
  { label: 'Les Handicaps', href: '/handicaps', subLinks: HANDICAP_LINKS },
  { label: 'Les Bonnes pratiques', href: '/guide', subLinks: [] },
  { label: 'Les Ressources', href: '/ressources', subLinks: [] },
  { label: 'La Fédération', href: '/la-fede', subLinks: [] },
  { label: 'Blog', href: '/blog', subLinks: [] },
]

const CTA = { label: 'Tester mon festival', href: '/contact' }

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-24 pointer-events-auto">
      <div aria-hidden className="absolute inset-0 backdrop-blur-[6px] bg-mauve-900/10 mask-[linear-gradient(to_bottom,black_85%,transparent)] pointer-events-none" />

      <div className="relative flex items-center justify-between h-full px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/icons/logo.png"
            alt="Festiv'all"
            width={160}
            height={56}
            className="h-14 w-auto object-contain"
          />
        </Link>

        <ul className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative group">
              <Link
                href={link.href}
                className="flex items-center gap-1.5 text-purple-400 uppercase text-xs font-bold tracking-widest"
              >
                {link.label}
                {link.subLinks.length > 0 && <ChevronDown />}
              </Link>

              {link.subLinks.length > 0 && (
                <ul className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 w-64 pt-2">
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

        <div className="flex items-center gap-5 shrink-0">
          <span className="text-purple-400 text-lg leading-none select-none" aria-hidden>|</span>
          <Link
            href={CTA.href}
            className="border-2 border-purple-400 rounded-full px-5 py-2 text-purple-400 uppercase text-xs font-bold tracking-widest whitespace-nowrap"
          >
            {CTA.label}
          </Link>
        </div>
      </div>
    </nav>
  )
}

import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Les Handicaps', href: '/handicaps', dropdown: true },
  { label: 'Le Guide Terrain', href: '/guide', dropdown: false },
  { label: 'Les Ressources', href: '/ressources', dropdown: true },
  { label: 'La Fédération', href: '/la-fede', dropdown: false },
  { label: 'Blog', href: '/blog', dropdown: false },
]

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16">
      <Link
        href="/"
        className="border border-purple-500 rounded-full px-4 py-1.5 font-tanker text-purple-500 uppercase text-sm leading-none tracking-wide"
      >
        festiv/all.
      </Link>

      <ul className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center gap-1.5 text-purple-500 uppercase text-xs font-bold tracking-widest"
            >
              {link.label}
              {link.dropdown && <ChevronDown />}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5">
        <span className="text-purple-500 text-lg leading-none select-none">|</span>
        <Link
          href="/contact"
          className="border border-purple-500 rounded-full px-5 py-2 text-purple-500 uppercase text-xs font-bold tracking-widest"
        >
          Tester mon festival
        </Link>
      </div>
    </nav>
  )
}

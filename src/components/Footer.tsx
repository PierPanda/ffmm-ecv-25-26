import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import ShaderFooter from './ShaderFooter'
import { FooterSocialIcons } from './FooterSocialIcons'
import { NAV_LINKS } from '@/lib/nav'

const CONTENT_LINKS = [
  { label: 'Les bonnes pratiques', href: '/guide' },
  { label: 'Les ressources téléchargeables', href: '/ressources' },
  { label: 'Le blog', href: '/blog' },
  { label: 'Le glossaire', href: '/glossaire' },
]

const labelClass = 'text-purple-400 text-xs font-bold uppercase tracking-widest mb-4'
const linkClass = 'text-white/70 text-sm hover:text-white transition-colors'
const legalLinkClass = 'text-purple-400 text-sm hover:text-purple-300 transition-colors'

export async function Footer() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'siteSettings', depth: 0 })

  const footer = settings.footer as {
    legalText?: string | null
    links?: { label: string; href: string }[]
    contactLinkLabel?: string | null
    contactLinkHref?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    socialLinks?: { label: string; href: string }[]
  } | null

  return (
    <footer className="relative w-full overflow-hidden bg-mauve-900">
      <div className="absolute inset-0 z-0">
        <ShaderFooter />
      </div>

      <div className="relative z-10 w-full px-8 md:px-16 py-16">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">

        {/* Col 1 — Navigation */}
        <div>
          <p className={labelClass}>Navigation</p>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2 — Les contenus + Réseaux sociaux */}
        <div className="flex flex-col gap-10">
          <div>
            <p className={labelClass}>Les contenus</p>
            <ul className="flex flex-col gap-2">
              {CONTENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {footer?.socialLinks && footer.socialLinks.length > 0 && (
            <div>
              <p className={labelClass}>Réseaux sociaux</p>
              <ul className="flex flex-col gap-2">
                {footer.socialLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Col 3 — Nos coordonnées + Copyright + Liens légaux */}
        <div className="flex flex-col gap-10">
          <div>
            <p className={labelClass}>Nos coordonnées</p>
            <ul className="flex flex-col gap-2">
              {footer?.contactLinkHref && footer.contactLinkLabel && (
                <li>
                  <Link href={footer.contactLinkHref} className={linkClass}>
                    {footer.contactLinkLabel}
                  </Link>
                </li>
              )}
              {footer?.contactEmail && (
                <li>
                  <a href={`mailto:${footer.contactEmail}`} className={linkClass}>
                    {footer.contactEmail}
                  </a>
                </li>
              )}
              {footer?.contactPhone && (
                <li>
                  <a href={`tel:${footer.contactPhone.replace(/\s/g, '')}`} className={linkClass}>
                    {footer.contactPhone}
                  </a>
                </li>
              )}
            </ul>

            <FooterSocialIcons />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white/40 text-xs leading-relaxed">
              {footer?.legalText ?? "©Festiv'all 2026, Tous droits réservés"}
            </p>
            {footer?.links && footer.links.length > 0 && (
              <ul className="flex flex-col gap-2">
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={legalLinkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      </div>

      <div className="relative z-10 overflow-hidden flex justify-center h-[16vw] min-h-[100px]">
        <img
          src="/icons/logo-footer.png"
          alt=""
          aria-hidden
          className="w-7xl object-contain object-top opacity-15 translate-y-[30%]"
        />
      </div>
    </footer>
  )
}

type Props = {
  title: string
  subtitle?: string | null
  image?: { url?: string | null } | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export function HeroBlock({ title, subtitle, ctaLabel, ctaHref }: Props) {
  return (
    <section>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {ctaLabel && ctaHref && <a href={ctaHref}>{ctaLabel}</a>}
    </section>
  )
}

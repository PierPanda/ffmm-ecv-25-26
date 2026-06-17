type Props = {
  title: string
  text?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export function FedeBannerBlock({ title, text, ctaLabel, ctaHref }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {ctaLabel && ctaHref && <a href={ctaHref}>{ctaLabel}</a>}
    </section>
  )
}

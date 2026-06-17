type Props = {
  title: string
  description?: string | null
  file: { url?: string | null } | number
}

export function DownloadBlock({ title, description, file }: Props) {
  const url = typeof file === 'object' ? file.url : null

  return (
    <section>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {url && (
        <a href={url} download>
          Télécharger
        </a>
      )}
    </section>
  )
}

type Props = {
  title?: string | null
  items: Array<{ value: string; label: string; id?: string | null }>
}

export function StatsBlock({ title, items }: Props) {
  return (
    <section>
      {title && <h2>{title}</h2>}
      <ul>
        {items.map((item, i) => (
          <li key={item.id ?? i}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

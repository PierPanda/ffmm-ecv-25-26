type Item = {
  id?: string | null
  label: string
  href: string
}

type Props = {
  title?: string | null
  items: Item[]
}

export function HandicapsNavBlock({ title, items }: Props) {
  return (
    <nav>
      {title && <h2>{title}</h2>}
      <ul>
        {items.map((item, i) => (
          <li key={item.id ?? i}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

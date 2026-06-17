type Item = {
  id?: string | null
  title: string
  text?: string | null
}

type Props = {
  title: string
  items: Item[]
}

export function WhyEngageBlock({ title, items }: Props) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {items.map((item, i) => (
          <li key={item.id ?? i}>
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

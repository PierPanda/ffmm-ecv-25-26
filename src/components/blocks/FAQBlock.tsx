type Item = {
  id?: string | null
  question: string
  answer: string
}

type Props = {
  title?: string | null
  items: Item[]
}

export function FAQBlock({ title, items }: Props) {
  return (
    <section>
      {title && <h2>{title}</h2>}
      <dl>
        {items.map((item, i) => (
          <div key={item.id ?? i}>
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

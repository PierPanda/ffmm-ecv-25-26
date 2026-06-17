type Props = {
  title?: string | null
  description?: string | null
}

export function ContactFormBlock({ title, description }: Props) {
  return (
    <section>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
      <form>
        <label>
          Nom
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Message
          <textarea name="message" required />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  )
}

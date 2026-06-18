import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type ArrowDirection = 'up' | 'down' | 'left' | 'right'

type CommonProps = {
  /** Texte du bouton */
  label: ReactNode
  /** Affiche une flèche dans une pastille ; `false` pour aucune flèche */
  arrow?: ArrowDirection | false
  className?: string
}

// La flèche de base pointe vers le bas ; on la fait pivoter selon la direction.
const ARROW_ROTATION: Record<ArrowDirection, string> = {
  down: 'rotate-0',
  left: 'rotate-90',
  up: 'rotate-180',
  right: '-rotate-90',
}

function Arrow({ direction }: { direction: ArrowDirection }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-7 w-7 items-center justify-center rounded-full border border-current transition-transform group-hover:scale-110 ${ARROW_ROTATION[direction]}`}
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
        <path
          d="M10 3.5v11M5 9.5l5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

const BASE_CLASS =
  'group inline-flex w-fit items-center gap-3 rounded-full border border-current px-5 py-2 font-body text-sm font-semibold uppercase tracking-[0.04em] transition-colors'

/**
 * Bouton du design system : libellé + flèche optionnelle dont on choisit l'orientation.
 * Rendu en `<a>` si `href` est fourni, sinon en `<button>`.
 */
type AnchorButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className'> & { href: string }
type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className'> & { href?: undefined }

export function Button(props: AnchorButtonProps): React.JSX.Element
export function Button(props: NativeButtonProps): React.JSX.Element
export function Button({ label, arrow = 'down', className = '', ...rest }: CommonProps & Record<string, unknown>) {
  const content = (
    <>
      {label}
      {arrow && <Arrow direction={arrow} />}
    </>
  )
  const classes = `${BASE_CLASS} ${className}`.trim()

  if (typeof rest.href === 'string') {
    return (
      <a {...(rest as ComponentPropsWithoutRef<'a'>)} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" {...(rest as ComponentPropsWithoutRef<'button'>)} className={classes}>
      {content}
    </button>
  )
}

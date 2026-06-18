import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type ArrowDirection = 'up' | 'down' | 'left' | 'right'

type CommonProps = {
  label: ReactNode
  arrow?: ArrowDirection | false
  arrowAbsolute?: boolean
  className?: string
}

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

function AbsoluteArrow() {
  return (
    <span
      aria-hidden="true"
      className="-ml-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-400 text-mauve-900 transition-transform group-hover:translate-x-1"
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
        <path
          d="M9.36399 0.26356C9.71548 -0.0878208 10.2852 -0.0878859 10.6367 0.26356L19.7364 9.36393C20.0879 9.71541 20.0879 10.2851 19.7364 10.6366L10.6367 19.7364C10.2852 20.0879 9.71547 20.0879 9.36399 19.7364C9.01251 19.3849 9.01251 18.8152 9.36399 18.4637L13.5132 14.3145C14.7731 13.0546 13.8808 10.9003 12.099 10.9003L0.900012 10.9003C0.403014 10.9003 0.000105437 10.4972 0 10.0003C0 9.5032 0.402949 9.10025 0.900012 9.10025L12.0992 9.10025C13.881 9.10025 14.7733 6.94605 13.5135 5.6861L9.36399 1.53624C9.01251 1.18476 9.01251 0.615039 9.36399 0.26356Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

const BASE_CLASS =
  'group inline-flex w-fit items-center gap-3 rounded-full border border-current font-body text-sm font-semibold uppercase tracking-[0.04em] transition-colors'

type AnchorButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className'> & { href: string }
type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className'> & { href?: undefined }

export function Button(props: AnchorButtonProps): React.JSX.Element
export function Button(props: NativeButtonProps): React.JSX.Element
export function Button({ label, arrow = 'down', arrowAbsolute = false, className = '', ...rest }: CommonProps & Record<string, unknown>) {
  if (arrowAbsolute) {
    const pillClasses =
      `inline-flex items-center rounded-full border border-current px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.04em] transition-colors ${className}`.trim()
    const content = (
      <>
        <span className={pillClasses}>{label}</span>
        <AbsoluteArrow />
      </>
    )
    if (typeof rest.href === 'string') {
      return (
        <a {...(rest as ComponentPropsWithoutRef<'a'>)} className="group inline-flex items-center">
          {content}
        </a>
      )
    }
    return (
      <button type="button" {...(rest as ComponentPropsWithoutRef<'button'>)} className="group inline-flex items-center">
        {content}
      </button>
    )
  }

  const classes = `${BASE_CLASS} px-5 py-2 ${className}`.trim()
  const content = (
    <>
      {label}
      {arrow && <Arrow direction={arrow} />}
    </>
  )

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

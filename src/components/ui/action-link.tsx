type ActionLinkProps = {
  href: string
  label: string
  variant?: 'primary' | 'outline' | 'inverse'
}

const variants = {
  primary: 'border-ink bg-accent text-ink hover:bg-ink hover:text-white focus-visible:outline-ink',
  outline:
    'border-ink/60 bg-paper text-ink hover:border-ink hover:bg-canvas focus-visible:outline-ink',
  inverse: 'border-transparent bg-paper text-ink hover:bg-accent focus-visible:outline-white',
}

export function ActionLink({ href, label, variant = 'primary' }: ActionLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 max-w-full items-center justify-center rounded-lg border px-5 py-3 text-center text-sm font-semibold wrap-anywhere focus-visible:outline-2 focus-visible:outline-offset-4 ${variants[variant]}`}
    >
      {label}
    </a>
  )
}

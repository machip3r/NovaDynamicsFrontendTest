type SectionHeadingProps = {
  id: string
  children: string
}

export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="text-3xl leading-[1.15] font-semibold tracking-[-0.03em] text-balance wrap-anywhere sm:text-4xl lg:text-5xl"
    >
      {children}
    </h2>
  )
}

import { forwardRef, type AnchorHTMLAttributes } from 'react'

export const A = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref): JSX.Element => {
  const linkCss =
    'text-primary font-bold hover:opacity-80 outline-transparent focus:outline-primary outline-offset-2 transition-outline duration-300'

  return (
    <a {...props} ref={ref} className={linkCss}>
      {children}
    </a>
  )
})

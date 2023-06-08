import { AnchorHTMLAttributes, forwardRef } from 'react'

export const A = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, ...props }, ref): JSX.Element => {
  const linkCss =
    'text-primary font-bold hover:opacity-80 outline-primary outline-offset-2'

  return (
    <a {...props} ref={ref} className={linkCss}>
      {children}
    </a>
  )
})

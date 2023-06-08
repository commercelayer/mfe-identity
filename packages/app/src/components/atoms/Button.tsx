import { ButtonHTMLAttributes, forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref): JSX.Element => {
  const buttonCss =
    'w-full px-6 py-3 rounded !border-0 text-sm text-center font-bold transition-outline duration-500 bg-black text-white hover:opacity-80 focus:outline-primary focus:outline-offset-4'

  return (
    <button {...props} ref={ref} className={buttonCss}>
      {children}
    </button>
  )
})

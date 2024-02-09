import { forwardRef, type ButtonHTMLAttributes } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref): JSX.Element => {
  const buttonCss =
    'w-full px-6 py-3 rounded !border-0 text-sm text-center font-bold transition-outline duration-300 outline-offset-4 outline-transparent bg-black text-white hover:opacity-80 focus:outline-primary'

  return (
    <button {...props} ref={ref} className={buttonCss}>
      {children}
    </button>
  )
})

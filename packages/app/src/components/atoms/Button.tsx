import { ButtonHTMLAttributes, forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref): JSX.Element => {
  const buttonCss =
    'w-full px-6 py-3 rounded text-sm text-center font-bold transition-opacity duration-500 focus:outline-none bg-black text-white hover:opacity-80'

  return (
    <button {...props} ref={ref} className={buttonCss}>
      {children}
    </button>
  )
})

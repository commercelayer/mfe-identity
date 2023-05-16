import { ButtonHTMLAttributes, forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref): JSX.Element => {
  const buttonCss =
    'inline-flex items-center justify-center font-bold rounded text-sm leading-6 whitespace-nowrap transition duration-700 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 active:outline-none active:ring-2 active:ring-offset-0 border-primary text-white bg-primary hover:opacity-80 focus:ring-gray-300 active:ring-primary active:bg-primary py-2.5 px-12 w-full disabled:bg-gray-100 disabled:text-gray-300'

  return (
    <button {...props} ref={ref} className={buttonCss}>
      {children}
    </button>
  )
})

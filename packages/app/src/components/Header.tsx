import { Logo } from '#components/Logo'
import { useIdentityContext } from '#providers/provider'

export const Header: React.FC = () => {
  const ctx = useIdentityContext()

  return (
    <div className='m-0 mb-[112px] pt-[90px] text-xs text-gray-400'>
      <Logo
        logoUrl={ctx?.state.settings.logoUrl}
        companyName={ctx?.state.settings.companyName}
        className='self-center h-[35px]'
      />
    </div>
  )
}

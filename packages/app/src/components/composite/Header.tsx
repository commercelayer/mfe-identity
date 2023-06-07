import { Logo } from '#components/atoms/Logo'
import { useIdentityContext } from '#providers/provider'

export const Header: React.FC = () => {
  const { settings } = useIdentityContext()

  return (
    <div className='m-0 mb-[112px] pt-[90px] text-xs text-gray-400'>
      <Logo
        logoUrl={settings.logoUrl}
        companyName={settings.companyName}
        className='self-center h-[35px]'
      />
    </div>
  )
}

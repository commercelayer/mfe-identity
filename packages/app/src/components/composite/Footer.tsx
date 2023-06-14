import { LogoCL } from '@commercelayer/react-utils'
import { A } from '#components/atoms/A'

export const Footer: React.FC = () => {
  return (
    <div className='w-full py-3 text-xs text-gray-500 mt-[56px] border-t border-gray-200 lg:(mx-0 px-0 pb-3)'>
      <A target='_blank' href='https://commercelayer.io/' rel='noreferrer'>
        <LogoCL width='114' height='18' />
      </A>
    </div>
  )
}

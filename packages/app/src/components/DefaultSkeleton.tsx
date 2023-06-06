import cn from 'classnames'
import { isEmbedded } from '#utils/isEmbedded'

export const DefaultSkeleton: React.FC = () => {
  const wrapperCss = cn([
    'relative w-full md:w-[420px] mx-auto px-8 md:px-0',
    !isEmbedded() && 'h-screen'
  ])
  return (
    <div className='container antialiased'>
      <div className={wrapperCss}>
        <div className='flex flex-col w-full'>
          <div className='m-0 mb-[112px] pt-[90px] text-xs text-gray-400'>
            <h1 className='font-extrabold uppercase tracking-wide text-xl text-black self-center h-[35px]'>
              Commerce Layer
            </h1>
          </div>
          <h1 className='text-[32px] leading-[38px] text-black font-semibold'>
            Title
          </h1>
          <p className='mt-2 text-sm text-gray-500 font-medium'>
            Lorem ipsum! Lorem ipsum dolor sit amnet.
          </p>
          <form className='mt-8 mb-0'>
            <div className='space-y-4'>
              <div className='field !mb-8'>
                <div className='flex justify-between items-center mb-2'>
                  <label className='text-black leading-6 font-semibold text-base'>
                    Lorem
                  </label>
                </div>
                <input
                  className='block w-full px-4 mt-2 h-[44px] rounded ring-inset outline-0 focus:border-primary focus:ring-primary border-gray-200 text-md'
                  type='email'
                />
              </div>
              <div className='field !mb-8'>
                <div className='flex justify-between items-center mb-2'>
                  <label className='text-black leading-6 font-semibold text-base'>
                    Lorem ipsum
                  </label>
                </div>
                <input
                  className='block w-full px-4 mt-2 h-[44px] rounded ring-inset outline-0 focus:border-primary focus:ring-primary border-gray-200 text-md'
                  type='password'
                />
              </div>
              <div className='flex pt-4'>
                <button
                  type='submit'
                  className='inline-flex items-center justify-center font-bold rounded text-sm leading-6 whitespace-nowrap transition duration-700 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-0 active:outline-none active:ring-2 active:ring-offset-0 border-primary text-white bg-primary hover:opacity-80 focus:ring-gray-300 active:ring-primary active:bg-primary py-2.5 px-12 w-full disabled:bg-gray-100 disabled:text-gray-300'
                >
                  Lorem
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

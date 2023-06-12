const config = require('@commercelayer/react-utils/configs/tailwind')

const pluginsForms = require('@tailwindcss/forms')
config.plugins !== undefined
  ? config.plugins.push(pluginsForms)
  : (config.plugins = [pluginsForms])

module.exports = {
  ...config,
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      colors: {
        inherit: 'inherit'
      },
      fontSize: {
        xxl: '1.625rem',
        md: '0.938rem',
        ss: '0.813rem',
        xxs: '0.75rem',
        '3xs': '0.6875rem'
      },
      inset: {
        19: '4.7rem',
        38: '38rem'
      },
      width: {
        22: '5.75rem',
        sidebar: '240px'
      },
      height: {
        21: '5.325rem'
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66667%'
      },
      minWidth: {
        '1/3': '33.33333%',
        '2/3': '66.66667%'
      },
      minHeight: {
        inherit: 'inherit'
      },
      flex: {
        75: '0 0 75px',
        85: '0 0 85px'
      },
      boxShadow: {
        bottom: '0 2px 0 0 rgba(0, 0, 0, 0.05)',
        inner: '0 0 0 1000px rgba(255, 255, 255, 1) inset',
        'sm-primary': '0 1px 2px 0 var(--primary-light)',
        top: '0px -4px 1px 0px rgb(0, 0, 0, 0.025)',
        alert: '2px 2px 10px #EDEEEE'
      },
      gridTemplateRows: {
        10: 'repeat(10, minmax(0, 1fr))'
      },
      gridRowStart: {
        10: '10'
      },
      gridRowEnd: {
        9: '9',
        10: '10'
      },
      rotate: {
        135: '135deg'
      },
      spacing: {
        15: '3.75rem'
      }
    }
  }
}

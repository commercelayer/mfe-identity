module.exports = {
  reject: [
    'pnpm'
  ],
  filterResults: (name, { upgradedVersionSemver }) => {
    if (
      name === 'react' && parseInt(upgradedVersionSemver?.major) >= 19 ||
      name === 'react-dom' && parseInt(upgradedVersionSemver?.major) >= 19 ||
      name === '@types/react' && parseInt(upgradedVersionSemver?.major) >= 19 ||
      name === '@types/react-dom' && parseInt(upgradedVersionSemver?.major) >= 19 ||
      name === 'tailwindcss' && parseInt(upgradedVersionSemver?.major) >= 4
    ) {
      return false
    }

    return true
  }
}

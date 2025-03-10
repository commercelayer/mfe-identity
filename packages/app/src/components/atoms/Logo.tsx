import type { Settings } from "App"

type LogoProps = Pick<Settings, "logoUrl" | "companyName"> & {
  className?: string
}

export function Logo({
  logoUrl,
  companyName,
  className = "",
}: LogoProps): JSX.Element {
  const logoCss = `max-h-8 max-w-full ${className}`
  const labelCss = `font-extrabold uppercase tracking-wide text-xl text-black ${className}`

  if (logoUrl != null && logoUrl.length > 0) {
    return <img className={logoCss} src={logoUrl} alt={companyName} />
  }
  return <h1 className={labelCss}>{companyName}</h1>
}

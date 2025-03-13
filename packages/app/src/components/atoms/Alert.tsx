import { CheckCircle, XCircle } from "@phosphor-icons/react"
import cn from "classnames"

type AlertVariant = "success" | "danger"

const alertIcons: Record<AlertVariant, JSX.Element> = {
  success: <CheckCircle size={24} />,
  danger: <XCircle size={24} />,
}

interface Props {
  variant: AlertVariant
  title: string
}

export const Alert = ({ variant, title }: Props): JSX.Element => {
  const alertWrapperCss = cn([
    "flex items-center gap-2 p-4 rounded-[5px] border-l-[5px] shadow-alert",
    variant === "success" ? "border-green-400 text-green-400" : "",
    variant === "danger" ? "border-red-400 text-red-400" : "",
  ])

  return (
    <div className={alertWrapperCss}>
      <div>{alertIcons[variant]}</div>
      <div className="font-semibold text-base text-black">{title}</div>
    </div>
  )
}

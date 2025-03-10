interface Props {
  title?: string
  description?: string
}

export const PageHeading = ({ title, description }: Props): JSX.Element => {
  return (
    <>
      {title != null && (
        <h1 className="text-[32px] leading-[38px] text-black font-semibold">
          {title}
        </h1>
      )}
      {description != null && (
        <p className="pt-2 text-sm text-gray-500 font-medium">{description}</p>
      )}
    </>
  )
}

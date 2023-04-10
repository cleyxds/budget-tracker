import { SVGProps } from "react"

const SvgComponent = ({
  size = 48,
  color = "var(--dark-I)",
  ...props
}: {
  size?: number
  color?: string
  props?: SVGProps<SVGSVGElement>
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 96 960 960"
    {...props}
  >
    <path
      fill={color}
      d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"
    />
  </svg>
)
export default SvgComponent

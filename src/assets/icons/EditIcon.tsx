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
      d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
    />
  </svg>
)
export default SvgComponent

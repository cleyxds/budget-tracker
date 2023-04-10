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
      d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h291v60H180v600h291v60H180Zm486-185-43-43 102-102H375v-60h348L621 444l43-43 176 176-174 174Z"
    />
  </svg>
)
export default SvgComponent

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
      d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"
    />
  </svg>
)
export default SvgComponent

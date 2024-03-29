import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={13}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.027 7.66a.828.828 0 0 0 1.16 0L11.97 2.88c.351-.352.351-.879 0-1.195l-.774-.809c-.351-.316-.879-.316-1.195 0l-3.41 3.41L3.215.875C2.898.559 2.37.559 2.02.875l-.774.809c-.351.316-.351.843 0 1.195L6.027 7.66Z"
      fill="#fff"
    />
  </svg>
)

export default SvgComponent

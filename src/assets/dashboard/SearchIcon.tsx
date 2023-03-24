import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m23.672 20.766-4.688-4.688c-.234-.187-.515-.328-.797-.328h-.75a9.774 9.774 0 0 0 2.063-6C19.5 4.406 15.094 0 9.75 0 4.36 0 0 4.406 0 9.75c0 5.39 4.36 9.75 9.75 9.75 2.25 0 4.313-.75 6-2.063v.797c0 .282.094.563.328.797l4.64 4.64c.47.47 1.173.47 1.595 0l1.312-1.312c.469-.422.469-1.125.047-1.593ZM9.75 15.75c-3.328 0-6-2.672-6-6 0-3.281 2.672-6 6-6 3.281 0 6 2.719 6 6 0 3.328-2.719 6-6 6Z"
      fill="#fff"
    />
  </svg>
)

export default SvgComponent

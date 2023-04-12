import formatDecimal from "./formatDecimal"

export default () => {
  const now = new Date()

  const month = now.getMonth()
  const year = now.getFullYear()

  const date = new Date(new Date().setUTCFullYear(year, month))

  return `${date.getFullYear()}-${formatDecimal(date.getMonth() + 1)}`
}

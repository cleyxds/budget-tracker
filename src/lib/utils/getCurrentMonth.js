export function getCurrentMonth() {
  const now = new Date()

  const month = now?.getUTCMonth() + 1
  const year = now?.getUTCFullYear()

  const formatDecimalValue = (value) => {
    if (value <= 9) {
      return `0${value}`
    }

    return value
  }

  return `${formatDecimalValue(month)}/${year}`
}

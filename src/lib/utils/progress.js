export function formatProgressValue(expense) {
  return (
    Math.round(
      ((expense?.price * 100) / expense?.maxPrice + Number.EPSILON) * 100
    ) / 100
  )
}

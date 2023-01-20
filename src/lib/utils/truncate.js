export function truncate(value = 0) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

export default (value: number | string) => {
  if (Number(value) <= 9) return `0${value}`

  return value
}

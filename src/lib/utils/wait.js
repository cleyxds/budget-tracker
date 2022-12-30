export default ({ ms = 1000, random = false }) => {
  const milliseconds = random ? Math.floor(Math.random() * ms) : ms

  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

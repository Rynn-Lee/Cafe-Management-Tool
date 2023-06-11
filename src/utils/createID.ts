export const createID = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  const date = new Date
  const created = characters[Math.floor(Math.random() * characters.length)] + "-" + date.getHours() + date.getMinutes() + date.getSeconds()
  return created
}
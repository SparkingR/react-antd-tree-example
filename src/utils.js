export const delay = ms => func => (...arg) =>
  new Promise(resolve => setTimeout(resolve, ms)).then(() => func(...arg))

export const omitField = (obj, ...props) => {
  const result = { ...obj }
  props.forEach((prop) => {
    delete result[prop]
  })
  return result
}

export const escapeStringRegexp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

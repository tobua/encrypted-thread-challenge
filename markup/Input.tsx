import { scale } from 'optica'
import type { CSSProperties, JSX } from 'react'

const inputStyles: CSSProperties = {
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'black',
  padding: scale(10),
  borderRadius: scale(10),
  fontSize: scale(20),
}

export function Input({ style, ...props }: JSX.IntrinsicElements['input']) {
  return <input {...props} style={{ ...inputStyles, ...style }} />
}

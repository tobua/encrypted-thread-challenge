import { scale } from 'optica'
import type { CSSProperties, JSX } from 'react'

const buttonStyles: CSSProperties = {
  background: '#0450E1',
  color: 'white',
  border: 'none',
  outline: 'none',
  padding: scale(6),
  borderRadius: scale(10),
  fontSize: scale(20),
  cursor: 'pointer',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
}

export function Button({ style, ...props }: JSX.IntrinsicElements['button']) {
  return <button type="button" {...props} style={{ ...buttonStyles, ...style }} />
}

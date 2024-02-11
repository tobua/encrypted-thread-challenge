import { scale } from 'optica'
import { type CSSProperties, useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'

const wrapperStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: scale(10),
  alignItems: 'center',
}

const labelStyles: CSSProperties = {
  background: 'orange',
  padding: scale(10),
  borderRadius: scale(5),
}

const formStyles: CSSProperties = {
  display: 'flex',
  gap: scale(10),
}

export function PasswordPrompt({ handlePassword }: { handlePassword: (password: string) => void }) {
  const [password, setPassword] = useState('')

  return (
    <div style={wrapperStyles}>
      <p style={labelStyles}>⚠️ Existing thread found, enter password to see all replies.</p>
      <form
        style={formStyles}
        onSubmit={(event) => {
          event.preventDefault()
          handlePassword(password)
        }}
      >
        <Input
          placeholder="Encryption Password (optional)"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit">Unlock</Button>
      </form>
    </div>
  )
}

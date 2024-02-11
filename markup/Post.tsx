import Ago from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { scale } from 'optica'
import type { CSSProperties, JSX } from 'react'

Ago.addDefaultLocale(en)
const timeAgo = new Ago('en-US')

const wrapperStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  gap: scale(10),
  paddingBottom: scale(5),
}

const avatarStyles: CSSProperties = {
  width: scale(40),
  height: scale(40),
  borderRadius: '50%',
}

const avatarLetterStyles: CSSProperties = {
  width: scale(40),
  height: scale(40),
  borderRadius: '50%',
  background: 'gray',
  fontSize: scale(24),
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const nameStyles: CSSProperties = { fontWeight: 'bold', fontSize: scale(18) }
const handleStyles: CSSProperties = { color: 'gray', fontSize: scale(18) }
const dateStyles: CSSProperties = { fontSize: scale(18) }

const threadStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: scale(5),
}

const messageStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: scale(10),
  minHeight: scale(50),
  marginBottom: scale(10),
  overflow: 'hidden',
}

const lineStyles: CSSProperties = {
  display: 'flex',
  width: scale(3),
  flex: 1,
  background: 'gray',
}

const contentStyles: CSSProperties = {
  fontFamily: 'sans-serif',
  fontSize: scale(20),
  margin: 0,
  overflow: 'auto',
}

const headerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: scale(10),
}

export function Post({
  content,
  name,
  user,
  avatarUrl,
  avatarLetter,
  date,
  isLast = false,
}: {
  content: string | JSX.Element
  name: string | JSX.Element
  user: string
  avatarUrl?: string
  avatarLetter?: string
  date?: string
  isLast?: boolean
}) {
  return (
    <div style={wrapperStyles}>
      <div style={threadStyles}>
        {avatarUrl ? (
          <img style={avatarStyles} src={avatarUrl} alt={`${user}s avatar`} />
        ) : (
          <span style={avatarLetterStyles}>{avatarLetter}</span>
        )}
        {!isLast && <span style={lineStyles} />}
      </div>
      <div style={messageStyles}>
        <div style={headerStyles}>
          <span style={nameStyles}>{name}</span>
          <span>
            <span style={handleStyles}>{user}</span>
            {date && <span style={dateStyles}> · {timeAgo.format(new Date(date), 'twitter')}</span>}
          </span>
        </div>
        <pre style={contentStyles}>{content}</pre>
      </div>
    </div>
  )
}

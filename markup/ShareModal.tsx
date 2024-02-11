import { it } from 'avait'
import { scale } from 'optica'
import { type CSSProperties, type Dispatch, type FormEvent, type SetStateAction, useCallback, useState } from 'react'
import { encryptPostsToUrl } from '../encryption'
import type { Post } from '../types'
import { Button } from './Button'
import { Close } from './Icon'
import { Input } from './Input'

const wrapperStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
}

const headingStyles: CSSProperties = {
  fontSize: scale(28),
}

const contentStyles: CSSProperties = {
  position: 'relative',
  background: 'white',
  padding: scale(50),
  borderRadius: scale(20),
  gap: scale(20),
  display: 'flex',
  flexDirection: 'column',
}

const closeStyles: CSSProperties = {
  position: 'absolute',
  right: scale(10),
  top: scale(10),
  background: 'none',
  border: 'none',
  cursor: 'pointer',
}

const resultStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: scale(10),
  background: 'lightgray',
  padding: scale(10),
  borderRadius: scale(10),
}

export function ShareModal({
  onClose,
  posts,
  setPosts,
}: { onClose: () => void; posts: Post[]; setPosts: Dispatch<SetStateAction<Post[]>> }) {
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const sharePost = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const enhancedPosts = posts.map((post) => ({ name, handle, ...post }))
      await encryptPostsToUrl(enhancedPosts, password)
      window.sessionStorage.setItem('thread-password', password)
      setPosts(enhancedPosts)
      const shareUrl = window.location.href
      const { error } = await it(window.navigator.clipboard.writeText(shareUrl))
      if (!error) {
        setCopied(true)
      }
      setUrl(shareUrl)
    },
    [posts, name, handle, password, setPosts],
  )

  return (
    <div style={wrapperStyles}>
      <form style={contentStyles} onSubmit={sharePost}>
        <h2 style={headingStyles}>Generate Shareable URL</h2>
        <Input placeholder="Name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
        <Input placeholder="Handle" type="text" value={handle} onChange={(event) => setHandle(event.target.value)} />
        <Input
          placeholder="Encryption Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit">Generate</Button>
        {url && (
          <div style={resultStyles}>
            <Input value={url} disabled={true} />
            {copied && <span>The URL has been copied to the clipboard.</span>}
          </div>
        )}
        <button type="button" style={closeStyles} onClick={onClose}>
          <Close />
        </button>
      </form>
    </div>
  )
}

import { it } from 'avait'
import { scale } from 'optica'
import { type CSSProperties, useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { decryptTextFromHash, hasHash } from './encryption'
import { Threads } from './markup/Icon'
import { PasswordPrompt } from './markup/PasswordPrompt'
import { Post } from './markup/Post'
import { Reply } from './markup/Reply'
import type { Post as PostType } from './types'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'
document.body.style.margin = '0'
document.body.style.padding = '5vmin'

const appStyles: CSSProperties = {
  width: '100%',
  fontFamily: 'sans-serif',
  maxWidth: 800,
  overflow: 'hidden',
}

const headerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const headingStyles: CSSProperties = {
  fontSize: scale(36),
}

const logoStyles: CSSProperties = {
  fontSize: scale(40),
  fontWeight: 'bold',
}

const App = () => {
  const [requiresPassword, setRequiresPassword] = useState(hasHash())
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    async function loadPosts() {
      if (requiresPassword) {
        // If no password available try encryption with empty password.
        const password = window.sessionStorage.getItem('thread-password') ?? ''
        const { error, value: posts } = await it(decryptTextFromHash(password))
        if (error) {
          if (password) {
            console.error(error)
          }
          return
        }
        setPosts(posts)
        setRequiresPassword(false)
      }
    }
    loadPosts()
  }, [requiresPassword])

  const handlePassword = useCallback(async (password: string) => {
    const { error, value: posts } = await it(decryptTextFromHash(password))
    if (error) return alert('Wrong password, please try again.')
    window.sessionStorage.setItem('thread-password', password)
    setPosts(posts)
    setRequiresPassword(false)
  }, [])

  return (
    <div style={appStyles}>
      <header style={headerStyles}>
        <h1 style={headingStyles}>Encrypted Thread Challenge</h1>
        <span style={logoStyles}>
          𝕏 <Threads />
        </span>
      </header>
      <Post
        content={
          <span>
            We have one goal for 2024
            <br />
            <br />
            Flip the default backend JavaScript runtime from Node.js to Bun
          </span>
        }
        name="Bun"
        user="@bunjavascript"
        avatarUrl="https://pbs.twimg.com/profile_images/1739477432972054528/JDeePrD-_x96.jpg"
        date="2023-12-08T02:07:46.000Z"
      />
      <Post
        content="!!"
        name="Elon Musk"
        user="@elonmusk"
        avatarUrl="https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_x96.jpg"
        date="2024-02-09T07:11:11.000Z"
      />
      <Post
        content="I have gotten out of the habit of using ChatGPT and Cursor while coding. Not sure why. Maybe because Bun is so fast."
        name="xlr8harder"
        user="@xlr8harder"
        avatarUrl="https://pbs.twimg.com/profile_images/1684960534473392128/WDzp6cqT_400x400.jpg"
        date="2024-01-10T05:18:56.000Z"
      />
      <Post
        content="What did Ilya see? 🤫"
        name="roon"
        user="@tszzl"
        avatarUrl="https://pbs.twimg.com/profile_images/1735030914382749699/iwS0_jHR_x96.jpg"
        date="2024-01-27T00:19:37.000Z"
      />
      {requiresPassword ? (
        <PasswordPrompt handlePassword={handlePassword} />
      ) : (
        <Reply posts={posts} setPosts={setPosts} />
      )}
    </div>
  )
}

createRoot(document.body).render(<App />)

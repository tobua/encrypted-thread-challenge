import { scale } from 'optica'
import { type CSSProperties, type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import type { Post } from '../types'
import { Button } from './Button'
import { ShareModal } from './ShareModal'

const wrapperStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: scale(50),
}

const shareStyles: CSSProperties = {
  padding: scale(10),
  fontSize: scale(30),
}

export function ShareButton({ posts, setPosts }: { posts: Post[]; setPosts: Dispatch<SetStateAction<Post[]>> }) {
  const [sharing, setSharing] = useState(false)
  const sharePost = useCallback(() => {
    setSharing(true)
  }, [])

  return (
    <div style={wrapperStyles}>
      <Button onClick={sharePost} style={shareStyles}>
        Share Thread
      </Button>
      {sharing && <ShareModal posts={posts} onClose={() => setSharing(false)} setPosts={setPosts} />}
    </div>
  )
}

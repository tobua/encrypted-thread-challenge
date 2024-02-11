import { scale } from 'optica'
import {
  type CSSProperties,
  type Dispatch,
  type FormEventHandler,
  type SetStateAction,
  useCallback,
  useState,
} from 'react'
import type { Post as PostType } from '../types'
import { Button } from './Button'
import { Post } from './Post'
import { ShareButton } from './ShareButton'

const formStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}

const textareaStyles: CSSProperties = {
  display: 'flex',
  width: 'calc(100% - 20px)',
  boxShadow: 'inset 0px 1px 6px 0px rgba(0,0,0,0.5)',
  outline: 'none',
  borderWidth: 0,
  borderRadius: scale(10),
  padding: scale(10),
  fontFamily: 'sans-serif',
  fontSize: scale(20),
  resize: 'none',
  lineHeight: 1.4,
}

const buttonPositionStyles: CSSProperties = {
  position: 'absolute',
  right: scale(15),
  bottom: scale(25),
}

export function Reply({
  posts,
  setPosts,
}: {
  posts: PostType[]
  setPosts: Dispatch<SetStateAction<PostType[]>>
}) {
  const [updated, setUpdated] = useState(false)
  const [message, setMessage] = useState('')
  // At least 4 rows, at max 10 rows, always 1 more row than content.
  const rowCount = Math.min(Math.max(4, (message.match(/\n/g) || []).length + 2), 10)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Rule not working correctly.
  const addReply = useCallback(
    ((event) => {
      event.preventDefault()
      setPosts([...posts, { content: message }])
      setMessage('')
      setUpdated(true)
    }) as FormEventHandler<HTMLFormElement>,
    [message],
  )

  return (
    <div>
      <form style={formStyles} onSubmit={addReply}>
        {posts.map((post, index) => (
          <Post
            key={`${post.content}_${index}`}
            content={post.content}
            name={post.name ?? 'Your Name'}
            user={`@${post.handle ?? 'you'}`}
            avatarLetter={post.name ? post.name[0] : '?'}
          />
        ))}
        <Post
          isLast={true}
          content={
            <textarea
              style={textareaStyles}
              rows={rowCount}
              value={message}
              placeholder="Participate in this thread with your reply"
              onChange={(event) => setMessage(event.target.value)}
            />
          }
          name="Your Name"
          user="@you"
          avatarLetter="?"
        />
        <Button type="submit" style={buttonPositionStyles}>
          Reply
        </Button>
      </form>
      {updated && <ShareButton posts={posts} setPosts={setPosts} />}
    </div>
  )
}

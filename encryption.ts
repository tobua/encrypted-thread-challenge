import type { Post } from './types'

// Salt like this only makes sense on the server in memory.
// window.crypto.getRandomValues(new Uint8Array(16))
const salt = new TextEncoder().encode('public-static-required-salt')

// Generate encryption key from password.
async function deriveKey(password: string) {
  const encodedPassword = new TextEncoder().encode(password)
  const keyMaterial = await window.crypto.subtle.importKey('raw', encodedPassword, 'PBKDF2', false, [
    'deriveBits',
    'deriveKey',
  ])
  const derivedKey = await window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )
  return derivedKey
}

// Encrypt posts data with given password and add the result to the URL hash.
export async function encryptPostsToUrl(posts: Post[], password: string) {
  const key = await deriveKey(password)
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) /* don't reuse key! */ },
    key,
    new TextEncoder().encode(JSON.stringify(posts)),
  )
  // @ts-ignore
  const encryptedText = btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)))
  const encodedContent = encodeURIComponent(encryptedText)
  if (encodedContent.length > 2000) {
    alert('Error: Maximum allowed content size reached.')
  } else {
    window.location.hash = encodedContent
  }
}

// Check if the URL has a hash.
export function hasHash() {
  return !!window.location.hash
}

// Try to decrypt contents found in the URL hash for the given password.
export async function decryptTextFromHash(password: string) {
  const { hash } = window.location
  if (!hash) {
    return []
  }
  const cleanHash = decodeURIComponent(hash.substring(1)) // Remove the # in front.
  const key = await deriveKey(password)
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(12) },
    key,
    new Uint8Array(Array.from(atob(cleanHash)).map((c) => c.charCodeAt(0))).buffer,
  )
  const decoded = new window.TextDecoder().decode(new Uint8Array(decrypted))
  return JSON.parse(decoded)
}

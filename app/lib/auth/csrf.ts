export function getCSRFToken(): string | null {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/csrf-token=([^;]+)/)
    return match ? match[1] : null
  }
  return null
}

export function setCSRFHeader(headers: HeadersInit = {}): HeadersInit {
  const csrfToken = getCSRFToken()
  if (csrfToken) {
    return {
      ...headers,
      'X-CSRF-Token': csrfToken
    }
  }
  return headers
}
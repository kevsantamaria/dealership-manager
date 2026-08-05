import { env } from '../env'

type ApiOptions = RequestInit & {
  json?: unknown
}

type ApiResponse<T> = {
  message: string
  data: T
}

export async function api<T = unknown>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const { json, headers, ...rest } = options

  const res = await fetch(env.API_URL + path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: json ? JSON.stringify(json) : rest.body,
    ...rest,
  })

  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const data = await res.json()
      message = data?.message || message
    } catch {}

    throw new Error(message)
  }

  if (res.status === 204) return undefined as T

  const data: ApiResponse<T> = await res.json()
  return data.data
}

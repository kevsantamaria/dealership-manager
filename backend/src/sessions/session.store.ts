import { randomUUID } from 'crypto'

export interface SessionData {
  userId: number
  role: 'admin' | 'user'
}

const sessions = new Map<string, SessionData>()

export const createSession = (data: SessionData) => {
  const sessionId = randomUUID()
  sessions.set(sessionId, data)
  return sessionId
}

export const getSession = (sessionId: string) => {
  return sessions.get(sessionId)
}

export const deleteSession = (sessionId: string) => {
  sessions.delete(sessionId)
}

declare namespace Express {
  interface Request {
    user?: {
      userId: number
      role: 'admin' | 'user'
    }
  }
}
import type { Request, Router } from 'express'
import cookieSession from 'cookie-session'

const session_key = 'user'

export type Session<User> = {
  /**
   * @throws "session not found"
   * @throws "user not found"
   */
  get(): User

  /**
   * @throws "session not found"
   */
  set(user: User): void
}

class UserSession<User> implements Session<User> {
  constructor(
    private _request: Request
  ) {}

  private get _session() {
    const session = this._request.session

    if (!session) {
      throw new Error('session not found')
    }

    return session
  }

  set(user: User) {
    this._session[session_key] = user
  }

  get(): User {
    const user = this._session[session_key]

    if (!user) {
      throw new Error('user not found')
    }

    return user
  }
}

export type WithSession<User> = {
  user: Session<User>
}

export const useCookieUser = (app: Router, secret: string) => {
  app.use(cookieSession({ keys: [secret] }))
  app.use((request: any, _, next) => {
    request.user = new UserSession(request)
    next()
  })
}

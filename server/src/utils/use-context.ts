import type { Request, Router } from 'express'

export type WithContext<Context> = {
  context: Context
}

export const useContext = (app: Router, context: unknown) => {
  app.use((request: any, _, next) => {
    request.context = context
    next()
  })
}

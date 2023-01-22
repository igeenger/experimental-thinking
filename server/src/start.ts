import 'express-async-errors'

import path from 'path'
import express from 'express'

import { useContext } from '@/utils/use-context'
import { useCookieUser } from '@/utils/use-cookie-user'
import { useRouters, useNotFoundRouter, useErrorRouter, useProxyServerSecret } from '@/utils/use-routers'

import { config } from './config'
import { createContext } from './context'

const startServer = async () => {
  const app = express()

  if (config.env.proxy) {
    useProxyServerSecret(app, config.env.secret)
  }
  
  app.use(express.static(path.resolve(process.cwd(), 'public')))
  app.use(express.json())

  useContext(app, await createContext())
  useCookieUser(app, config.env.secret)

  await useRouters(app, path.resolve(__dirname, 'api'), '/api')
  useNotFoundRouter(app)
  useErrorRouter(app, config.static.errorsFile)
  
  app.listen(process.env.PORT ?? 3000, () => {
    console.log('Server started 🚀')
  })
}

startServer().catch(console.error)

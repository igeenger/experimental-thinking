import { Router } from 'express'
import fs from 'mz/fs'
import path from 'path'
import type { NextFunction, Request, Response } from 'express'

export const useProxyServerSecret = (app: Router, secret: string) => {
  app.use((req, res, next) => {
    if (req.headers['secret'] === secret) {
      Object.defineProperty(req, 'ip', {
        get() {
          return req.headers['ip']
        }
      })
      return next()
    } else {
      return res.sendStatus(403)
    }
  })
}

export const useRouters = async (app: Router, apiDirectory: string, url = '/') => {
  const files = await fs.readdir(apiDirectory)

  await Promise.all(files.map(fileName => (
    async () => {
      const file = path.resolve(apiDirectory, fileName)
      const stat = await fs.stat(file)

      if (stat.isFile()) {
        const router: Router = require(file).default
        app.use(url, router)
      }
    })()
  ))
}

export const useErrorRouter = (app: Router, errorsFile: string) => {
  app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    res.sendStatus(500)
    fs.appendFile(
      errorsFile,
      `${new Date()}\n${req.ip}\n${err.message}\n${err.stack}\n\n`,
      (error) => {
        if (error) {
          console.error(error)
        }
      }
    )
  })
}

export const useNotFoundRouter = (app: Router) => {
  app.use((_, res) => res.sendStatus(404))
}

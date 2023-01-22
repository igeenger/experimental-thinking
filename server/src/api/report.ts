import { config } from '@/config'
import { Router } from 'express'
import { fs } from 'mz'

const router = Router()

router.get('/report', async (request, response) => {
  if (request.query.password !== config.env.secret) {
    return response.sendStatus(404)
  }
  fs.readFile(config.static.errorsFile, (_, data) => {
    return response.send(`<pre>${data?.toString() ?? '✅ No errors'}</pre>`)
  })
})

export default router

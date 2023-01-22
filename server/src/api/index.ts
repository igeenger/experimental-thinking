import { Router } from 'express'
import path from 'path'

const router = Router()

router.get('/', async (_, response) => {
  response.sendFile(path.resolve(process.cwd(), 'public', 'index.html'))
})

export default router

import { Router } from 'express'
import type { UserOutput } from '@/common/api'

const router = Router()

router.get('/users', async (request, response) => {
  const users: UserOutput[] = await request.context.db.users()
  return response.json(users)
})

export default router

import { Router } from 'express'
import { v4 as generateString } from 'uuid'

import type { RegInput, RegOutput } from '@/common/api'
import { validate } from '@/utils/validator'
import { CyclicCounter } from '@/utils/cyclic-counter'

const router = Router()

const variantGenerator = new CyclicCounter(3)

router.post('/reg', async (request, response) => {
  const input = validate<RegInput>(request.body, {
    name: {
      type: 'string',
      required: true,
    },
    sex: {
      type: 'string',
      required: true,
      pattern: /^(м|ж)$/,
    },
    age: {
      type: 'integer',
      required: true,
      minimum: 1,
    },
    mood: {
      type: 'integer',
      required: true,
      minimum: 1,
      maximum: 5,
    },
  })

  const userId = generateString()
  const variant = variantGenerator.next()

  request.user.set({
    id: userId,
    ip: request.ip,

    name: input.name,
    sex: input.sex,
    age: input.age,
    mood: input.mood,

    variant,
    attempts: [],
  })

  const output: RegOutput = { variant }

  return response.json(output)
})

export default router

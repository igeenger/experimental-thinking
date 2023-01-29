import { AnswerColorChoice, AnswerColorsCompare, AttemptInput, AttemptOutput } from '@/common/api'
import { maxAttemptsCount } from '@/common/constants'
import { validate } from '@/utils/validator'
import { randomNaturalNumber } from '@/utils/random'

import { Router } from 'express'

const router = Router()

router.post('/attempt', async (request, response) => {
  const input = validate<AttemptInput>(request.body, {
    answer: {
      type: 'integer',
      required: true,
      minimum: 0,
      maximum: 1,
    }
  })

  const { cash, db } = request.context

  const user = request.user.get()

  if (user.attempts.length === maxAttemptsCount) {
    throw new Error(`${user.id}: attempts count = ${maxAttemptsCount}`)
  }

  const wasRightAnswer = (
    await randomNaturalNumber(3) === 1 // [1..3]
      ? input.answer === 0 // 1
      : input.answer === 1 // 2,3
  )

  user.attempts.push(Number(wasRightAnswer)) // 0,1

  if (
    user.variant === 1 && input.answer === AnswerColorChoice.blue
    || user.variant === 2 && input.answer === AnswerColorsCompare.same
    || user.variant === 3 && input.answer === AnswerColorsCompare.same
  ) {
    user.rightAttemptsCount++
  }

  if (user.attempts.length === maxAttemptsCount) {
    await db.appendUser(user, cash.hasIP(user.ip))
    cash.addIP(user.ip)
  }

  const output: AttemptOutput = {
    result: wasRightAnswer
  }

  return response.json(output)
})

export default router

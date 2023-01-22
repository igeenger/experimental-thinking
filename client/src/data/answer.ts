import type { answer } from '@/common/api'

export type AnswerHandler = (
  answer: answer,
  onResponse: (result: boolean) => Promise<void>
) => Promise<void>

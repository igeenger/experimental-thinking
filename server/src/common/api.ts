/* reg */

export type RegInput = {
  name: string
  sex: string
  age: number
  mood: number
}

export type RegOutput = {
  variant: number
}

/* attempt */

export type answer = 0 | 1

export type AttemptInput = {
  answer: answer
}

export type AttemptOutput = {
  result: boolean
}

/* add email */

export type AddEmailInput = {
  email: string
}

/* users */

export interface UserOutput {
  id: string
  name: string
  points: number
}

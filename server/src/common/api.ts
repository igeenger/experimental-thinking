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

export enum AnswerColorChoice {
  red,  // 1/3
  blue, // 2/3
}

export enum AnswerColorsCompare {
  different, // 1/3
  same, // 2/3
}

export type answer = AnswerColorChoice | AnswerColorsCompare

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

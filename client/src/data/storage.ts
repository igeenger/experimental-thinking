import type { CardColor } from './color'

export enum Screen {
  reg = 'reg',
  instruction = 'instruction',
  testing = 'testing',
  thanks = 'thanks',
}

export const storage = {
  get screen() {
    return localStorage.getItem('screen') as Screen ?? Screen.reg
  },
  set screen(value: Screen) {
    localStorage.setItem('screen', value)
  },

  get nikname() {
    return localStorage.getItem('nikname') || ''
  },
  set nikname(value: string) {
    localStorage.setItem('nikname', value)
  },

  get variant() {
    return Number(localStorage.getItem('variant'))
  },
  set variant(value: number) {
    localStorage.setItem('variant', String(value))
  },

  get attempts() {
    return Number(localStorage.getItem('attempts'))
  },
  set attempts(value: number) {
    localStorage.setItem('attempts', String(value))
  },

  get guessed() {
    return Number(localStorage.getItem('guessed'))
  },
  set guessed(value: number) {
    localStorage.setItem('guessed', String(value))
  },

  get color() {
    return localStorage.getItem('color') as CardColor
  },
  set color(value: CardColor) {
    localStorage.setItem('color', value)
  },

  get persons() {
    return JSON.parse(localStorage.getItem('persons') ?? '[]') as string[]
  },
  set persons(value: string[]) {
    localStorage.setItem('persons', JSON.stringify(value))
  },
}

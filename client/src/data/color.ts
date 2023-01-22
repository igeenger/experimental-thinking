export enum CardColor {
  red = 'red',
  blue = 'blue',
}

export const otherColor = (color: CardColor) => (
  color === CardColor.red
    ? CardColor.blue
    : CardColor.red
)

export const randomColor = (): CardColor => (
  Math.floor(Math.random() * 2) // [0..1]
    ? CardColor.red
    : CardColor.blue
)

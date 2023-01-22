import { randomInt } from 'crypto'

/**
 * @returns [1..count]
 */
export const randomNaturalNumber = (count: number) => new Promise((resolve, reject) => {
  randomInt(count, (err, randomValue) => {
    if(err) {
      return reject(err)
    }
    return resolve(randomValue + 1)
  })
})

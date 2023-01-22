<script lang="ts" context="module">
  import arrayShuffle from 'array-shuffle'

  const generateRandomPersons = () => {
    const persons: string[] = []
    for (let n = 1; n <= 25; n++) {
      persons.push(n + 'm')
      persons.push(n + 'f')
    }
    return arrayShuffle(persons)
  }
</script>

<script lang="ts">
  import { maxAttemptsCount } from '@/common/constants'
  import { storage } from '@/data/storage'
  import { CardColor, randomColor, otherColor } from '@/data/color'
  import type { AnswerHandler } from '@/data/answer'

  import Button from '@/ui/Button.svelte'
  import Card from '@/ui/Card.svelte'
    
  export let onAnswer: AnswerHandler

  let card: Card
  
  enum Answer {
    different, // 1/3
    same, // 2/3
  }

  const persons = (
    storage.persons.length 
      ? storage.persons  
      : storage.persons = generateRandomPersons()
  )

  let attempts = storage.attempts

  const colorTags: Record<CardColor, string> = {
    [CardColor.blue]: 'b',
    [CardColor.red]: 'r',
  }
  const srcFrom = (withHat: boolean, color?: CardColor) => (
    color
      ? `img/${person}${withHat ? 'h' : 'w'}${colorTags[color]}.png`
      : undefined
  )
  
  let front: CardColor = storage.color ?? randomColor()
  let back: CardColor | undefined
  $: person = persons[attempts]
  $: console.log(person)

  const generateNewCard = () => {
    if (attempts < maxAttemptsCount) {
      attempts++
      front = randomColor()
      storage.color = front
    }
  }

  const onResult = (
    backColor: (result: boolean) => CardColor
  ) => async (
    result: boolean
  ) => {
    back = backColor(result)
    await card.reveralAndSwipe(result, generateNewCard)
  }
</script>

<style lang="scss">
  .card {
    display: flex;
    justify-content: center;
    overflow: hidden;
    background-color: #ffffff;
    border: 1px solid $gray;

    img {
      margin-top: -5%;
      height: 110%;
    }
  }
</style>

<Card bind:this={card}>
  <div class="card" slot="front">
    <img alt="front" src={srcFrom(true, front)} />
  </div>
  <div class="card" slot="back">
    <img alt="back" src={srcFrom(false, back)} />
  </div>
</Card>

<div>
  <Button
    text="одинаковые"
    color="unknown"
    onClick={() => onAnswer(
      Answer.same,
      onResult(result => result ? front : otherColor(front)
    ))}
  />
  <Button
    text="разные"
    color="unknown"
    onClick={() => onAnswer(
      Answer.different,
      onResult(result => result ? otherColor(front) : front)
    )}
  />
</div>

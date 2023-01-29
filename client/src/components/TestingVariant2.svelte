<script lang="ts">
  import { AnswerColorsCompare } from '@/common/api'
  import { storage } from '@/data/storage'
  import { CardColor, randomColor, otherColor } from '@/data/color'
  import type { AnswerHandler } from '@/data/answer'

  import Button from '@/ui/Button.svelte'
  import Card from '@/ui/Card.svelte'
    
  export let onAnswer: AnswerHandler

  let card: Card
  
  let front: CardColor = storage.color ?? randomColor()
  let back: CardColor | undefined

  const generateNewCard = () => {
    front = randomColor()
    storage.color = front
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
  .red {
    background-color: $red;
  }
  .blue {
    background-color: $blue;
  }
</style>

<Card bind:this={card}>
  <div
    slot="front"
    class:red={front === CardColor.red}
    class:blue={front === CardColor.blue}
  />
  <div
    slot="back"
    class:red={back === CardColor.red}
    class:blue={back === CardColor.blue}
  />
</Card>

<div>
  <Button
    text="одинаковые"
    color="unknown"
    onClick={() => onAnswer(
      AnswerColorsCompare.same,
      onResult(result => result ? front : otherColor(front)
    ))}
  />
  <Button
    text="разные"
    color="unknown"
    onClick={() => onAnswer(
      AnswerColorsCompare.different,
      onResult(result => result ? otherColor(front) : front)
    )}
  />
</div>

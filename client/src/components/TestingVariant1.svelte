<script lang="ts">
  import { CardColor, otherColor } from '@/data/color'
  import type { AnswerHandler } from '@/data/answer'

  import Button from '@/ui/Button.svelte'
  import Card from '@/ui/Card.svelte'
    
  export let onAnswer: AnswerHandler

  let card: Card
  
  enum Answer {
    red,  // 1/3
    blue, // 2/3
  }
  
  let back: CardColor | undefined

  const onResult = (
    selectedColor: CardColor
  ) => async (
    result: boolean
  ) => {
    back = result ? selectedColor : otherColor(selectedColor)
    await card.reveralAndSwipe(result)
  }
</script>

<style lang="scss">
  .unknown {
    background: repeating-linear-gradient(
      -45deg,
      $gray,
      $gray 20px,
      #FFFFFF 20px,
      #FFFFFF 40px
    );
    border: 1px solid $gray;
  }
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
    class="unknown"
  />
  <div
    slot="back"
    class:red={back === CardColor.red}
    class:blue={back === CardColor.blue}
  />
</Card>

<div>
  <Button
    text="красный"
    color="red"
    onClick={() => onAnswer(Answer.red, onResult(CardColor.red))}
  />
  <Button
    text="синий"
    color="blue"
    onClick={() => onAnswer(Answer.blue, onResult(CardColor.blue))}
  />
</div>

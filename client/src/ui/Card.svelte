<script lang="ts">
  import delay from 'delay'
  import { fade, fly } from 'svelte/transition'

  let showFront = true
  let result: boolean | undefined
  $: hasResult = typeof result === 'boolean'

  let hidden = false

  export const reveralAndSwipe = async (
    answerResult: boolean,
    resetFront?: () => void
  ) => {
    result = answerResult
    showFront = false
    await delay(1000)

    hidden = true
    await delay(500)
    
    resetFront?.()
    result = undefined
    showFront = true
    hidden = false
    await delay(500)
  }
</script>

<style lang="scss">
  $size: 75%;

  .container {
    position: relative;
    margin: 1em;
    width: $size;
    padding-bottom: $size;
  }

  .card {
    position: absolute;
    width: 100%;
    height: 100%;
    perspective: 1000px;
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;

    &.active {
      transition: transform 1s;
      transform: rotateY(180deg);
    }
    
    :global {
      & > * {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 10px;
      }
      &:nth-child(2) {
        transform: rotateY(180deg);
      }
    }
  }

  .material-symbols-outlined {
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 10rem;
    }
    
    &.done {
      color: $success;
      &::before {
        content: 'done';
      }
    }
    
    &.close {
      color: $error;
      &::before {
        content: 'close';
      }
    }
  }
</style>

<div class="container">
  {#if !hidden}
    <div class="card" out:fly={{x: -200}} in:fly={{x: 200}}>
      <div class="card-inner" class:active={hasResult}>
        <slot name="front" />
        <slot name="back" />
      </div>
      {#if hasResult}
        <span class="material-symbols-outlined"
          class:done={result}
          class:close={!result}
          in:fade={{duration: 500}}
        />
      {/if}
    </div>
  {/if}
</div>

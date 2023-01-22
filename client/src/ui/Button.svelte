<script lang="ts" context="module">
  import { writable } from 'svelte/store'
  const actionsDisabled = writable(false)
</script>

<script lang="ts">
  export let text: string
  export let color: 'blue' | 'red' | 'success' | 'unknown'
  export let onClick: () => void | Promise<void>

  let clicked = false

  const handleOnClick = async () => {
    clicked = true
    $actionsDisabled = true
    try {
      await onClick()
    } finally {
      $actionsDisabled = false
      clicked = false
    }
  }
</script>

<style lang="scss">
  button {
    min-width: 10em;
    padding: 0.5em 1.5em;
    margin: $margin;
    border-radius: 1em;
    border: none;
    box-shadow: $shadow;
    cursor: pointer;
    box-sizing: border-box;

    &.clicked {
      box-shadow: none;
      margin: calc($margin - 1px);
      border-bottom: 1px solid #000000;
    }
  }

  .blue {
    background-color: $blue;
  }
  .red {
    background-color: $red;
  }
  .success {
    background-color: $success;
  }
  .unknown {
    background-color: $unknown;
  }
</style>

<button
  class:blue={color === 'blue'}
  class:red={color === 'red'}
  class:success={color === 'success'}
  class:unknown={color === 'unknown'}
  class:clicked

  disabled={$actionsDisabled}

  on:click={handleOnClick}
>
  { text }
</button>

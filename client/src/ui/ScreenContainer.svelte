<script lang="ts">
  import { fly } from 'svelte/transition'

  const outFly = {duration: 200, delay: 0, x: -200}
  const inFly = {duration: 200, delay: 200, x: 200}
</script>

<style lang="scss">
  .screen {
    background-color: $background;
    box-shadow: $shadow;
    padding-bottom: 0.4em;
    width: 100vw;
    max-width: 500px;
    @media screen and (max-width: 500px) {
      min-height: 100vh;
    }
  }
</style>

<div class="screen" out:fly={outFly} in:fly={inFly}>
  <slot />
</div>

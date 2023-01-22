<script lang="ts">
  export let label: string
  export let required: boolean = false
  export let error: string = ''
</script>

<style lang="scss">
  .control {
    width: 10em;
    margin: $margin;
  }
  .label {
    font-size: 0.8rem;
    font-weight: bold;
    margin-left: 2px;
    &.required::after {
      content: ' (*)';
      font-size: 0.6rem;
    }
  }
  .error {
    font-size: 0.8rem;
    color: $error;
  }
</style>

<div class="control">
  <div class="label" class:required>{label}</div>
  <slot />
  {#if error}
    <div class="error">
      {error}
    </div>
  {/if}
</div>

<script lang="ts">
  export let value: string
  export let variants: string[]
</script>

<style>
  select {
    width: 100%;
  }
</style>

<select bind:value>
  {#each variants as variant}
    <option value={variant}>{variant}</option>
  {/each}
</select>

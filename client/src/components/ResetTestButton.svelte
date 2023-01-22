<script lang="ts">
  const repeat = () => {
    localStorage.clear()
    location.reload()
  }
  
</script>

<style>
  button {
    margin: 10px;
  }
</style>

<button on:click={repeat}>начать заново (тестовая кнопка)</button>

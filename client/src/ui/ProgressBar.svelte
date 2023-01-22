<style lang="scss">
  .container {
    width: 90%;
    height: 8px;
    background-color: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 50px;
  }
  .progress {
    height: 8px;
    background-color: $success;
    border-radius: 50px;
    transition: width 1s;
  }
</style>

<script lang="ts">
  export let value: number
</script>

<div class="container">
  <div class="progress" style="width: {value}%"></div>
</div>

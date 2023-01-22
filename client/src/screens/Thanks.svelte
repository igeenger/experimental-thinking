<script lang="ts">
  import RatingTable from '@/components/RatingTable.svelte'
  import { storage } from '@/data/storage'
  import { api } from '@/data/api'

  const points = storage.guessed * 10
  const percent = Math.round(points / 500 * 100)
</script>

<h1>Спасибо за прохождение эксперимента!</h1>

<p>Вы набрали {points} баллов из 500 возможных, процент правильных угадываний: {percent}%.</p>

{#await api.users()}
  <p>Загружаем общий рейтинг...</p>
{:then users}
  <RatingTable {users} />
{/await}

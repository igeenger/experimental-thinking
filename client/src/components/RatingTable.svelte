<script lang="ts">
  import type { UserOutput } from '@/common/api'
  import { storage } from '@/data/storage'
  
  export let users: UserOutput[]

  type SortedUsers = UserOutput & {
    rating: number
  }

  const nikname = storage.nikname

  $: sortedUsers = users
    .sort((user1, user2) => user2.points - user1.points)
    .map<SortedUsers>((user, i) => (({
      ...user,
      rating: i + 1
    })))
    .sort(user1 => user1.name === nikname ? -1 : 1)
</script>

<style lang="scss">
  table {
    border-radius: 10px;
    margin: 5%;
    width: 90%;
    border-collapse: collapse;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: $success;
    font-size: 1em;
  }

  td {
    font-size: larger;
    background-color: #ffffff;
    font-size: 1em;
    word-break: break-all;
  }

  tr.highlighted td {
    background-color: $unknown;
  }
</style>

<table class="rounded-border">
  <thead>
    <tr>
      <th>Место</th>
      <th>Псевдоним</th>
      <th>Баллов</th>
    </tr>
  </thead>
  <tbody>
    {#each sortedUsers as user (user.id)}
      <tr class:highlighted={user.name === nikname}>
        <td>{user.rating}</td>
        <td>{user.name}</td>
        <td>{user.points}</td>
      </tr>
    {/each}
  </tbody>
</table>

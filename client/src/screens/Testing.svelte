<script type="ts">
  import { maxAttemptsCount } from '@/common/constants'
  import { api } from '@/data/api'
  import { storage } from '@/data/storage'
  import type { AnswerHandler } from '@/data/answer'

  import ProgressBar from '@/ui/ProgressBar.svelte'
  import AlignCenter from '@/ui/AlignCenter.svelte'

  import TestingVariant1 from '@/components/TestingVariant1.svelte'
  import TestingVariant2 from '@/components/TestingVariant2.svelte'
  import TestingVariant3 from '@/components/TestingVariant3.svelte'

  export let onFinish: () => void
  
  const variant = storage.variant

  let attempts = storage.attempts
  $: storage.attempts = attempts

  let guessed = storage.guessed
  $: storage.guessed = guessed

  const sendAttemptAnswer: AnswerHandler = async (answer, onResult) => {
    const { result } = await api.attempt({ answer })

    if (result) {
      guessed++
    }
    
    await onResult(result)

    attempts++

    if (attempts === maxAttemptsCount) {
      onFinish()
    }
  }
</script>

<AlignCenter>
  <h1>{guessed * 10}</h1>
  <ProgressBar value={attempts / 50 * 100} />

  {#if attempts < maxAttemptsCount}
    {#if variant === 1}
      <TestingVariant1 onAnswer={sendAttemptAnswer} />
    {:else if variant === 2}
      <TestingVariant2 onAnswer={sendAttemptAnswer} />
    {:else}
      <TestingVariant3 onAnswer={sendAttemptAnswer} />
    {/if}
  {/if}
</AlignCenter>

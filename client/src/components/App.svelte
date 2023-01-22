<script type="ts">
  import '@/ui/GlobalStyles.svelte'
  
  import { Screen, storage } from '@/data/storage'

  import Reg from '@/screens/Reg.svelte'
  import Instruction from '@/screens/Instruction.svelte'
  import Testing from '@/screens/Testing.svelte'
  import Thangs from '@/screens/Thanks.svelte'

  import ScreenContainer from '@/ui/ScreenContainer.svelte'
  import AlignCenter from '@/ui/AlignCenter.svelte'

  let screen = storage.screen
  $: storage.screen = screen
</script>

<AlignCenter>
  {#if screen === Screen.reg}
    <ScreenContainer>
      <Reg onStart={() => screen = Screen.instruction} />
    </ScreenContainer>
  {/if}

  {#if screen === Screen.instruction}
    <ScreenContainer>
      <Instruction onContinue={() => screen = Screen.testing} />
    </ScreenContainer>
  {/if}

  {#if screen === Screen.testing}
    <ScreenContainer>
      <Testing onFinish={() => screen = Screen.thanks} />
    </ScreenContainer>
  {/if}

  {#if screen === Screen.thanks}
    <ScreenContainer>
      <Thangs />
    </ScreenContainer>
  {/if}
</AlignCenter>

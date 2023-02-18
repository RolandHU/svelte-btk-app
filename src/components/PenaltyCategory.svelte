<script>
  import { v4 as uuid4 } from 'uuid'
  import Penalty from './Penalty.svelte'
  import PenaltyMain from './PenaltyMain.svelte'
  export let title
  export let penalties
</script>

<h2 class="mt-14 mb-7 text-3xl md:text-5xl text-cyan-600 font-bold">{title}</h2>
<div class="flex flex-col gap-5">
  {#each penalties as penalty (uuid4())}
    {#if Object.keys(penalty).includes('MinJail') && !penalty.Paragraph.match(/\d+\.\d+/gm)}
      <Penalty data={penalty} on:add on:remove />
    {:else if !Object.keys(penalty).includes('MinJail')}
      <PenaltyMain data={penalty} penalties={penalties.filter(p => p.Paragraph.split('.')[0] === penalty.Paragraph.replace('§', ''))} on:add on:remove />
    {/if}
  {/each}    
</div>
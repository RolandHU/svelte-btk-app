<script>
  import { v4 as uuid4 } from 'uuid'
  import Penalty from './Penalty.svelte'
  export let data
  export let penalties
</script>

<details id={data.Paragraph} class="border border-slate-700 overflow-clip">
  <summary class="px-10 py-5 list-none text-xl font-semibold bg-slate-800 cursor-pointer">
    <h3>{data.Name}</h3>
  </summary>
  <section class="flex flex-col gap-2.5 p-5 border-t border-slate-700">
    {#each penalties as penalty (uuid4())}
      <Penalty data={penalty} on:add on:remove />
    {/each}
  </section>
</details>
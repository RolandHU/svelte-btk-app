<script>
  import { v4 as uuid4 } from 'uuid'
  import { createEventDispatcher } from 'svelte'
  import MdMenu from 'svelte-icons/md/MdMenu.svelte'
  import MdClose from 'svelte-icons/md/MdClose.svelte'
  import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte'
  import MdDelete from 'svelte-icons/md/MdDelete.svelte'
  export let penalties
  export let storedPenalties

  let state = false
  const dispatcher = createEventDispatcher()
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' })
  $: penaltyAmount = Object.values(storedPenalties).reduce((p, n) => p + n, 0)

  function clear(paragraph) {
    dispatcher('clear', { paragraph: paragraph })
  }

  function reset() {
    dispatcher('reset')
  }
</script>

<section class={`absolute md:relative ${state ? "w-full md:w-2/5 md:max-w-3xl" : null} h-full flex flex-col`}>
  <header class={`flex pr-5 ${state ? "border-r border-b border-slate-700 bg-slate-800" : "absolute"}`}>
    <button class="w-6 h-6 m-5" on:click={() => state = !state}>
      {#if state}
        <MdClose />
      {:else}
        <MdMenu />
      {/if}
    </button>
    <p class="h-max px-5 py-1 ml-auto my-auto border border-slate-700 bg-slate-800">{(penaltyAmount < 100) ? penaltyAmount : '99+'}</p>
  </header>
  {#if state}
    <main class="w-full h-full flex flex-col border-r border-slate-700 bg-slate-800 overflow-clip">
      <section class="relative w-full h-full flex flex-1 flex-col overflow-auto">
        <div class="flex-1">
          {#each penalties as penalty (uuid4())}
            <div class="flex gap-5 px-5 py-4 border-b border-slate-700">
              <p>{storedPenalties[penalty.Paragraph]}</p>
              <p class="flex-1">{penalty.Name}</p>
              <button class="w-6 h-6 m-auto" on:click={clear(penalty.Paragraph)}><MdClose /></button>
            </div>
          {/each}            
        </div>
        <div class="sticky bottom-0 flex gap-2.5 px-5 py-5 border-t-2 border-slate-700 bg-slate-800">
          <p class="flex-1">{penaltyAmount} összesen</p>
          <button class="w-6 h-6"><MdContentCopy /></button>
          <button class="w-6 h-6" on:click={reset}><MdDelete /></button>          
        </div>     
      </section>
      <footer class="grid grid-cols-2 border-t border-slate-700">
        <p class="p-5 ring-1 ring-slate-700 text-slate-500">MIN. BÜNTETÉS<br><b class="text-5xl text-cyan-600">${formatter.format(penalties.map(p => storedPenalties[p.Paragraph] * p.MinTicket).reduce((p, n) => p + n, 0))}</b></p>
        <p class="p-5 ring-1 ring-slate-700 text-slate-500">MAX. BÜNTETÉS<br><b class="text-5xl text-cyan-600">${formatter.format(penalties.map(p => storedPenalties[p.Paragraph] * p.MaxTicket).reduce((p, n) => p + n, 0))}</b></p>
        <p class="p-5 ring-1 ring-slate-700 text-slate-500">MIN. LETÖLTENDŐ<br><b class="text-5xl text-cyan-600">{penalties.map(p => storedPenalties[p.Paragraph] * p.MinJail).reduce((p, n) => p + n, 0)}p</b></p>
        <p class="p-5 ring-1 ring-slate-700 text-slate-500">MAX. LETÖLTENDŐ<br><b class="text-5xl text-cyan-600">{penalties.map(p => storedPenalties[p.Paragraph] * p.MaxJail).reduce((p, n) => p + n, 0)}p</b></p>
      </footer>        
    </main>
  {/if}  
</section>
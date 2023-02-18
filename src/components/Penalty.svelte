<script>
  import { createEventDispatcher } from 'svelte'
  import MdAdd from 'svelte-icons/md/MdAdd.svelte'
  import MdRemove from 'svelte-icons/md/MdRemove.svelte'
  export let data

  const dispatcher = createEventDispatcher()
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' })

  function add() {
    dispatcher('add', { paragraph: data.Paragraph })
  }

  function remove() {
    dispatcher('remove', { paragraph: data.Paragraph })
  }

</script>

<details id={data.Paragraph} class="border border-slate-700 overflow-clip">
  <summary class="flex flex-col md:flex-row list-none text-xl bg-slate-800 cursor-pointer">
    <h3 class="flex-1 pl-10 pt-5 md:py-5 font-semibold">{data.Name}</h3>
    <p class="px-10 md:px-5 pb-5 md:pb-0 md:m-auto text-slate-500">{data.ID}</p>
    <button class="w-full md:w-14 h-14 md:h-auto p-4 border-y md:border-x md:border-y-0 border-slate-600 bg-slate-700" on:click={add}><MdAdd /></button>
    <button class="w-full md:w-14 h-14 md:h-auto p-4 bg-slate-700" on:click={remove}><MdRemove /></button>
  </summary>
  <section class="grid grid-cols-1 md:grid-cols-4 gap-y-5 px-10 py-5 border-t border-slate-700">
    <p class="md:col-span-4"><i class="text-slate-500">{data.Paragraph}</i> {data.Desc || 'Nem található leírás'}</p>
    <hr class="md:col-span-4 border-slate-700">
    <p class="text-center text-slate-400"><b class="text-5xl text-cyan-600">${formatter.format(data.MinTicket)}</b><br>minimum kiszabható büntetés</p>
    <p class="text-center text-slate-400"><b class="text-5xl text-cyan-600">${formatter.format(data.MaxTicket)}</b><br>maximum kiszabható büntetés</p>
    <p class="text-center text-slate-400"><b class="text-5xl text-cyan-600">{data.MinJail}p</b><br>minimum letöltendő büntetés</p>
    <p class="text-center text-slate-400"><b class="text-5xl text-cyan-600">{data.MaxJail}p</b><br>maximum letöltendő büntetés</p>
  </section>
</details>
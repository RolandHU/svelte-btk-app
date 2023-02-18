<script>
  import '../app.css'
  import { createEventDispatcher } from 'svelte'
  import PenaltySummary from '../components/PenaltySummary.svelte'
  import PenaltyCategory from '../components/PenaltyCategory.svelte'
  export let data

  const { penalties, categories } = data.elems
  let storedPenalties = {}
  $: inStored = Object.keys(storedPenalties).map(sp => penalties.find(p => p.Paragraph === sp))

  function addPenalty(event) {
    const { paragraph } = event.detail
    document.getElementById(`${paragraph}`).classList.replace('border-slate-700', 'border-cyan-600')
    if (Object.keys(storedPenalties).includes(paragraph)) return storedPenalties[paragraph] += 1
    storedPenalties[paragraph] = 1
  }

  function removePenalty(event) {
    const { paragraph } = event.detail
    if (!Object.keys(storedPenalties).includes(paragraph)) return
    if (storedPenalties[paragraph] > 1) return storedPenalties[paragraph] -= 1
    document.getElementById(`${paragraph}`).classList.replace('border-cyan-600', 'border-slate-700')
    storedPenalties[paragraph] = 1
    delete storedPenalties[paragraph]
  }

  function clearPenalty(event) {
    const { paragraph } = event.detail
    document.getElementById(`${paragraph}`).classList.replace('border-cyan-600', 'border-slate-700')
    storedPenalties[paragraph] = storedPenalties[paragraph]
    delete storedPenalties[paragraph]
  }

  function resetPenalties() {
    Object.keys(storedPenalties).map(p => document.getElementById(`${p}`).classList.replace('border-cyan-600', 'border-slate-700'))
    storedPenalties = storedPenalties
    storedPenalties = {}
  }

</script>

<PenaltySummary penalties={inStored} storedPenalties={storedPenalties} on:clear={clearPenalty} on:reset={resetPenalties} />
<section class="flex-1 h-full px-5 m-auto overflow-auto">
  <div class="max-w-7xl m-auto">
    {#each categories as category}
      <PenaltyCategory title={category} penalties={penalties.filter(p => p.Category === category)} on:add={addPenalty} on:remove={removePenalty} />
    {/each}    
  </div>
</section>
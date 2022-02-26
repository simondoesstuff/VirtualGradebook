<script>
    export let gradeTarget;         // used for 'backwards' calculation

    export let title;
    export let weight;
    export let gradeOverride;       // the user writes this in
</script>

<div class="flex gap-3 h-full w-full">
    <!--    Title    -->
    <input class="px-2.5 grow" bind:value={title}>

    <input class="w-8 border border-black text-center" type="number" bind:value={weight} placeholder={gradeTarget}>

    <input class="w-8 border border-black mr-3 text-center" type="number" bind:value={gradeOverride} placeholder={gradeTarget}>
</div>
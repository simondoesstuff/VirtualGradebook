<script>
    // used for 'backwards' calculation
    export let gradeTarget;

    // the user writes these in
    export let title;
    export let weight = 1;
    export let gradeOverride;
</script>


<div class="flex gap-3 h-full w-full">
    <!--    Title    -->
    <input class="px-2.5 grow" bind:value={title}>

    <input class="w-8 border border-black text-center" type="number" bind:value={weight} placeholder={gradeTarget}>

    <input class="w-8 border border-black mr-3 text-center" type="number" bind:value={gradeOverride} placeholder={gradeTarget}>
</div>
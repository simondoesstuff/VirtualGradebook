<script>
    // used for 'backwards' calculation
    export let gradeTarget;

    // the user writes these in
    export let title;
    export let weight;
    export let gradeOverride;
</script>


<div class="flex gap-3 h-full w-full">
    <!--    Title    -->
    <input class="px-2.5 grow assignment-name" bind:value={title} placeholder="Assignment">

    <input class="w-8 text-center weight-box" type="number" bind:value={weight} placeholder="1">

    <input class="w-8 text-center grade-box" type="number" bind:value={gradeOverride} placeholder={gradeTarget}>
</div>

<style>

    .assignment-name {
        border-radius: 8px;
        background: #e0e0e0;
        box-shadow: inset 5px 5px 7px #bebebe,
        inset -5px -5px 7px #ffffff;
    }

    .weight-box, .grade-box {
        border-radius: 8px;
        background: #e0e0e0;
        box-shadow: inset 3px 3px 5px #bebebe, inset -3px -3px 5px #ffffff;
        font-size: .8rem;
        line-height: .8rem;
    }
</style>
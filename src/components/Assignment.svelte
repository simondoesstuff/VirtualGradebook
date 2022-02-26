<script>
    export let gradeTarget;         // used for 'backwards' calculation

    export let title;
    export let weight = 1;
    export let gradeOverride;       // the user writes this in
</script>


<div>
    <!--    Title    -->
<input bind:value={title}>
    <!--    Weight    -->
<input type="number" bind:value={weight}>

    {#if gradeOverride}
    <!--    User Entered Grade   -->
    <input type="number" bind:value={gradeOverride}>
{:else}
    <!--    Backwards Calculated Grade   -->
    <span>{gradeTarget}</span>
{/if}
</div>
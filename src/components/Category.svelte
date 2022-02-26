<script>
    import Assignment from "./Assignment.svelte";

    export let gradeCalculated;

    export let title;
    export let weight = 1;
    export let gradeOverride;

    let assignments = [
        {
            title: "do your damn job",
            gradeOverride: 50
        }
    ];
</script>

<!--    Title    -->
<input value={title}>
<!--    Weight    -->
<input value={weight}>
<!--    Grade   -->
<input value={gradeOverride}>

<div class="p-5">
        {#each assignments as item}
                <Assignment title={item.title} gradeOverride={item.gradeOverride} gradeCalculated={item.gradeCalculated}>
                </Assignment>
        {/each}
</div>
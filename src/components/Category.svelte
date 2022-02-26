<script>
    import Assignment from "./Assignment.svelte";


    // todo set to undefined
    export let gradeTarget = 90;             // used for 'backwards' calculation

    export let title;
    export let weight = 1;
    export let gradeOverride;           // the user writes this in

    export let gradeCalculated;

    let assignments = [
        {
            title: "do your damn job",
            gradeOverride: 50
        },
        {
            title: "I swear",
            gradeOverride: 80
        }
    ];

    // set the gradeCalculated based on assignments[]
    $: {
        let totalWeight = 0;
        let numerator = 0;

        assignments.forEach(item => {
            totalWeight += item.weight;
            numerator += item.gradeOverride * item.weight;
        });

        gradeCalculated = numerator / totalWeight;
    }

    // set the assignments gradeTarget based on this.gradeTarget
    $: {
        // todo not done yet

        // let totalWeight = 0;
        // let numerator = 0;
        //
        // assignments.forEach(item => {
        //     totalWeight += item.weight;
        //     numerator += item.gradeOverride * item.weight;
        // });
        //
        // gradeCalculated = numerator / totalWeight;
    }
</script>

<!--    Title    -->
<input bind:value={title}>
<!--    Weight    -->
<input type="number" bind:value={weight}>

{#if gradeOverride}
    <!--    User Entered Category Override   -->
    <input type="number" bind:value={gradeOverride}>
{:else}
    <!--    Forwards Calculated Grade   -->
    <span>{gradeCalculated}</span>
{/if}

<div class="p-5">
    {#each assignments as item}
        <Assignment bind:title={item.title}
                    bind:weight={item.weight}
                    bind:gradeOverride={item.gradeOverride}>
        </Assignment>
    {/each}
</div>
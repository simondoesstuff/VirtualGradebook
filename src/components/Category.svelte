<script>
    import Assignment from "./Assignment.svelte";


    // todo set to undefined
    export let gradeTarget = 90;             // used for 'backwards' calculation

    // the user writes these in
    export let title;
    export let weight = 1;
    export let gradeOverride;

    // the average of the contained assignments
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
        let weightedGrades = 0;

        assignments.forEach(item => {
            totalWeight += item.weight;

            // use the gradeTarget if the override isn't used
            let assignmentGrade = item.gradeOverride ?? item.gradeTarget;

            weightedGrades += item.weight * assignmentGrade;
        });

        gradeCalculated = weightedGrades / totalWeight;
    }

    // set the assignments gradeTarget based on this.gradeTarget
    $: {
        // todo not done yet

        let totalWeight = 0;
        let knownWeightedGrades = 0;
        let unknownTotalWeight = 0;

        // sum the total weight
        assignments.forEach(item => {
            totalWeight += item.weight;
        });

        // filter by assignments with an override
        assignments
            .filter(item => item.gradeOverride)
            .forEach(item => {
                knownWeightedGrades = item.weight * item.gradeOverride;
            });

        // filter by assignments without an override
        assignments
            .filter(item => !item.gradeOverride)
            .forEach(item => {
                unknownTotalWeight += item.weight;
            });

        let assignmentGradeTarget = ( gradeTarget * totalWeight - knownWeightedGrades ) / unknownTotalWeight;

        // apply calculated property to each assignment
        assignments = assignments.map(item => {
            item.gradeTarget = assignmentGradeTarget;
            return item;
        });
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
                    bind:gradeOverride={item.gradeOverride}
                    bind:gradeTarget={item.gradeTarget}>
        </Assignment>
    {/each}
</div>
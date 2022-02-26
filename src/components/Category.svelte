<script>
    import Assignment from "./Assignment.svelte";


    // todo set to undefined
    // used for 'backwards' calculation
    //      nullable -- (no course final grade target set)
    export let gradeTarget;

    // the user writes these in
    export let title;
    export let weight = 1;
    export let gradeOverride;   // nullable

    // the average of the contained assignments
    //      nullable -- (assignments are null)
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

    // set the gradeCalculated based on an average of the assignments
    $: {
        let totalWeight = 0;
        let weightedGrades = 0;

        assignments.forEach(item => {
            // use the gradeTarget if the override isn't used
            let assignmentGrade = item.gradeOverride ?? item.gradeTarget;

            // if neither was supplied, we are dealing with an empty assignment
            //      skip it
            if (!assignmentGrade) return;

            totalWeight += item.weight;
            weightedGrades += item.weight * assignmentGrade;
        });

        // if totalWeight is 0: either there are no assignments or they are all set to 0 weight
        //      either way, the gradeCalculated can not be calculated --> set it to null
        if (totalWeight === 0) {
            gradeCalculated = null;
        } else {
            gradeCalculated = weightedGrades / totalWeight;
        }
    }

    // set the assignments gradeTarget based on this.gradeTarget
    $: {

        // if there is no target grade for this category, the assignments dont get one either

        if (gradeTarget == null) {
            // apply calculated property to each assignment
            assignments = assignments.map(item => {
                item.gradeTarget = null;
                return item;
            });
        } else {

            // backwards calculate each assignment's target grade

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
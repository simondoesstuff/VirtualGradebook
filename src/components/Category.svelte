<script>
    import Assignment from "./Assignment.svelte";
    import {averageElements, computeGradeTargets} from "$scripts/GradeCalculation.ts";


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

    // set it reactively as assignments update
    $: gradeCalculated = averageElements(assignments.map(assignment => ({
        grade: assignment.gradeOverride,
        weight: assignment.weight,
        target: assignment.gradeTarget
    })));

    // set the assignments gradeTarget based on this.gradeTarget
    $: {
        let categoryTargetGrades = computeGradeTargets(gradeTarget, assignments.map(assignment => ({
            grade: assignment.gradeOverride,
            weight: assignment.weight,
        })));

        assignments = assignments.map(item => {
            item.gradeTarget = categoryTargetGrades;
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

<button on:click={() => console.log(gradeTarget)}>Click</button>
<br/>
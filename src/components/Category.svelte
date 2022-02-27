<script>
    import Assignment from "./Assignment.svelte";
    import {averageElements, computeGradeTargets} from "$scripts/GradeCalculation.ts";
    import AssignmentMod from "$components/AssignmentMod.svelte";
    import {fly} from "svelte/transition"

    function rid() {
        let min = 0;
        let max = 99999999999;
        return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
    }

    // used for 'backwards' calculation
    //      nullable -- (no course final grade target set)
    export let gradeTarget;

    // the user writes these in
    export let title;
    export let weight;
    export let gradeOverride;   // nullable

    // the average of the contained assignments
    //      nullable -- (assignments are null)
    export let gradeCalculated;

    export let assignments = [];

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

    function removeAssignment(catIndex) {
        assignments.splice(catIndex, 1);
        assignments = assignments
    }

    function addDefaultAssignment() {
        assignments = [
            ...assignments,
            {id: rid()}
        ]
    }

</script>


<div class="p-3 bg-neutral-500 w-full">
    <div class="flex justify-between gap-3 h-8">
        <!--    Title    -->
        <input class="flex-grow px-3" bind:value={title} placeholder="Category">

        <div class="flex gap-3">
            <!--    Weight    -->
            <input class="w-8 text-center" type="number" bind:value={weight}>
            <!--    Grade   -->
            <input class="w-8 text-center" type="number" bind:value={gradeCalculated}>
        </div>
    </div>

    <div class="mt-3 bg-neutral-200">
        <div class="flex flex-col gap-3 py-3">
            {#each assignments as item, index (item.id)}
                <div class="flex items-center h-8" in:fly|local={{ x: 200, duration: 300 }} out:fly|local={{ x: 200, duration: 300 }}>
                    <div class="flex gap-2 mx-2">
                        {#if assignments.length !== 1}
                            <AssignmentMod on:click={() => removeAssignment(index)} icon="sub"/>
                        {:else if assignments.length === 1}
                            <AssignmentMod color="gray" icon="sub"/>
                        {/if}
                    </div>
                    <Assignment
                            bind:title={item.title}
                            bind:weight={item.weight}
                            bind:gradeOverride={item.gradeOverride}
                    />
                </div>
            {/each}
            <div class="mx-auto">
                <AssignmentMod on:click={addDefaultAssignment} icon="add"/>
            </div>
        </div>
    </div>
</div>

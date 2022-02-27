<script>
    import Assignment from "./Assignment.svelte";
    import {averageElements} from "$scripts/GradeCalculation.ts";
    import AssignmentMod from "$components/AssignmentMod.svelte";
    import {fly} from "svelte/transition"
    import {uniqID} from "$scripts/Utils.ts";


    export let assignments = [];

    // the user writes these in
    export let title;
    export let weight;
    export let gradeOverride;   // nullable

    // the average of the contained assignments
    //      nullable -- (assignments are null)
    export let gradeCalculated;
    $: gradeCalculated = averageElements(assignments.map(assignment => ({
        grade: assignment.gradeOverride,
        weight: assignment.weight,
        target: assignment.gradeTarget
    })));

    function removeAssignment(catIndex) {
        assignments.splice(catIndex, 1);
        assignments = assignments
    }

    function addDefaultAssignment() {
        assignments = [
            ...assignments,
            {id: uniqID()}
        ]
    }

</script>


<div class="p-5 w-full category">
    <div class="flex justify-between gap-3 h-8">
        <!--    Title    -->
        <input class="flex-grow px-3" bind:value={title} placeholder="Category">

        <div class="flex gap-3">
            <!--    Weight    -->
            <input class="w-8 text-center" type="number" bind:value={weight} placeholder="1">
            <!--    Grade   -->
            <input class="w-8 text-center" type="number" bind:value={gradeOverride} placeholder={gradeCalculated}>
        </div>
    </div>

    <hr class="border-neutral-300 border-t-2 mt-3 mx-20">

    <div>
        <div class="flex flex-col gap-3 pt-3">
            {#each assignments as item, index (item.id)}
                <div class="flex items-center h-8 gap-3" in:fly|local={{ x: 200, duration: 300 }} out:fly|local={{ x: 200, duration: 300 }}>
                    <div class="flex gap-2">
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
                            gradeTarget={item.gradeTarget}
                    />
                </div>
            {/each}
            <div class="mx-auto">
                <AssignmentMod on:click={addDefaultAssignment} icon="add"/>
            </div>
        </div>
    </div>
</div>

<style>
    .category {
        border-radius: 15px;
        background: #e0e0e0;
        box-shadow: inset 8px 8px 16px #bebebe,
        inset -8px -8px 16px #ffffff;
    }
</style>
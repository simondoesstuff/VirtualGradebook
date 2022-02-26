<script>
    import Assignment from "./Assignment.svelte";
    import {averageElements, computeGradeTargets} from "$scripts/GradeCalculation.ts";
    import AssignmentMod from "$components/AssignmentMod.svelte";


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
</script>


<div class="p-3 bg-neutral-500 w-full">
    <div class="flex justify-between gap-3 h-8">
        <!--    Title    -->
        <input class="flex-grow px-3" bind:value={title}>

        <div class="flex gap-3">
            <!--    Weight    -->
            <input class="w-8 text-center" type="number" bind:value={weight}>
            <!--    Grade   -->
            <input class="w-8 text-center" type="number" bind:value={gradeCalculated}>
        </div>
    </div>

    <div class="mt-3 bg-neutral-200">
        <div class="flex flex-col gap-3 py-3">
            {#each assignments as item, index}
                {#if assignments.length - 1 !== index}
                    <!--The assignment without the plus-->
                    <div class="flex items-center h-8">
                        <div class="flex gap-2 mx-2">
                            <AssignmentMod/>
                            <AssignmentMod icon="sub"/>
                        </div>
                        <Assignment
                                bind:title={item.title}
                                bind:weight={item.weight}
                                bind:gradeOverride={item.gradeOverride}
                        />
                    </div>
                {:else}
                    <!--The assignment with the plus-->
                    <div class="flex items-center h-8">
                        <div class="flex gap-2 mx-2">
                            <AssignmentMod icon="add"/>
                            <AssignmentMod icon="sub"/>
                        </div>
                        <Assignment
                                bind:title={item.title}
                                bind:weight={item.weight}
                                bind:gradeOverride={item.gradeOverride}
                        />
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>

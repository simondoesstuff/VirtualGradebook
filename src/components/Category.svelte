<script>
    import Assignment from "./Assignment.svelte";
    import AssignmentMod from "./AssignmentMod.svelte";


    // todo set to undefined
    export let gradeTarget = 90;             // used for 'backwards' calculation

    export let title;
    export let weight = 1;
    export let gradeOverride;           // the user writes this in

    export let gradeCalculated;

    export let assignments = [];

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

<div class="p-3 bg-neutral-500 w-full">
    <div class="flex justify-between gap-3 h-8">
        <!--    Title    -->
        <input class="flex-grow px-3" bind:value={title}>

        <div class="flex gap-3">
            <!--    Weight    -->
            <input class="w-8 text-center" type="number" bind:value={weight}>
            <!--    Grade   -->
            <input class="w-8 text-center" type="number" bind:value={gradeOverride}>
        </div>
    </div>

    <div class="mt-3 bg-neutral-200">
        <div class="flex flex-col gap-3 py-3">
            {#each assignments as item, index}
                {#if assignments.length-1 !== index}
                    <!--The assignment without the plus-->
                    <div class="flex items-center h-8">
                        <div class="flex gap-2 mx-2">
                            <AssignmentMod />
                            <AssignmentMod icon="sub" />
                        </div>
                        <Assignment bind:title={item.title}
                                    bind:weight={item.weight}
                                    bind:gradeOverride={item.gradeOverride}>
                        </Assignment>
                    </div>
                {:else}
                    <!--The assignment with the plus-->
                    <div class="flex items-center h-8">
                        <div class="flex gap-2 mx-2">
                            <AssignmentMod icon="add" />
                            <AssignmentMod icon="sub" />
                        </div>
                        <Assignment bind:title={item.title}
                                    bind:weight={item.weight}
                                    bind:gradeOverride={item.gradeOverride}>
                        </Assignment>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>

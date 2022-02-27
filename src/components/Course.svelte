<script>
    import Category from "$components/Category.svelte";
    import CategoryMod from "../components/CategoryMod.svelte";
    import {averageElements, computeGradeTargets} from "$scripts/GradeCalculation.ts";
    import {fly} from "svelte/transition"
    import {uniqID} from "$scripts/Utils.ts";


    export let categories = [];

    // the user writes these in
    export let title;
    export let gradeOverride;   // used for backwards calculation

    // the average of the contained assignments
    //      nullable -- (assignments are null)
    let gradeCalculated;
    $: gradeCalculated = averageElements(categories.map(category => ({
        grade: category.gradeOverride,
        weight: category.weight,
        target: category.gradeCalculated
    })));

    // set the categories gradeTarget based on the grade override
    $: categories = computeGradeTargets(gradeOverride, categories);

    function removeCategory(catIndex) {
        categories.splice(catIndex, 1);
        categories = categories
    }

    function addDefaultCategory() {
        categories = [
            ...categories,
            {
                assignments: [
                    {id: uniqID()}
                ],
                id: uniqID()
            }
        ]
    }
</script>

<div class="mb-5 mx-auto max-w-7xl course">
    <div class="p-5">
        <div class="flex justify-between items-center p-5">
            <input class="px-2.5 grow text-[2rem] mr-3 bg-transparent" bind:value={title} placeholder="Course">
            <div class="flex items-center">
                <span class="mr-3">Total:</span>
                <input
                        class="w-10 h-10 text-center totalGrade"
                        type="number"
                        placeholder={gradeCalculated}
                        bind:value={gradeOverride}
                >
                <div class="grid place-items-center w-10 h-10">
                    <span class="text-[1.5rem]">%</span>
                </div>
            </div>
        </div>

        <div class="p-5">
            <div class="mx-auto max-w-4xl text-right text-[.5rem] mb-2">
                <span class="mr-2.5 w-8 inline-block text-center">Weight</span>
                <span class="mr-6 w-8 inline-block text-center">Grade</span>
            </div>
            <div class="flex flex-col gap-5 mx-auto max-w-4xl">
                {#each categories as category, index (category.id)}
                    <!--The category with the plus-->
                    <div class="flex items-center gap-3"
                         in:fly={{ x: 200, duration: 300 }}
                         out:fly={{ x: 200, duration: 300 }}
                    >
                        <div class="flex flex-col gap-3">
                            {#if categories.length !== 1}
                                <CategoryMod on:click={() => removeCategory(index)} icon="sub"/>
                            {/if}
                            {#if categories.length-1 === index}
                                <CategoryMod on:click={addDefaultCategory} icon="add"/>
                            {/if}
                        </div>
                        <Category
                                bind:title={category.title}
                                bind:weight={category.weight}
                                bind:gradeOverride={category.gradeOverride}
                                bind:gradeCalculated={category.gradeCalculated}
                                bind:gradeTarget={category.gradeTarget}
                                bind:assignments={category.assignments}
                        />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .course {
        border-radius: 50px;
        background: #e0e0e0;
        box-shadow:  10px 10px 20px #bebebe,
        -10px -10px 20px #ffffff;
    }
    .totalGrade {
        border-radius: 10px;
        background: #e0e0e0;
        box-shadow: inset 3px 3px 5px #bebebe,
        inset -3px -3px 5px #ffffff;
    }
</style>
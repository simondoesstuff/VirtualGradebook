<script>
    import Category from "$components/Category.svelte";
    import CategoryMod from "../components/CategoryMod.svelte";
    import {averageElements, computeGradeTargets} from "$scripts/GradeCalculation.ts";
    import {fly} from "svelte/transition"

    function rid() {
        let min = 0;
        let max = 99999999999;
        return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
    }

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    // the user writes these in
    export let title;
    // todo set to undef
    export let gradeOverride = 90;   // used for backwards calculation

    export let categories;

    // the average of the contained assignments
    //      nullable -- (assignments are null)
    let gradeCalculated;
    $: gradeCalculated = averageElements(categories.map(category => ({
        grade: category.gradeOverride,
        weight: category.weight,
        target: category.gradeCalculated
    })));

    // set the categories gradeTarget based on the grade override
    $: {
        let categoryTargetGrades = computeGradeTargets(gradeOverride, categories.map(category => ({
            grade: (
                category.gradeOverride ?
                    category.gradeOverride :
                    null
            ),
            weight: category.weight
        })));

        categories = categories.map(item => {
            item.gradeTarget = categoryTargetGrades;
            return item;
        });
    }

    function removeCategory(catIndex) {
        categories.splice(catIndex, 1);
        categories = categories
    }

    function addDefaultCategory() {
        categories = [
            ...categories,
            {
                assignments: [
                    {id: rid()}
                ],
                id: rid()
            }
        ]
    }

</script>

<div class="m-10" id="course">
    <div class="p-5">
        <div class="flex justify-between items-center p-5">
            <h1 class="text-[1.5rem]">{title}</h1>
            <div class="flex items-center">
                <input
                        class="w-10 h-10 text-center bg-gray-300"
                        type="number"
                        value={gradeCalculated}
                        on:input={e => gradeCalculated = e.target.value = clamp(e.target.value, 0, 100)}
                >
                <div class="grid place-items-center w-10 h-10">
                    <span class="text-white text-[1.5rem]">%</span>
                </div>
            </div>
        </div>

        <div class="p-5">
            <div class="flex flex-col gap-5 mx-auto max-w-4xl">
                {#each categories as category, index (category.id)}
                    <!--The category with the plus-->
                    <div class="flex items-center gap-3" in:fly={{ x: 200, duration: 300 }} out:fly={{ x: 200, duration: 300 }}>
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
    #course {
        border-radius: 50px;
        background: #e0e0e0;
        box-shadow: -25px 25px 50px #bebebe,
        25px -25px 50px #ffffff;
    }
</style>
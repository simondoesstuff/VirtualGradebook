<script>
    import Category from "$components/Category.svelte";
    import CategoryMod from "../components/CategoryMod.svelte";
    import {averageElements, computeGradeTargets} from "$scripts/GradeCalculation.ts";


    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    // the user writes these in
    export let title;
    // todo set to undef
    export let gradeOverride = 90;   // used for backwards calculation

    let categories = [
        {
            title: "Default Category",
            assignments: [
                {
                    title: "Default Assignment",
                    gradeOverride: 80,
                },
                {
                    title: "Default Assignment 2",
                    gradeOverride: 50,
                }
            ]
        },
        {
            title: "Default Category 2",
            assignments: [
                {
                    title: "Default Assignment",
                    gradeOverride: 80,
                },
                {
                    title: "Default Assignment 2",
                    gradeOverride: 50,
                }
            ]
        }
    ];

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
</script>

<div class="m-5">
    <div class="flex justify-between items-center p-5 bg-neutral-500">
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

    <div class="p-5 bg-neutral-200">
        <div class="flex flex-col gap-5 mx-auto max-w-4xl">
            {#each categories as category, index}
                {#if categories.length-1 !== index}
                    <!--The category without the plus-->
                    <div class="flex items-center gap-3">
                        <CategoryMod />
                        <CategoryMod icon="sub" />
                        <Category bind:title={category.title}
                                  bind:weight={category.weight}
                                  bind:gradeOverride={category.gradeOverride}
                                  bind:gradeCalculated={category.gradeCalculated}
                                  bind:gradeTarget={category.gradeTarget}
                                  bind:assignments={category.assignments}
                        />
                    </div>
                {:else}
                    <!--The category with the plus-->
                    <div class="flex items-center gap-3">
                        <CategoryMod icon="add" />
                        <CategoryMod icon="sub" />
                        <Category bind:title={category.title}
                                  bind:weight={category.weight}
                                  bind:gradeOverride={category.gradeOverride}
                                  bind:gradeCalculated={category.gradeCalculated}
                                  bind:gradeTarget={category.gradeTarget}
                                  bind:assignments={category.assignments}
                        />
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>
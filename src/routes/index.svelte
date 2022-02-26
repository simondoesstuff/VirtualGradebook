<script>
    import Category from "$components/Category.svelte";
    import CategoryMod from "../components/CategoryMod.svelte";

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    let totalGrade = 0;

    let categories = [
        {
            title: "Default Category",
            assignments: [
                {
                    title: "Default Assignment",
                    gradeOverride: null,
                },
                {
                    title: "Default Assignment 2",
                    gradeOverride: null,
                }
            ]
        },
        {
            title: "Default Category 2",
            assignments: [
                {
                    title: "Default Assignment",
                    gradeOverride: null,
                },
                {
                    title: "Default Assignment 2",
                    gradeOverride: null,
                }
            ]
        }
    ];
</script>

<div class="flex justify-between items-center p-5 bg-neutral-500">
    <h1 class="text-[1.5rem]">ClassName</h1>
    <div class="flex items-center">
        <input
                class="w-10 h-10 text-center bg-gray-300"
                type="number"
                value={totalGrade}
                on:input={e => totalGrade = e.target.value = clamp(e.target.value, 0, 100)}
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
                              bind:assignments={category.assignments}
                    />
                </div>
            {/if}
        {/each}
    </div>
</div>
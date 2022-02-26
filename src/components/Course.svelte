<script>
    import Category from "$components/Category.svelte";
    import {averageElements, computeGradeTargets} from "$scripts/GradeCalculation.ts";

    // the user writes these in
    export let title;
    // todo set to undef
    export let gradeOverride = 90;   // used for backwards calculation

    let categories = [
        {
            title: "Your Job."
        },
        {
            title: "You lazy ass."
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

    $: console.log(categories[0].gradeCalculated)

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

<h2>
    {title}
    <br/>
    {`Grade: ${gradeCalculated}%`}
    <br/>
    {`Ideal Grade: ${gradeOverride}%`}
    <br/>
    <br/>
</h2>

{#each categories as item}
    <Category bind:title={item.title}
              bind:weight={item.weight}
              bind:gradeOverride={item.gradeOverride}
              bind:gradeTarget={item.gradeTarget}
              bind:gradeCalculated={item.gradeCalculated}>
    </Category>
{/each}
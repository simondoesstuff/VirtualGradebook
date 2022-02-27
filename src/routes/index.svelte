<script>
    import Course from "$components/Course.svelte";
    import {uniqID} from "$scripts/Utils.ts";


    let courses = [
        {
            title: "CSC244",
            categories: [
                {assignments: [
                    {id: uniqID()}
                ], id: uniqID()},
            ],
            id: uniqID()
        }
    ];
</script>

{#each courses as course (course.id)}
    <Course
            bind:title={course.title}
            bind:gradeOverride={course.gradeOverride}
            bind:categories={course.categories}
    />
{/each}
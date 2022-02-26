<script>
    import Course from "$components/Course.svelte";

    let courses = [
        {
            title: "CSC244",
            categories: [
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
            ]
        }
    ]

</script>

{#each courses as course}
    <Course
            bind:title={course.title}
            bind:gradeOverride={course.gradeOverride}
            bind:categories={course.categories}
    />
{/each}
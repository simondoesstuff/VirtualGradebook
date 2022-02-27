<script>
    import Course from "$components/Course.svelte";

    function rid() {
        let min = 0;
        let max = 99999999999;
        return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
    }

    let courses = [
        {
            title: "CSC244",
            categories: [
                {assignments: [
                    {id: rid()}
                ], id: rid()},
            ],
            id: rid()
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
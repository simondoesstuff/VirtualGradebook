<script>
    import Course from "$components/Course.svelte";
    import {uniqID} from "$scripts/Utils.ts";


    let courses = [];

    function removeCourse(catIndex) {
        courses.splice(catIndex, 1);
        courses = courses
    }

    function addDefaultCourse() {
        courses = [
            ...courses,
            {
                categories: [
                    {assignments: [
                            {id: uniqID()}
                        ], id: uniqID()},
                ],
                id: uniqID()
            }
        ]
    }

    // add an inital entry to the state
    addDefaultCourse();
</script>

{#each courses as course (course.id)}
    <Course
            bind:title={course.title}
            bind:gradeOverride={course.gradeOverride}
            bind:categories={course.categories}
    />
{/each}
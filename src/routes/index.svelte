<script>
    import Course from "$components/Course.svelte";
    import {uniqID} from "$scripts/Utils.ts";
    import HamburgerMenuIcon from "../../static/svgs/HamburgerMenuIcon.svelte";


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

<div class="grid place-items-center">
    <h1 class="px-2.5 grow text-[2rem] m-6 bg-transparent">
        Virtual Gradebook
    </h1>
</div>

{#each courses as course (course.id)}
    <Course
            bind:title={course.title}
            bind:gradeOverride={course.gradeOverride}
            bind:categories={course.categories}
    />
{/each}
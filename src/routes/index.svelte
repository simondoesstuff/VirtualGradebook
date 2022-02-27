<script>
    import Course from "$components/Course.svelte";
    import {buildCourse} from "$scripts/CourseFactory.ts";


    let courses = [];

    function removeCourse(catIndex) {
        courses.splice(catIndex, 1);
        courses = courses
    }

    function addDefaultCourse() {
        courses = [
            ...courses,
            buildCourse({
                categories: [{
                    assignments: [
                        {}
                    ]
                }]
            })
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
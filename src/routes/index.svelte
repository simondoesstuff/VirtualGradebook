<script>
    import Course from "$components/Course.svelte";
    import Dropdown from "$components/Dropdown.svelte";
    import {buildDefaultCourse} from "$scripts/CourseFactory.ts";


    let courses = [];
    let activeCourseId;
    let activeCourse;

    // used to display the hamburger menu
    let gradebooks = [];

    function removeCourse(catIndex) {
        courses.splice(catIndex, 1);
        courses = courses
    }

    function addDefaultCourse() {
        courses = [
            ...courses,
            buildDefaultCourse()
        ]
    }

    // add an inital entry to the state
    addDefaultCourse();
    // todo remove those
    addDefaultCourse();
    addDefaultCourse();

    activeCourseId = courses[0].id;

    // set the active course based on the active course id
    $: {
        let course = courses
            .filter(course => course.id === activeCourseId)
            .pop();

        if (!course) {
            // the course was not found. This can not happen.
            throw "The activeCourseId does not correspond to a course in courses[]."
        }

        activeCourse = course;
    }

    // set the gradebooks[] based on the courses[]
    $: {
        gradebooks = courses.map(course => ({
            text: course.title ?? "Course",
            id: course.id
        }))
    }
</script>

<div class="flex justify-between items-center">
    <div class="w-[5.5rem] h-[5.5rem]"></div>
    <div class="grid place-items-center">
        <h1 class="px-2.5 grow text-[2rem] my-8 bg-transparent">
            Virtual Gradebook
        </h1>
    </div>
    <Dropdown
            items={gradebooks}
            bind:activeCourseId
    />
</div>

<Course
        bind:title={activeCourse.title}
        bind:gradeOverride={activeCourse.gradeOverride}
        bind:categories={activeCourse.categories}
/>

<div class="mx-auto max-w-7xl flex justify-end">
    <div class="mx-16">
        <button class="text-black px-2 py-1 bg-neutral-400 creation-buttons-neumorphism">New</button>
        <button class="text-black ml-3 px-2 py-1 bg-neutral-400 creation-buttons-neumorphism">Delete</button>
    </div>
</div>


<style>
    .creation-buttons-neumorphism {
        border-radius: 50px;
        background: linear-gradient(145deg, #f0f0f0, #cacaca);
        box-shadow:  4px 4px 8px #bebebe,
        -4px -4px 8px #f6f6f6;
    }
</style>
<script>
    import Course from "$components/Course.svelte";
    import {uniqID} from "$scripts/Utils.ts";
    import HamburgerMenuIcon from "../../static/svgs/HamburgerMenuIcon.svelte";
    import Dropdown from "$components/Dropdown.svelte";


    let courses = [];

    let gradebooks = [
        { text: "CSC114" },
        { text: "CSC120" }
    ]

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

<div class="flex justify-between items-center">
    <div class="w-[5.5rem] h-[5.5rem]"></div>
    <div class="grid place-items-center">
        <h1 class="px-2.5 grow text-[2rem] my-8 bg-transparent">
            Virtual Gradebook
        </h1>
    </div>
    <Dropdown items={gradebooks}/>
</div>

{#each courses as course (course.id)}
    <Course
            bind:title={course.title}
            bind:gradeOverride={course.gradeOverride}
            bind:categories={course.categories}
    />
{/each}

<div class="mx-auto max-w-7xl flex justify-end">
    <div class="mx-16">
        <button class="text-black px-2 py-1 bg-neutral-400">New</button>
        <button class="text-black px-2 py-1 bg-neutral-400">Delete</button>
    </div>
</div>
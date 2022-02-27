<script>
    import HamburgerMenuIcon from "../../static/svgs/HamburgerMenuIcon.svelte";
    import { clickOutside } from 'svelte-use-click-outside';
    import {fade} from "svelte/transition"

    export let items;
    export let activeCourseId;

    function dropdownClicked() {
        open = !open;
    }

    let open = false;
</script>

<div class="relative mr-[2rem]">
    <button class="w-14 h-14 grid place-items-center text-[2rem] bg-neutral-300 rounded-2xl"
            on:click={dropdownClicked}
            use:clickOutside={() => open=false}>
        <HamburgerMenuIcon />
    </button>
    {#if open}
        <div class="absolute min-w-[10rem] right-0 top-[4rem] bg-neutral-300 rounded-xl" transition:fade={{duration: 200}}>
            <ul class="px-5 py-3">
                {#each items as item}
                    <li>
                        <button
                                class="w-full text-left"
                                on:click={() => activeCourseId = item.id}
                        >
                            {item.text}
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>
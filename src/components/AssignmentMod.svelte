<script>
    import AddIcon from "/static/svgs/AddIcon.svelte"
    import SubIcon from "/static/svgs/SubIcon.svelte"

    export let icon;

    let spacing = "w-7 h-7 shrink-0";
</script>

{#if icon}
    <button class={spacing + " border border-black grid place-items-center text-[1.25rem]"}>
        {#if icon === "add"}
            <AddIcon />
        {:else if icon === "sub"}
            <SubIcon />
        {/if}
    </button>
{:else}
    <div class={spacing}></div>
{/if}
<script>
    import AddIcon from "/static/svgs/AddIcon.svelte"
    import SubIcon from "/static/svgs/SubIcon.svelte"

    export let icon;

    let spacing = "w-10 h-10 shrink-0";
</script>

{#if icon}
    <button on:click class={spacing + " border border-black grid place-items-center text-[2rem]"}>
        {#if icon === "add"}
            <AddIcon />
        {:else if icon === "sub"}
            <SubIcon />
        {/if}
    </button>
{:else}
    <div class={spacing}></div>
{/if}
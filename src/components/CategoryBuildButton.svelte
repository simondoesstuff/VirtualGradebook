<script>
    import AddIcon from "/static/svgs/AddIcon.svelte"
    import SubIcon from "/static/svgs/SubIcon.svelte"

    export let icon;

    let spacing = "w-10 h-10 shrink-0";
</script>

{#if icon}
    <button on:click class={spacing + " text-black grid place-items-center text-[2rem] cat-mob-btn"}>
        {#if icon === "add"}
            <AddIcon />
        {:else if icon === "sub"}
            <SubIcon />
        {/if}
    </button>
{:else}
    <div class={spacing}></div>
{/if}

<style>
    .cat-mob-btn {
        border-radius: 50px;
        background: linear-gradient(145deg, #f0f0f0, #cacaca);
        box-shadow:  4px 4px 8px #bebebe,
        -4px -4px 8px #f6f6f6;
    }
</style>
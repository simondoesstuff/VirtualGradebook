<script>
    import AddIcon from "/static/svgs/AddIcon.svelte"
    import SubIcon from "/static/svgs/SubIcon.svelte"

    export let icon;
    export let color = "black"

    let spacing = "w-7 h-7 shrink-0";
</script>

{#if icon}
    <button on:click style="color: {color}" class={spacing + " grid place-items-center text-[1.25rem] ass-mob-btn"}>
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
    .ass-mob-btn {
        border-radius: 50px;
        background: linear-gradient(145deg, #f0f0f0, #cacaca);
        box-shadow:  4px 4px 8px #bebebe,
        -4px -4px 8px #f6f6f6;
    }
</style>
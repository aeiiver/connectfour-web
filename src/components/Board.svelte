<script>
    import Square from "./Square.svelte";
    export let board;
</script>

<div>
    {#each board as col, idx}
        {#each col as square}
            <Square col={idx} player={square} on:click />
        {/each}
    {/each}
</div>

<style>
    div {
        display: grid;
        grid-template-columns: repeat(7, 7rem);
        grid-template-rows: repeat(6, 7rem);
        grid-auto-flow: column;
        gap: 0.5rem;

        max-width: min-content;
        margin-inline: auto;

        background-color: rgba(0, 0, 0, 20%);
        padding: 1rem;
        border-radius: 1rem;
    }
</style>

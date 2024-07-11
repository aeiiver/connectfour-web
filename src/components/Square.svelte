<script>
    import { createEventDispatcher } from "svelte";

    export let col;
    export let player;

    $: color = ["none", "red", "yellow"][player.player];
    $: highlighted = player.highlight;

    let dispatch = createEventDispatcher();
    let handleClick = () => dispatch("click", { col: col });
</script>

<button class={color} class:highlighted on:click={handleClick} />

<style>
    button {
        transition-property: background-color;
        transition-duration: 200ms;

        display: flex;
        justify-content: center;
        align-items: center;

        border: none;
        border-radius: 100%;
    }

    .none {
        background-color: rgb(255, 255, 255, 20%);
    }
    .none:hover {
        background-color: rgb(255, 255, 255, 40%);
    }

    .red {
        background-color: darkred;
    }
    .red:hover {
        background-color: red;
    }
    .red.highlighted {
        background-color: rgb(255, 149, 149);
    }

    .yellow {
        background-color: rgb(153, 135, 57);
    }
    .yellow:hover {
        background-color: rgb(245, 204, 102);
    }
    .yellow.highlighted {
        background-color: rgb(255, 254, 168);
    }
</style>

<script lang="ts">
  export let fontSize: string = '6vh';
  export let action: () => void;
</script>

<button style:font-size={fontSize} on:click={action}>
  <slot />
</button>

<style>
  button {
    color: black;
    background-color: #d4d4d4;
    font-weight: bold;
    transition: all 100ms;

    padding: 2vh 4vw;
    border-radius: 25% / 75%;
    border: none;
  }

  button:where(:focus, :hover) {
    background-color: white;
    cursor: pointer;

    outline: 8px solid white;
    box-shadow: 0 0 8px 12px white;
  }
</style>

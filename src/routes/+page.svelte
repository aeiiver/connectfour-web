<script lang="ts">
  import Menu from './Menu.svelte';
  import Game from './Game.svelte';

  let youWantPlayToLetsPlay = false;
</script>

<div class="center-content">
  {#if youWantPlayToLetsPlay}
    <Game />
  {:else}
    <Menu on:click={() => (youWantPlayToLetsPlay = true)} />
  {/if}
</div>

<style>
  :global(:where(html, body)) {
    color-scheme: dark;
    margin: 0;
    height: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .center-content {
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

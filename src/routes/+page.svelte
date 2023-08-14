<script lang="ts">
  import { playing } from './store';
  import Game from './Game.svelte';
  import Menu from './Menu.svelte';
</script>

<svelte:head>
<title>Connect Four</title>
</svelte:head>

<div class="center-content">
  {#if $playing}
    <Game />
  {:else}
    <Menu />
  {/if}
</div>

<style>
  :global(:where(html, body)) {
    color-scheme: dark;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    margin: 0;
    height: 100%;
  }

  :global(.center-content) {
    display: grid;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>

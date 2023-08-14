<script>
  import { playing } from './store';
  import Button from './Button.svelte';
</script>

<div style:text-align="center">
  <h1 style:font-size="10vh">Connect Four</h1>
  <div style:height="12vh" />
  <Button action={() => playing.set(true)}>Play</Button>
  <div style:height="12vh" />
</div>

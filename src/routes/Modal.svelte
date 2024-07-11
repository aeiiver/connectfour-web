<script lang="ts">
  import { clickOutside } from '$lib';

  export let showModal: boolean;

  let dialog: HTMLDialogElement;
  $: if (dialog && showModal) dialog.showModal();
  $: if (dialog && !showModal) dialog.close();
</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
  <div class="center-content" use:clickOutside on:clickoutside={() => (showModal = false)}>
    <slot />
  </div>
</dialog>

<style>
  dialog {
    background: none;
    border: none;
  }

  dialog::backdrop {
    background-color: rgba(0 0 0 / 60%);
    backdrop-filter: blur(6px);
  }
</style>

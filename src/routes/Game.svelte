<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { botPlay as playAsBot, clickOutside, Game, type Player } from '$lib';

  import { playing } from './store';
  import Button from './Button.svelte';
  import Modal from './Modal.svelte';

  let game = new Game();
  let player: Player;
  let bot: Player;

  let focusCol = 0;
  let showModal = false;

  async function startGame(): Promise<void> {
    if (Math.random() > 0.5) {
      player = 'Player1';
      bot = 'Player2';
    } else {
      player = 'Player2';
      bot = 'Player1';
    }

    if (bot! === 'Player1') {
      let opt = await playAsBot(game);
      if (!opt.is_present) throw new Error('Bot should be able to play because it starts first');
      game = game;
    }
  }

  function restartGame(): void {
    showModal = false;
    game.restart();
    startGame();
    game = game;
  }

  async function playAsPlayer(col: number): Promise<void> {
    if (game.state.type === 'PlayerTurn' && game.state.player !== player) {
      return;
    }

    let res = game.play(col);
    if (!res.is_ok) {
      if (res.error === 'GameIsOver') {
        return;
      } else if (res.error === 'ColumnOutOfBounds') {
        return;
      } else if (res.error === 'ColumnIsFull') {
        return;
      }
    }
    game = game;

    if (game.state.type === 'GameIsOver') return;

    let opt = await playAsBot(game);
    if (!opt.is_present)
      throw new Error("Bot shouldn't play because we checked if the game was over");
    game = game;
  }

  function handleKey(event: KeyboardEvent): void {
    let goLeft = event.key === 'ArrowLeft' || event.code === 'KeyJ';
    let goRight = event.key === 'ArrowRight' || event.code === 'KeyL';
    let placeChip =
      event.key === 'ArrowDown' ||
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.code === 'KeyK';
    let showMenu = event.key === 'Escape';

    if (showMenu) {
      event.preventDefault();
      showModal = !showModal;
    } else if (goLeft) {
      if (focusCol > 0) {
        focusCol--;
      }
    } else if (goRight) {
      if (focusCol < game.width - 1) {
        focusCol++;
      }
    } else if (placeChip) {
      playAsPlayer(focusCol);
    }
  }

  function listenKeys(e: KeyboardEvent): void {
    handleKey(e);
  }

  onMount(() => {
    startGame();
    document.addEventListener('keydown', listenKeys);
  });
  onDestroy(() => {
    document.removeEventListener('keydown', listenKeys);
  });
</script>

<Modal bind:showModal>
  <Button action={() => (showModal = false)}>Resume</Button>
  <div style:height="12vh" />
  <Button action={restartGame}>Restart</Button>
  <div style:height="12vh" />
  <Button action={() => playing.set(false)}>Return to menu</Button>
</Modal>

<!-- TODO: Make this prettier somehow -->
<div use:clickOutside on:clickoutside={() => (showModal = true)}>
  {#each game.board as row, rownum}
    <div class="row">
      {#each row as cell, colnum}
        <div
          role="cell"
          on:click={() => playAsPlayer(focusCol)}
          on:keydown={() => {}}
          on:mouseover={() => (focusCol = colnum)}
          on:focus={() => (focusCol = colnum)}
          tabindex={rownum}
        >
          <div
            class="cell"
            class:preview={cell.type === 'Empty' &&
              game.state.type === 'PlayerTurn' &&
              game.state.player === player &&
              focusCol === colnum}
            class:filled={cell.type === 'Filled'}
            class:player-one={cell.type === 'Filled' && cell.player === 'Player1'}
            class:player-two={cell.type === 'Filled' && cell.player === 'Player2'}
            class:previous={game.state.type === 'PlayerTurn' && game.state.previous === cell}
            class:highlighted={game.state.type === 'GameIsOver' &&
              game.state.outcome.type !== 'Tie' &&
              game.state.outcome.cells.includes(cell)}
            class:decolored={(game.state.type === 'GameIsOver' &&
              game.state.outcome.type === 'Tie') ||
              (game.state.type === 'GameIsOver' &&
                game.state.outcome.type !== 'Tie' &&
                (cell.type === 'Empty' ||
                  (cell.type === 'Filled' && !game.state.outcome.cells.includes(cell))))}
            style:--current-player={game.state.type === 'PlayerTurn' &&
            game.state.player === 'Player1'
              ? 'red'
              : game.state.type === 'PlayerTurn' && game.state.player === 'Player2'
              ? 'darkgoldenrod'
              : ''}
            style:transition={game.state.type === 'GameIsOver'
              ? 'background-color 200ms, filter 200ms'
              : ''}
          />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  :focus {
    outline: none;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .cell {
    background-color: #303030;
    width: 12vh;
    height: 12vh;
    margin: 0.5vh;
    border-radius: 100%;
  }
  .filled.player-one {
    background-color: darkred;
  }
  .filled.player-two {
    background-color: darkgoldenrod;
  }

  .preview {
    background-color: var(--current-player);
    filter: brightness(100%) contrast(25%) saturate(50%);
  }

  .previous {
    filter: brightness(200%);
  }
  .highlighted {
    filter: brightness(150%);
  }

  .decolored {
    filter: brightness(80%) saturate(20%);
  }
  .player-one.decolored {
    background-color: red;
  }
</style>

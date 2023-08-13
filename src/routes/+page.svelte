<script lang="ts">
  import { Game } from '$lib';

  let game = new Game();
  $: board = game.board
  $: state = game.state

  let mousecol = 0;

  function play(col: number): void {
    let res = game.play(col);
    if (!res.is_ok) {
      if (res.error === 'GameIsOver') { return }
      if (res.error === 'ColumnOutOfBounds') { return }
      if (res.error === 'ColumnIsFull') { alert('you dumbass') }
    }
    game = game; // What a reactive moment
  }

  function playWithKeyboard(event: KeyboardEvent, col: number): void {
    if (event.key !== ' ') { return }
    play(col)
  }

  function doNothing(): void {}
</script>

<div class="board">
  {#each board as row, rownum}
    <div class="row">
      {#each row as cell, col}
        <div
             role='cell'
             tabindex='{parseInt(`1${rownum}`)}'
             on:click={() => play(col)}
             on:keyup={(e) => playWithKeyboard(e, col)}
             on:focus={doNothing}
             on:mouseover={() => mousecol = col}>
          <div class="cell col{col}"
            class:empty={cell.type === 'Empty'}
            class:player-one={cell.type === 'Filled' && cell.player === 'Player1'}
            class:player-two={cell.type === 'Filled' && cell.player === 'Player2'}
            class:highlighted={state.type === 'PlayerTurn' && mousecol === col}
            class:highlighteded={state.type === 'GameIsOver' && state.outcome.type !== 'Tie' && cell.type === 'Filled' && state.outcome.cells.includes(cell)}>
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
    flex-direction: row;
  }

  .cell {
    background-color: gray;
    width: 6rem;
    height: 6rem;
    margin: 0.5rem;
    border-radius: 100%;
  }
  .highlighted {
    filter: brightness(150%);
  }
  .highlighteded {
    filter: brightness(200%);
  }

  .player-one {
    background-color: darkred;
  }
  .player-two {
    background-color: darkgoldenrod;
  }
</style>

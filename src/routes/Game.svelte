<script lang="ts">
	import { Game } from '$lib';

	let game = new Game();
	$: board = game.board;
	$: state = game.state;

	let focusCol = 0;

	function play(col: number): void {
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
		/* What a reactive moment */
		game = game;
	}

	function playWithKeyboard(event: KeyboardEvent, col: number): void {
		if (event.key === 'ArrowLeft' || event.code === 'KeyJ') {
			if (focusCol > 0) {
				focusCol--;
			}
		} else if (event.key === 'ArrowRight' || event.code === 'KeyL') {
			if (focusCol < game.width - 1) {
				focusCol++;
			}
		} else if (
			event.key === 'ArrowDown' ||
			event.key === 'Enter' ||
			event.key === ' ' ||
			event.code === 'KeyK'
		) {
			play(col);
		}
	}
</script>

<div>
	{#each board as row, rownum}
		<div class="row">
			{#each row as cell, colnum}
				<div
					role="cell"
					on:click={() => play(focusCol)}
					on:keydown={(e) => playWithKeyboard(e, focusCol)}
					on:mouseover={() => (focusCol = colnum)}
					on:focus={() => (focusCol = colnum)}
					tabindex={rownum}
				>
					<div
						class="cell col{colnum}"
						class:empty={cell.type === 'Empty'}
						class:player-one={cell.type === 'Filled' && cell.player === 'Player1'}
						class:player-two={cell.type === 'Filled' && cell.player === 'Player2'}
						class:highlight-grays={cell.type === 'Empty' &&
							focusCol === colnum &&
							state.type === 'PlayerTurn'}
						class:highlighted={state.type === 'GameIsOver' &&
							state.outcome.type !== 'Tie' &&
							cell.type === 'Filled' &&
							state.outcome.cells.includes(cell)}
						class:decolored={state.type === 'GameIsOver' &&
							state.outcome.type !== 'Tie' &&
							(cell.type === 'Empty' ||
								(cell.type === 'Filled' && !state.outcome.cells.includes(cell)))}
						style:transition={state.type === 'GameIsOver' ? 'filter 200ms' : ''}
					/>
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
		background-color: #404040;
		width: 12vh;
		height: 12vh;
		margin: 0.5vh;
		border-radius: 100%;
	}

	:focus {
		outline: none;
	}

	.highlight-grays {
		filter: brightness(150%);
	}
	.highlighted {
		filter: brightness(150%);
	}
	.decolored {
		filter: brightness(80%) saturate(40%);
	}

	.player-one {
		background-color: darkred;
	}
	.player-two {
		background-color: darkgoldenrod;
	}
</style>

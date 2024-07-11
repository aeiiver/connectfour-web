import type { Game } from './game';
import { Some, type Option, None } from './option';

async function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function randomlyPlay(game: Game): Option<number> {
  let playableCols = [];
  let firstRow = game.board.at(0)!;
  for (let i = 0; i < firstRow.length; ++i) {
    let cell = firstRow.at(i)!;
    if (cell.type === 'Empty') playableCols.push(i);
  }
  if (playableCols.length === 0) return None();

  let choiceIdx = Math.trunc(Math.random() * playableCols.length);
  return Some(playableCols.at(choiceIdx)!);
}

export async function botPlay(game: Game): Promise<Option<void>> {
  let choice = randomlyPlay(game);
  if (!choice.is_present) return None();

  await sleep(200 + Math.random() * 800);
  let res = game.play(choice.value);
  if (!res.is_ok) {
    if (res.error === 'GameIsOver') {
      throw new Error(
        `Bot shouldn't be told to play because we checked earlier for playable columns`
      );
    } else if (res.error === 'ColumnOutOfBounds') {
      throw new Error(
        `Bot shouldn't be told to play because we checked earlier for playable columns`
      );
    } else if (res.error === 'ColumnIsFull') {
      throw new Error(
        `Bot shouldn't be told to play because we checked earlier for playable columns`
      );
    }
  }

  return Some(void 0);
}

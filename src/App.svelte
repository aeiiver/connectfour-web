<script>
    import Board from "./components/Board.svelte";

    const Player = {
        None: 0,
        Red: 1,
        Yellow: 2,
    };
    let currentPlayer = Player.Red;
    let playerName = (p) => ["", "Red", "Yellow"][p];
    let winner = Player.None;
    $: winnerColor = ["nowinner", "redwinner", "yellowwinner"][winner];

    let turnCount = 0;
    $: isTie = turnCount >= 42;

    let board = new Array(7)
        .fill(null)
        .map(() =>
            new Array(6)
                .fill(null)
                .map(() => ({ player: Player.None, highlight: false }))
        );

    let handleClick = (e) => {
        if (winner !== Player.None) return;
        if (isTie) return;
        turnCount++;
        let colIdx = e.detail.col;

        for (let rowIdx = board[0].length - 1; rowIdx >= 0; --rowIdx) {
            if (board[colIdx][rowIdx].player === Player.None) {
                board[colIdx][rowIdx].player = currentPlayer;
                winner = findWinner();
                if (!winner) changePlayer();
                break;
            }
        }
    };

    const BgColor = {
        Red: "#2f2424",
        Yellow: "#373724",
    };
    document.body.style.backgroundColor = BgColor.Red;
    let changePlayer = () => {
        if (currentPlayer === Player.Red) {
            document.body.style.backgroundColor = BgColor.Yellow;
            currentPlayer = Player.Yellow;
        } else {
            document.body.style.backgroundColor = BgColor.Red;
            currentPlayer = Player.Red;
        }
    };

    let findWinner = () => {
        // Horizontal check
        for (let rowIdx = 0; rowIdx < board[0].length; ++rowIdx) {
            for (let colIdx = 0; colIdx < board.length - 3; ++colIdx) {
                if (
                    board[colIdx][rowIdx].player !== Player.None &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx + 1][rowIdx].player &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx + 2][rowIdx].player &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx + 3][rowIdx].player
                ) {
                    board[colIdx][rowIdx].highlight = true;
                    board[colIdx + 1][rowIdx].highlight = true;
                    board[colIdx + 2][rowIdx].highlight = true;
                    board[colIdx + 3][rowIdx].highlight = true;
                    return board[colIdx][rowIdx].player;
                }
            }
        }
        // Vertical check
        for (const col of board) {
            for (let rowIdx = 0; rowIdx < col.length - 3; ++rowIdx) {
                if (
                    col[rowIdx].player !== Player.None &&
                    col[rowIdx].player === col[rowIdx + 1].player &&
                    col[rowIdx].player === col[rowIdx + 2].player &&
                    col[rowIdx].player === col[rowIdx + 3].player
                ) {
                    col[rowIdx].highlight = true;
                    col[rowIdx + 1].highlight = true;
                    col[rowIdx + 2].highlight = true;
                    col[rowIdx + 3].highlight = true;
                    return col[rowIdx].player;
                }
            }
        }
        //// Diagonal check
        // Top-left to Bottow-right
        for (let rowIdx = 0; rowIdx < board[0].length - 3; ++rowIdx) {
            for (let colIdx = 0; colIdx < board.length - 3; ++colIdx) {
                if (
                    board[colIdx][rowIdx].player !== Player.None &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx + 1][rowIdx + 1].player &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx + 2][rowIdx + 2].player &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx + 3][rowIdx + 3].player
                ) {
                    board[colIdx][rowIdx].highlight = true;
                    board[colIdx + 1][rowIdx + 1].highlight = true;
                    board[colIdx + 2][rowIdx + 2].highlight = true;
                    board[colIdx + 3][rowIdx + 3].highlight = true;
                    return board[colIdx][rowIdx].player;
                }
            }
        }
        // Top-right to Bottow-left
        for (let rowIdx = 0; rowIdx < board[0].length - 3; ++rowIdx) {
            for (let colIdx = 3; colIdx < board.length; ++colIdx) {
                if (
                    board[colIdx][rowIdx].player !== Player.None &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx - 1][rowIdx + 1].player &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx - 2][rowIdx + 2].player &&
                    board[colIdx][rowIdx].player ===
                        board[colIdx - 3][rowIdx + 3].player
                ) {
                    board[colIdx][rowIdx].highlight = true;
                    board[colIdx - 1][rowIdx + 1].highlight = true;
                    board[colIdx - 2][rowIdx + 2].highlight = true;
                    board[colIdx - 3][rowIdx + 3].highlight = true;
                    return board[colIdx][rowIdx].player;
                }
            }
        }
        return Player.None;
    };
</script>

<main>
    <div class="winner {winnerColor}">
        {#if isTie}
            Tie
        {:else if winner === Player.None}
            Player: {playerName(currentPlayer)}
        {:else if winner !== Player.None}
            Winner: {playerName(winner)}
        {/if}
        <span class="separator">&gt;=====================&lt;</span>
    </div>

    <Board {board} on:click={handleClick} />
</main>

<style>
    div {
        color: lightgray;
        font-size: 4rem;

        font-family: "Courier New", Courier, monospace;
        text-align: center;
    }

    .winner {
        margin-top: 1rem;
    }
    .nowinner {
        color: gray;
    }
    .redwinner {
        color: red;
    }
    .yellowwinner {
        color: yellow;
    }

    .separator {
        display: block;
        color: rgb(128, 128, 128, 69%);
    }
</style>

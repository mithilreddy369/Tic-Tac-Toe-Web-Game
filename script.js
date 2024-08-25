document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");
    let currentPlayer = "X";
    let board = Array(9).fill(null);

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (cell.textContent === "" && !isGameOver()) {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.setAttribute("data-player", currentPlayer);
                if (checkWin()) {
                    highlightWinningCells(checkWin());
                    message.textContent = `Player ${currentPlayer} wins!`;
                } else if (board.every(cell => cell !== null)) {
                    message.textContent = "It's a draw!";
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    });

    resetButton.addEventListener("click", resetGame);

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return pattern;
            }
        }
        return null;
    }

    function highlightWinningCells(winningCells) {
        winningCells.forEach(index => {
            cells[index].classList.add("win");
        });
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.removeAttribute("data-player");
            cell.classList.remove("win");
        });
        message.textContent = "";
        currentPlayer = "X";
    }

    function isGameOver() {
        return checkWin() || board.every(cell => cell !== null);
    }
});

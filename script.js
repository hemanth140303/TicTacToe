        const board = document.getElementById("board");
        const status = document.getElementById("status");
        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];

        function createBoard() {
            board.innerHTML = "";
            gameBoard.forEach((cell, index) => {
                const div = document.createElement("div");
                div.classList.add("cell");
                div.textContent = cell;
                div.addEventListener("click", () => makeMove(index));
                board.appendChild(div);
            });
        }

        function makeMove(index) {
            if (gameBoard[index] === "") {
                gameBoard[index] = currentPlayer;
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Player ${currentPlayer}'s Turn`;
                checkWinner();
                createBoard();
            }
        }

        function checkWinner() {
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
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    status.textContent = `Player ${gameBoard[a]} Wins!`;
                    board.childNodes.forEach(cell => cell.classList.add("taken"));
                    return;
                }
            }
            if (!gameBoard.includes("")) {
                status.textContent = "It's a Draw!";
            }
        }

        function resetGame() {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            status.textContent = "Player X's Turn";
            createBoard();
        }

        createBoard();

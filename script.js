document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelector(".status");
    const restartBtn = document.querySelector(".restart");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // أنماط الفوز
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // الصفوف
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // الأعمدة
        [0, 4, 8], [2, 4, 6]             // الأقطار
    ];

    // التحقق من الفوز
    function checkWinner() {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                statusText.textContent = `الفائز هو: ${gameBoard[a]}`;
                return;
            }
        }
        if (!gameBoard.includes("")) {
            gameActive = false;
            statusText.textContent = "التعادل!";
        }
    }

    // عند الضغط على أي مربع
    function handleCellClick(event) {
        const cellIndex = event.target.dataset.index;
        if (gameBoard[cellIndex] === "" && gameActive) {
            gameBoard[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (gameActive) statusText.textContent = `دور اللاعب: ${currentPlayer}`;
        }
    }

    // إعادة تشغيل اللعبة
    function restartGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        gameActive = true;
        statusText.textContent = `دور اللاعب: ${currentPlayer}`;
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
});
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartBtn = document.getElementById('restart');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] !== '' || !gameActive) return;

    // Add hover effect class
    cell.classList.add('cell-hover');
    
    // Remove hover effect after animation
    setTimeout(() => {
        cell.classList.remove('cell-hover');
    }, 300);

    gameState[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Add 3D rotation effect
    cell.style.transform = 'rotateY(180deg)';
    setTimeout(() => {
        cell.style.transform = 'rotateY(0)';
    }, 300);

    if (checkWin()) {
        const winningCombo = getWinningCombo();
        highlightWinningCells(winningCombo);
        animateWinningMessage();
        scores[currentPlayer]++;
        updateScores();
        gameActive = false;
        confetti();
        return;
    }

    if (checkDraw()) {
        status.textContent = "Game ended in a draw!";
        status.classList.add('draw-animation');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    animateStatusChange();
}

function animateStatusChange() {
    status.style.transform = 'translateY(20px)';
    status.style.opacity = '0';
    
    setTimeout(() => {
        status.textContent = `Player ${currentPlayer}'s Turn`;
        status.style.transform = 'translateY(0)';
        status.style.opacity = '1';
    }, 200);
}

function animateWinningMessage() {
    status.style.transform = 'scale(0)';
    
    setTimeout(() => {
        status.textContent = `Player ${currentPlayer} wins!`;
        status.style.transform = 'scale(1.2)';
        setTimeout(() => {
            status.style.transform = 'scale(1)';
        }, 200);
    }, 200);
}

function confetti() {
    for (let i = 0; i < 50; i++) {
        createConfetti(i);
    }
}

function createConfetti(i) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = i * 50 + 'ms';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function getWinningCombo() {
    return winningConditions.find(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function highlightWinningCells(combo) {
    combo.forEach((index, i) => {
        setTimeout(() => {
            cells[index].classList.add('winner');
            cells[index].style.transform = 'scale(1.1) rotate(5deg)';
        }, i * 200);
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function updateScores() {
    const oldScoreX = parseInt(scoreX.textContent);
    const oldScoreO = parseInt(scoreO.textContent);
    
    if (scores.X > oldScoreX) {
        animateScore(scoreX, oldScoreX, scores.X);
    }
    if (scores.O > oldScoreO) {
        animateScore(scoreO, oldScoreO, scores.O);
    }
}

function animateScore(element, start, end) {
    element.style.transform = 'scale(1.5)';
    element.style.color = '#4CAF50';
    
    setTimeout(() => {
        element.textContent = end;
        element.style.transform = 'scale(1)';
        setTimeout(() => {
            element.style.color = '#1a237e';
        }, 500);
    }, 300);
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winner');
        cell.style.transform = 'scale(0)';
    });

    setTimeout(() => {
        cells.forEach(cell => {
            cell.style.transform = 'scale(1)';
        });
    }, 50);

    status.classList.remove('draw-animation');
    animateStatusChange();
}

// Add hover effect to cells
cells.forEach(cell => {
    cell.addEventListener('mouseenter', () => {
        if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
            cell.style.transform = 'scale(1.1)';
        }
    });
    
    cell.addEventListener('mouseleave', () => {
        if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
            cell.style.transform = 'scale(1)';
        }
    });
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

// Initial animation
document.addEventListener('DOMContentLoaded', () => {
    cells.forEach((cell, index) => {
        cell.style.transform = 'scale(0)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, index * 100);
    });
});

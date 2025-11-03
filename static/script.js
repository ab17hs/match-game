const cards = ['🍎', '🍌', '🍇', '🍉', '🍎', '🍌', '🍇', '🍉'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const board = document.getElementById('game-board');
const winMessage = document.getElementById('win-message');
const restartBtn = document.getElementById('restart');

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin() {
    const allDisabled = Array.from(board.children).every(btn => btn.disabled);
    if (allDisabled) {
        winMessage.style.display = 'block';
    }
}

function createBoard() {
    board.innerHTML = '';
    winMessage.style.display = 'none';
    cards.sort(() => Math.random() - 0.5); // shuffle

    cards.forEach(card => {
        const btn = document.createElement('button');
        btn.classList.add('card');
        btn.textContent = '?';
        btn.dataset.value = card;

        btn.addEventListener('click', () => {
            if (lockBoard || btn.textContent !== '?') return;

            btn.textContent = card;

            if (!firstCard) {
                firstCard = btn;
            } else {
                secondCard = btn;
                lockBoard = true;

                if (firstCard.dataset.value === secondCard.dataset.value) {
                    setTimeout(() => {
                        firstCard.disabled = true;
                        secondCard.disabled = true;
                        resetBoard();
                        checkWin();
                    }, 500);
                } else {
                    setTimeout(() => {
                        firstCard.textContent = '?';
                        secondCard.textContent = '?';
                        resetBoard();
                    }, 1000);
                }
            }
        });

        board.appendChild(btn);
    });
}

// Restart button
restartBtn.addEventListener('click', createBoard);

// Initialize board on page load
createBoard();

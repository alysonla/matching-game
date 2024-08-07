const cards = [
    '🍎', '🍎', '🍌', '🍌',
    '🍇', '🍇', '🍉', '🍉',
    '🍓', '🍓', '🍒', '🍒',
    '🐶', '🐶', '🐱', '🐱',
    '🐭', '🐭', '🐰', '🐰'
];

let firstCard = null;
let secondCard = null;
let matchedCards = 0;
const gameBoard = document.getElementById('game-board');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (this === firstCard || this.classList.contains('matched')) return;
    this.textContent = this.dataset.card;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else if (!secondCard) {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;
        resetCards();
        if (matchedCards === cards.length) {
            setTimeout(() => alert('Congratulations! You matched all the cards!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    matchedCards = 0;
    resetCards();
    createBoard();
}

createBoard();

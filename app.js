const winningCambo = [  
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const playerXInput = document.getElementById('player-x-name');
const playerOInput = document.getElementById('player-o-name');
const startBtnEl = document.getElementById('start-btn');
const restartBtnEl = document.getElementById('restart-btn');

let board;       
let turn;        
let winner;      
let playerXName; 
let playerOName; 

function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    
    playerXName = playerXInput.value.trim() || 'Player X';
    playerOName = playerOInput.value.trim() || 'Player O';
    
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    squareEls.forEach((square, index) => {
        square.textContent = board[index];
        square.style.color = board[index] === 'X' ? 'red' : board[index] === 'O' ? 'blue' : 'black';
    });
}

function updateMessage() {
    if (!winner) {
        const currentName = turn === 'X' ? playerXName : playerOName;
        messageEl.textContent = `${currentName}'s turn (${turn})`;
    } else if (winner === 'T') {
        messageEl.textContent = "It's a tie!";
    } else {
        const winningName = turn === 'X' ? playerXName : playerOName;
        messageEl.textContent = ` ${winningName} wins the game!`;
    }
}

function handleClick(event) {
    const squareIndex = parseInt(event.target.id);
    
    if (board[squareIndex] !== '' || winner) return;
    board[squareIndex] = turn;
    checkResult();
    
    if (!winner) {
        turn = turn === 'X' ? 'O' : 'X';
    }
    
    render();
}


function checkResult() {
    for (let i = 0; i < winningCambo.length; i++) {
        const [a, b, c] = winningCambo[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
            return;
        }
    }
    if (!board.includes('')) {
        winner = 'T';
    }
}


squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});

startBtnEl.addEventListener('click', init);
restartBtnEl.addEventListener('click', init);
init();
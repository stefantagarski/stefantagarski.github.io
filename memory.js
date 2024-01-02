// Date: 2021-03-01
    let resetButton;
    let tiles;
    let permutation;
    let first;
    let second;
    let startTime;
    let score = 0;

    const ids = ['t11', 't12', 't13', 't14', 't21', 't22', 't23', 't24', 't31', 't32', 't33', 't34', 't41', 't42', 't43', 't44'];
    const icons = [
    'brown_hexagon.png',
    'green_triangle.png',
    'Pan_Blue_Circle.png',
    'pink_square.png',
    'red_square.png',
    'yellow_circle.png',
    'black_heart.png',
    'lego_head.png'
    ];

    document.addEventListener("DOMContentLoaded", () => {
    resetButton = document.querySelector('input[type="submit"]');
    tiles = document.getElementsByTagName('td');

    resetButton.addEventListener('click', () => game());

    for (const tile of tiles) {
    tile.addEventListener('click', click);
}

    game();
});

    function game() {
    permutation = [...icons, ...icons];
    shuffle();

    for (let i = 0; i < 16; i++) {
    document.querySelector(`td#${ids[i]} img`).src = 'default.png';
}

    startTimer();
    score = 0;
    updateScore();
}

    function shuffle() {
    for (let i = permutation.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    let temp = permutation[i];
    permutation[i] = permutation[j];
    permutation[j] = temp;
}
}

    function click(event) {
    let element;

    if (event.target.nodeName === 'IMG') {
    element = event.target.parentElement.id;
} else {
    element = event.target.id;
}

    if (!document.getElementById(element).children[0].src.match(/.*default\.png/g)) {
    return;
}

    document.getElementById(element).children[0].src = permutation[ids.indexOf(element)];

    if (first !== undefined) {
    document.getElementById(first).children[0].src = 'default.png';
}

    first = second;
    second = element;

    if (first !== undefined && second !== undefined && document.getElementById(first).children[0].src === document.getElementById(second).children[0].src) {
    first = undefined;
    second = undefined;
    updateScore();

    if (score === icons.length) {
    stopTimer();
    showWinningMessage();
}
}
}

    function startTimer() {
    startTime = new Date();
}

    function stopTimer() {
    const endTime = new Date();
    const elapsedTime = (endTime - startTime) / 1000; // in seconds
    alert(`Congratulations! You completed the game in ${elapsedTime} seconds.`);
}

    function updateScore() {
    // Update the score display on the page
    document.getElementById('score').textContent = `Score: ${score}`;
}


    function showWinningMessage() {
    alert('Congratulations! You won!');
}

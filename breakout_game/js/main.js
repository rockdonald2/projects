const open = document.querySelector('#open');
const close = document.querySelector('#close');
const rules = document.querySelector('#rules');

function toggleRules() {
    rules.classList.toggle('show');
}

open.addEventListener('click', toggleRules);
close.addEventListener('click', toggleRules);

const game = document.querySelector('.game'); // == canvas
const ctx = game.getContext('2d'); // ez egy olyan object-et térít, amely biztosítsa azokat az eszközöket és tulajdonságokat, amelyekkel rajzolhatunk
                                    // a canvas elemre

let score = 0; // hogy elmentsük a jelenlegi játékos score-ját

const brickRowCount = 9;
const brickColumnCount = 5;

// létrehozunk egy objectet, amely tartalmazza a golyó tulajdonságait
const ball = {
    x: game.width / 2, // kezdeti koordinátái a canvas elem közepén
    y: game.height / 2,
    size: 10, // mekkora a golyó
    speed: 4, // milyen gyorsan fog mozogni
    dx: 4, // sebesség változás, azért kell mindkét koordinátatengelyre, mert bármely irányba mozoghat
    dy: -4
}

// létrehozunk egy objectet, amely tartalmazza a játék által mozgatot elem tulajdonságait
const paddle = {
    x: game.width / 2 - 40, // kezdeti koordináták, majdnem középen, és a canvas elem legalján
    y: game.height - 20,
    w: 80, // alapvető méretei
    h: 10,
    speed: 8, // gyorsasága
    dx: 0 // csak egy irányba mozoghat, vízszintesen, alapértelmezetten nem mozog
}

// létrehozunk egy objectet, amely tartalmazza a téglák tulajdonságait
const brick = {
    w: 70, // alapvető méretei
    h: 20, 
    padding: 10, 
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// létrehozzuk egy array-nyi tégla elemet
const bricks = [];
for (let i = 0; i < brickRowCount; ++i) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; ++j) {
        const x = i * (brick.w + brick.padding) + brick.offsetX; // létrehozzuk az elhelyezkedési koordinátáikat
        const y = j * (brick.h + brick.padding) + brick.offsetY;
        bricks[i][j] = {x, y, ...brick};
    }
}

// felrajzoljuk a canvas elemre a golyót
function drawBall() {
    ctx.beginPath(); // elkezd egy path-et, magyarán ezzel kezdjük a rajzolást
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); // létrehozunk egy kört, a létrehozott tulajdonságokkal
    // az utolsó két paraméter az határozza meg, hogy hol kezdődik és hol végződik a kör, 0 == 3 óra, a Math.PI * 2, ugyanott ér véget, egy teljes kört megtéve
    ctx.fillStyle = '#0095dd'; // milyen színnel legyen kitöltve
    ctx.fill(); // kitölti
    ctx.closePath(); // befejezi a path-et, vége a rajzolásnak
}

// felrajzoljuk a játékos által irányított elemet
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// felrajzoljuk a játékos score-ját a canvas elemre
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, game.width - 110, 35);
}

// felrajzoljuk a téglákat
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(b => {
            ctx.beginPath();
            ctx.rect(b.x, b.y, b.w, b.h);
            ctx.fillStyle = b.visible ? '#0095dd' : 'transparent'; // azért van szükség a visible tulajdonságra, mert az alapján fog működni az eltűnés effekt
            ctx.fill();
            ctx.closePath();
        });
    });
}

function movePaddle() {
    // szóval eltoljuk a paddle elemet a dx nagysággal, a x tengely mentén
    paddle.x += paddle.dx;

    // falnak ütköznénk abban az esetben, ha az x koordináta, és a paddle szélességének összege nagyobb lenne, mint a canvas elem szélessége
    if (paddle.x + paddle.w > game.width) {
        paddle.x = game.width - paddle.w;
    }

    // másik oldalról nézve, pedig nullához viszonyítva tesszük ugyanezt
    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

function moveBall() {
    // megint mozgatjuk a golyót a dx és dy növekmény értékeikkel, x/y tengely mentén
    ball.x += ball.dx;
    ball.y += ball.dy;

    // bal/jobb oldali ütközés esetén, megfordítjuk a növekmény irányát
    if (ball.x + ball.size > game.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    // alsó/felső oldali ütközés esetén, ugyancsak
    if (ball.y + ball.size > game.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // a játékos elemével való ütközés esetén állítsuk eredetire a növekmény irányát
    // az első összefüggés a bal oldali határ túllépését, a második a jobb oldali határon belül maradást, a harmadik pedig az a fölötti elhelyezkédst ellenőrzi.
    if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }

    bricks.forEach(column => {
        column.forEach(b => {
            if (b.visible) {
                if (
                    ball.x - ball.size > b.x &&         // bal oldai ütközés 
                    ball.x + ball.size < b.x + b.w &&   // jobb oldali ütközés
                    ball.y + ball.size > b.y &&         // felső ütközés
                    ball.y - ball.size < b.y + b.h      // alsó ütközés
                ) {
                    // megváltoztatjuk a növekmény irányát, és eltüntetjük az adott téglát
                    ball.dy *= -1;
                    b.visible = false;

                    increaseScore();
                }
            }
        });
    });

    if (ball.y + ball.size > game.height) {
        showAllBricks();
        score = 0;
    }
}

function increaseScore() {
    score++;

    // abban az esetben, ha az összes tégla eltünne, csináljon újakat
    if (score % (brickRowCount * brickColumnCount) === 0) {
        showAllBricks();
    }
}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(b => {
            b.visible = true;
        });
    });
}

function draw() {
    // kitörölünk minden elemet a canvas elemről és felrajzolunk minden saját elemet
    ctx.clearRect(0, 0, game.width, game.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

function update() {
    movePaddle();
    moveBall();

    // minden változás esetén a teljes canvas-t újrarajzoljuk
    draw();

    // ezzel a funkcióval megmondjuk az a böngészőnek, hogy mielőtt újrarajzolná az adott ablakot, hívja le ezt a funkcitó
    requestAnimationFrame(update);
}

update();

// a játékos által irányított elem mozgása
function keyDown(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        paddle.dx = paddle.speed;
    } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

// abban az esetben, ha elengedjük álljon meg
function keyUp(e) {
    if (
        e.key == 'Right' ||
        e.key == 'ArrowRight' ||
        e.key == 'Left' ||
        e.key == 'ArrowLeft'
        ) {
            paddle.dx = 0;
        }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
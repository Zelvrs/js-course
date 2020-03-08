let ball = document.getElementsByClassName('ball')[0];
let wrap = document.getElementsByClassName('wrapper')[0];

let left = wrap.getBoundingClientRect().left;
let right = wrap.getBoundingClientRect().right;

var speed = 2;
var x = ball.getBoundingClientRect().x;
let lastspeed = 0;
// console.log(x)

let button1 = document.getElementsByClassName('button1')[0];
let button2 = document.getElementsByClassName('button2')[0];

setInterval(function() {
    x = x + speed;
    console.log(x);
    ball.style = `transform: translateX(${x}px);`;
    if (ball.getBoundingClientRect().right > right) {
        speed = speed * -1;
    } else if (ball.getBoundingClientRect().left < left) {
        speed = speed * -1;
    }
}, 1)

button1.addEventListener('click', function() {
    if (speed < 0 ) {
        speed = speed - 1;
    } else {
        speed = speed + 1;
    }
})
button2.addEventListener('click', function() {
    if (speed !== 0) {
        lastspeed = speed;
        speed = 0;
        button2.innerText = 'jalan'
    } else {
        speed = lastspeed;
        button2.innerText = 'Stop'
    }
} )


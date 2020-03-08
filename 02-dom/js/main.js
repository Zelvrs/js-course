let button = document.getElementById('button1');

let boxes = document.getElementsByClassName('box')

let reset = function() {
    for (let i = 0 ; i < boxes.length; i++) {
        let box = boxes[i];
        box.classList.remove('selected')
    }
}

button.onclick = function(e) {
    reset();

    document.body.style = 'background-color: aqua;';
}

for (let i = 0 ; i< boxes.length ; i++) {
    let box = boxes[i];

    box.addEventListener('click', function(e) {
        let el = e.target;

        reset();
        el.classList.add('selected')

        if (el.innerText == 'Merah') {
            document.body.style = 'background-color: red';
        } else if (el.innerText == 'Hijau') {
            document.body.style = 'background-color: green';
        } else if (el.innerText == 'Biru') {
            document.body.style = 'background-color: blue';
        }
    });




    box.addEventListener('mousedown', function(e) {
        let el = e.target;

        el.style = 'background-color: red'
    });

    box.addEventListener('mouseup', function(e) {
        let el = e.target;

        el.style = 'background-color: white'
    });
}
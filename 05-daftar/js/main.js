let ikan = document.getElementById('ikan');
let ayam = document.getElementById('ayam');
let tempe = document.getElementById('tempe');
let totalHarga = document.getElementById('total');

let total = 0;

let updateHarga = function() {
    totalHarga.innerText = total;
}

ikan.addEventListener('change', function(e) {
    if (e.target.checked) {
        total = total + 9000;
    } else {
        total = total - 9000;
    }

    updateHarga();
});

ayam.addEventListener('change', function(e) {
    if (e.target.checked) {
        total = total + 15000;
    } else {
        total = total - 15000;
    }

    updateHarga();
});

tempe.addEventListener('change', function(e) {
    if (e.target.checked) {
        total = total + 10000;
    } else {
        total = total - 10000;
    }

    updateHarga();
});
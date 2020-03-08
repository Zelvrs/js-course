let ikan = document.getElementById('ikan');
let ayam = document.getElementById('ayam');
let tempe = document.getElementById('tempe');
let totalHarga = document.getElementById('total');

let jumlahikan = document.getElementById('jumlahikan');
let jumlahayam = document.getElementById('jumlahayam');
let jumlahtempe = document.getElementById('jumlahtempe');

let total = 0;

let formatHarga = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
let value = document
let updateHarga = function() {
    total = 0;
    
    if (ikan.checked) {
        total = total + 9000 * jumlahikan.value;
    }
    if (ayam.checked) {
        total = total + 9000 * jumlahayam.value;
    }
    if (tempe.checked) {
        total = total + 9000 * jumlahtempe.value;
    }

    totalHarga.innerText = formatHarga(total);
}

jumlahikan.addEventListener('change', function() {
    updateHarga();
})
jumlahayam.addEventListener('change', function() {
    updateHarga();
})
jumlahtempe.addEventListener('change', function() {
    updateHarga();
})


ikan.addEventListener('change', function(e) {
  
    if (e.target.checked) {
        jumlahikan.disabled = false;
    } else {
        jumlahikan.disabled = true;
    }
    
    updateHarga();
});

ayam.addEventListener('change', function(e) {
    if (e.target.checked) {
        jumlahayam.disabled = false;
    } else {
        jumlahayam.disabled = true;
    }

    updateHarga();
});

tempe.addEventListener('change', function(e) {
    if (e.target.checked) {
        jumlahtempe.disabled = false;
    } else {
        jumlahtempe.disabled = true;
    }
    updateHarga();
});
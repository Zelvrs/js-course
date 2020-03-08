// console.log("hiiiii");
// console.warn("hati2 gan");
// console.error("kok gak bisa??");
// console.info("blablalbla");
// console.log(100000);
// console.log('%cWAHAHAHAHAH' , 'background-color:black;font-size: 200px; color:white');

// tipe variable : string, number , object

//let and const

//let :

let nama;
nama = 'Gazel';
let usia = 15;
usia = 17;

console.log(nama);
console.log(usia);
console.log('Nama saya ' + nama + ', umur saya ' + usia);
//tamplate literal
console.log(`Nama saya ${nama}, umur saya ${usia}`);

const pi = 3.14;

const perusahaan = 'ajinomoto';

console.log(`nama saya ${nama}, usia saya ${usia}, saya bekerja di perusahaan ${perusahaan}
 dengan pi = %c${pi}`, 'font-weight: bold; color: red');

let person = {
    nama: 'Gazel',
    umur: 15,
    attributes: {
        height: 165,
        weight: 55,
    }
};
console.log(`perkenalkan nama saya ${person.nama}, umur saya ${person.umur}
, tingginya ${person.attributes.height}cm, beratnya ${person.attributes.weight}kg`)

let numbers = [1, 2, 3, 4];
console.log(`angka pertama ${numbers[0]}`);
console.log(`angka kedua ${numbers[1]}`);

let campuran = [1, 'apel', {weight: 12}, [1, 2, 3]];
console.log(campuran)

let a = campuran[2];
console.log(a.weight)
console.log(campuran[2].weight);

console.log(`campuran weight ${campuran[2].weight}`);
console.log(`Element ketiga dari array %c${campuran[3] [2]}`, 'color: red')


let buah;
console.log(buah);

let mobil = {mesin: 'turbo'};
console.log(`roda mobil: ${mobil.roda}`);

let pesawat = null;
console.log(pesawat);

let benar = true;
console.log(`benar adalah ${benar}`)



let x = 10

if (x > 0) {
    console.log(`x bernilai positif`);
} else if ( x == 0) {
    console.log(`x bernilai 0`)
} else {
    console.log('x bernilai negatif')
}


for (let i=1;i<=10;i++) {
    if ( i % 2 == 0) [
        console.log(`angka ini adalah ${i} dan angka ${i} adalah angka genap`)
    ]
    else {
        console.log(`angka ini adalah ${i} dan angka ${i} adalah angka ganjil`)
    }
}



function halo() {
    console.log('halo semuanya dari function');
}

halo();

function sisaBagi (a, b) {
    return a % b;
}

function jumlah (a, b) {
    return a + b;
}


let hasil = jumlah(3, 2);
console.log(`hasil jumlah = ${hasil}`);

function isPrime (angka) {
    for (let i = 2; i < angka ; i++) {
        if (sisaBagi(angka, i) == 0) {
            return false;
        }
    }

    return true;
}

for (let i=2;i<=20;i++) {
    if (isPrime(i)) {
        console.log(`${i} prima`)
    } else {
        console.log(`${i}  bukan prima`)
    }
}


let tidur = function () {
    console.log('mari kita tidur')
};

setTimeout(function() {
    console.log ('jumpscare datang setelah angka 5')
}, 2000);

setTimeout(function() {
    console.log('Keluar dalam 2 detik');
}, 2000);

let loadImage = function(url) {
    // Create a new `Image` instance
    var image = new Image();

    image.onload = function() {
        // Inside here we already have the dimensions of the loaded image
        var style = [
        // Hacky way of forcing image's viewport using `font-size` and `line-height`
        'font-size: 1px;',
        'line-height: ' + this.height + 'px;',

        // Hacky way of forcing a middle/center anchor point for the image
        'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',

        // Set image dimensions
        'background-size: ' + this.width + 'px ' + this.height + 'px;',

        // Set image URL
        'background: url('+ url +');'
        ].join(' ');

        // notice the space after %c
        console.log('%c ', style);
    };

    // Actually loads the image
    image.src = url;
}


let counter = 1;
let interval1 = setInterval(function() {
    console.log(`mari makan .... ${counter}`)
    counter++;

    if (counter > 5) {
        loadImage('')
        console.log('%c DUARRRRRRR', 'color: red; background-color: black; font-size: 100px')
        clearInterval(interval1);
        
    }
}, 1000)

let makanan = '1';

if (makanan < 0) {
    console.log('benar');
} else {
    console.log('salah')
}

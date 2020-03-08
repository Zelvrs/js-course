let form = document.getElementById('form');
let name = document.getElementById('name');
let content = document.getElementById('content');

let updateStorage = function() {
    let elNames = document.getElementsByClassName('name');
    let arrNames = [];

    for (let i = 0; i < elNames.length; i++) {
        let span = elNames[i];
        let name = span.innerText;

        arrNames.push(name);
    }

    let strNames = JSON.stringify(arrNames);

    localStorage.setItem('names', strNames);
}

let getStorage = function() {
    let strNames = localStorage.getItem('names');

    return JSON.parse(strNames);
}

let addCard = function(namaLengkap) {
    let elName = document.createElement('span');
    elName.classList.add('name');
    elName.innerText = namaLengkap;

    let elEdit = document.createElement('a');
    elEdit.href = '#';
    elEdit.innerHTML = '<i class="material-icons text-dark">create</i>';

    let elRemove = document.createElement('a');
    elRemove.href = '#';
    elRemove.innerHTML = '<i class="material-icons text-danger">delete</i>';

    let elDivOptions = document.createElement('div');
    elDivOptions.append(elEdit);
    elDivOptions.append(elRemove);

    let elForm = document.createElement('form');

    let elInput = document.createElement('input');
    elInput.style = 'display:none;';
    elInput.type = 'text';
    elInput.classList.add('form-control');

    let element = document.createElement('div');
    element.classList.add('card-name');
    element.classList.add('border');
    element.classList.add('shadow-sm');
    element.classList.add('p-2');
    element.classList.add('mb-2');
    element.classList.add('radius');
    element.classList.add('d-flex');
    element.classList.add('justify-content-between');
    element.append(elName);

    elForm.addEventListener('submit', function(e) {
        e.preventDefault();

        elName.style = 'display: block';
        elInput.style = 'display: none';
        elName.innerText = elInput.value;
        namaLengkap = elInput.value;
        
        updateStorage();
    });

    elEdit.addEventListener('click', function(e) {
        e.preventDefault();

        elName.style = 'display: none';
        elInput.style = 'display: block; width: 200px;';
        elInput.value = namaLengkap;
    });

    elRemove.addEventListener('click', function(e) {
        e.preventDefault();

        e.target.parentNode.parentNode.parentNode.remove();

        updateStorage();
    });

    elForm.append(elInput);

    element.append(elForm);
    element.append(elDivOptions);

    content.prepend(element);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let namaLengkap = name.value;

    if (name.value.trim().length === 0) {
        alert('Nama tidak boleh kosong');
        name.value = '';
        return;
    }

    addCard(namaLengkap);

    name.value = '';

    updateStorage();
});

let arrNames = getStorage();

for (let i = 0; i < arrNames.length; i++) {
    addCard(arrNames[i]);
}
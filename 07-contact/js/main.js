const content = document.getElementById('content');
const form = document.getElementById('form');
const aAddContact = document.getElementById('addContact');
const aCancel = document.getElementById('cancel');

const inputName = document.querySelector('[name="name"]');
const inputAddress = document.querySelector('[name="address"]');
const inputPhone = document.querySelector('[name="phone"]');


const aDelete = document.getElementById('delete')
const aEdit = document.getElementById('delete')

const aAll = document.getElementById('all')
const aFamily = document.getElementById('family')
const aWork = document.getElementById('work')
const aFriend = document.getElementById('friend')



let contacts = [];
let idSelected = null;

let contactFromStorage = JSON.parse(localStorage.getItem('contacts'));
if (contactFromStorage !== null) {
    contacts = contactFromStorage;
}

function updateStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function showForm(id) {
    form.classList.remove('d-none');
    form.classList.add('d-block');

    content.classList.remove('d-block');
    content.classList.add('d-none');

    form.reset();

    if (id !== undefined) {
        let contact = contacts.find(function (contact) {
            return contact.id === id;
        })

        if (contact !== undefined) {
            idSelected = id;

            inputName.value = contact.name
            inputAddress.value = contact.address
            inputPhone.value = contact.phone
            inputGroup.value = contact.group
            console.log(contact)
        }
    }
}

function renderCard(contact) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('shadow-sm');
    card.classList.add('mb-3');

    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.innerHTML = `<h4>${contact.name}</h4>`;

    card.append(cardHeader);

    let listGroup = document.createElement('ul');
    listGroup.classList.add('list-group');
    listGroup.classList.add('list-group-flush');
    listGroup.innerHTML = `
    <li class="list-group-item d-flex align-items-center">
        <i class="material-icons mr-1">place</i> ${contact.address}
    </li>
    <li class="list-group-item d-flex align-items-center">
        <i class="material-icons mr-1">phone</i> ${contact.phone}
    </li>
    <li class="list-group-item d-flex align-items-center">
        <i class="material-icons mr-1">people_alt</i> ${contact.group}
    </li>
    `;
    card.append(listGroup);

    let cardFooter = document.createElement('div')
    cardFooter.classList.add('card-footer')
    cardFooter.classList.add('text-right')

    let aEdit = document.createElement('a')
    aEdit.href = '#';
    aEdit.classList.add('text-primary')
    aEdit.classList.add('mr-3')
    aEdit.innerHTML = `<i class="material-icons text-primary  md-16">create</i> Edit`;

    aEdit.addEventListener('click', function (e) {
        e.preventDefault();

        showForm(contact.id);
    })



    let aDelete = document.createElement('a');
    aDelete.href = '#';
    aDelete.classList.add('text-danger')
    aDelete.innerHTML = `<i class="material-icons text-danger md-16">delete</i> Delete`;

    aDelete.addEventListener('click', function (e) {
        e.preventDefault();

        contacts = contacts.filter(function (_contact) {
            return _contact.id !== contact.id;
        })

        updateStorage();
        showContent();
    })

    // cardFooter.classList.add('d-flex')
    // cardFooter.classList.add('justify-content-end')
    // cardFooter.innerHTML = `
    // <a class="nav-link" id="edit" href="#">
    // <i class="material-icons md-16 mr-1 ">create</i> Edit
    // </a>
    // <a class="nav-link  text-danger" id="delete" href="#">
    // <i class="material-icons md-16 mr-1 ">delete</i> delete
    // </a>`

    cardFooter.append(aEdit);
    cardFooter.append(aDelete);

    card.append(cardFooter);

    return card;
}

function showContent() {
    form.classList.add('d-none');
    form.classList.remove('d-block');

    content.classList.add('d-block');
    content.classList.remove('d-none');


    content.innerHTML = '';


    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];

        content.prepend(renderCard(contact));
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputGroup = document.querySelector('[name="group"]:checked')

    if (inputGroup === null || inputName.value.length === 0 || inputAddress.value.length === 0 || inputPhone.value.length === 0) {
        alert('isi dong')
    }

    if (idSelected !== null) {
        contacts = contacts.map(function (contact) {
            if (contact.id === idSelected) {
                return {
                    id: contact.id,
                    name: inputName.value,
                    address: inputAddress.value,
                    phone: inputPhone.value,
                    group: inputGroup.value,
                }
            } else {
                return contact;
            }
        });
    } else {
        let contact = {
            id: uuidv4(),
            name: inputName.value,
            address: inputAddress.value,
            phone: inputPhone.value,
            group : inputGroup.value,
        };

        contacts.push(contact);
    }
    updateStorage();

    showContent();

    form.reset();

    idSelected = null;
});
aAddContact.addEventListener('click', function (e) {
    e.preventDefault();

    showForm();

    idSelected = null;
});

aCancel.addEventListener('click', function (e) {
    e.preventDefault();

    showContent();
});



// jalan pertama kali
showContent();
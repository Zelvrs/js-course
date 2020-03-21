let products = [];

let currentId = null;

let navSelected = 'all';

if (localStorage.getItem('products') !== null) {
    products = JSON.parse(localStorage.getItem('products'));
}

function updateStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function updateNav() {
    document.querySelectorAll('.nav-item').forEach(function(navItem) {
        
        navItem.classList.remove('active')

        if (navItem.children[0].dataset.link === navSelected) {
            navItem.classList.add('active')
        }
    })
}

function parseLocation(prodloc) {
    switch (prodloc) {
        case 'japus':
            return 'Jakarta Pusat';
        case 'jatim':
            return 'Jakarta Timur';
        case 'jabar':
            return 'Jakarta Barat';
        case 'jakut':
            return 'Jakarta Utara';
        case 'jaksel':
            return 'Jakarta Selatan';


        default:
            alert('error: Location not found')
            break;
    }
}
function parseCategory(prodcat) {
    switch (prodcat) {
        case 'elektronik':
            return 'Elektronik';
        case 'fashion':
            return 'Fashion';
        case 'dapur':
            return 'Dapur';
        case 'gaming':
            return 'Gaming';

        default:
            alert('error: Category not found')
            break;
    }
}

function getProd(product) {
    let col = document.createElement('div');
    col.classList.add('col');
    col.classList.add('mb-4');

    let card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('shadow-sm')
    card.classList.add('h-100')

    let img = document.createElement('img')
    img.classList.add('card-img-top')
    img.src = product.prodimg;
    img.alt = product.prodname;

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body')
    cardBody.classList.add('text-center')
    cardBody.innerHTML = `
    <h5 class="card-title">${product.prodname}</h5>
    <p class="card-text">
    <span class="d-block">${parseLocation(product.prodloc)}</span>
    <span class="d-block font-weight-bold text-success">Rp${numberWithCommas(product.prodprice)}</span>
    <span class="d-block font-weight-bold">${parseCategory(product.prodcat)}</span>
    </p>
    `
    cardBody.innerHTML += '<p class="card-text">';

    if (product.prodoff.find(offering => offering === 'gratis') !== undefined) {
        cardBody.innerHTML += `<i class="material-icons mx-1">local_shipping</i>`
    }
    if (product.prodoff.find(offering => offering === 'cashback') !== undefined) {
        cardBody.innerHTML += `<i class="material-icons mx-1">how_to_vote</i>`
    }

    if (product.prodoff.find(offering => offering === 'diskon') !== undefined) {
        cardBody.innerHTML += `<i class="material-icons mx-1">style</i>`
    }

    let cardFooter = document.createElement('div')
    cardFooter.classList.add('card-footer')
    cardFooter.classList.add('d-flex')
    cardFooter.classList.add('align-items-center')
    cardFooter.classList.add('justify-content-center')

    let btnEdit = document.createElement('a')
    btnEdit.classList.add('btn')
    btnEdit.classList.add('btn-primary')
    btnEdit.classList.add('text-white')
    btnEdit.classList.add('mr-2')
    btnEdit.innerHTML = '<i class="material-icons" style="font-size: 18px; vertical-align: text-bottom;">edit</i>'

    let btnDelete = document.createElement('a')
    btnDelete.classList.add('btn')
    btnDelete.classList.add('btn-danger')
    btnDelete.classList.add('text-white')
    btnDelete.innerHTML = '<i class="material-icons" style="font-size: 18px; vertical-align: text-bottom;">delete</i>'

    btnDelete.addEventListener('click', function (e) {
        e.preventDefault();
        let con = confirm('yakin????')
        if (con === true) {
            products = products.filter(function (_product) {
                return _product.id !== product.id;
            })
        } else {

        }
        updateStorage();
        showContent();
    })

    btnEdit.addEventListener('click', function (e) {
        e.preventDefault();

        currentId = product.id; 

        document.querySelector('[name="nama"]').value = product.prodname;
        document.querySelector('[name="image"]').value = product.prodimg;

        document.querySelectorAll('[name="location"] option').forEach(function (option) {
            if (option.value === product.prodloc) {

                option.selected = true;
            } else {
                option.selected = false;
            }
        })

        document.querySelectorAll('[name="kategori"]').forEach(function (kategori) {
            if (kategori.value === product.prodcat) {
                kategori.checked = true;
            } else {
                kategori.checked = false;
            }
        })

        if (product.prodoff.findIndex(a => a === "gratis") >= 0) {
            document.getElementById('gratis').checked = true;
        } else {
            document.getElementById('gratis').checked = false;
        }


        if (product.prodoff.findIndex(a => a === "cashback") >= 0) {
            document.getElementById('cashback').checked = true;
        } else {
            document.getElementById('cashback').checked = false;
        }


        if (product.prodoff.findIndex(a => a === "diskon") >= 0) {
            document.getElementById('diskon').checked = true;
        } else {
            document.getElementById('diskon').checked = false;
        }

        document.querySelector('[name="price"]').value = product.prodprice;


        $('#exampleModal').modal('show');
    })

    cardFooter.append(btnEdit)
    cardFooter.append(btnDelete)

    card.append(img);
    card.append(cardBody)
    card.append(cardFooter)
    col.append(card)

    return col;


}

function showContent() {
    let el = document.getElementById('content');

    el.innerHTML = '';

    let filter = [...products];

    document.querySelector('[data-link="all"]').innerHTML = `semua (${products.length})`;
    document.querySelector('[data-link="elektronik"]').innerHTML = `Elektronik (${products.filter(product => product.prodcat ==='elektronik').length})`
    document.querySelector('[data-link="fashion"]').innerHTML = `Fashion (${products.filter(product => product.prodcat ==='fashion').length})`
    document.querySelector('[data-link="dapur"]').innerHTML = `Dapur (${products.filter(product => product.prodcat ==='dapur').length})`
    document.querySelector('[data-link="gaming"]').innerHTML = `Gaming (${products.filter(product => product.prodcat ==='gaming').length})`
    
    if (navSelected !== 'all' && navSelected !== 'add') {
       filter = filter.filter(function(product) {
            return product.prodcat === navSelected;
        })
    }
    

   filter.forEach(product => {
        el.prepend(getProd(product))
    })
}

document.getElementById('add').addEventListener('click', function (e) {
    e.preventDefault();

    // console.log('test')

    currentId = null;
})


document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    console.log('rr');

    let name = document.querySelector('[name="nama"]').value;
    let image = document.querySelector('[name="image"]').value;
    let location = document.querySelector('[name="location"] option:checked').value;
    let price = document.querySelector('[name="price"]').value;

    let category = document.querySelector('[name="kategori"]:checked');

    let offer = [];

    if (document.querySelector('[name="gratis"]:checked') !== null) {
        offer.push(document.querySelector('[name="gratis"]:checked').value);
    }


    if (document.querySelector('[name="cashback"]:checked') !== null) {
        offer.push(document.querySelector('[name="cashback"]:checked').value);
    }


    if (document.querySelector('[name="diskon"]:checked') !== null) {
        offer.push(document.querySelector('[name="diskon"]:checked').value);
    }
    if (category === null) {
        alert('fill the blanks');
        return;
    }
    let cat = category.value;

    if (currentId !== null) {
        products = products.map(function (product) {
            if (product.id === currentId) {
                return {
                    id: currentId,
                    prodname: name,
                    prodimg: image,
                    prodloc: location,
                    prodprice: parseInt(price),
                    prodcat: cat,
                    prodoff: offer,
                }
            } else {
                return product;
            }
        })
    } else {

        let product = {
            id: uuidv4(),
            prodname: name,
            prodimg: image,
            prodloc: location,
            prodprice: parseInt(price),
            prodcat: cat,
            prodoff: offer,
        }
        products.push(product)
    }
    $('#exampleModal').modal('hide');

    navSelected = 'all'
    updateNav();
    updateStorage();
    showContent();
})

document.querySelectorAll('.nav-link').forEach(function(navLink) {
    navLink.addEventListener('click', function(e) {
        e.preventDefault();

        let link = navLink.dataset.link;

        navSelected = link;

        updateNav();

        showContent();
        
    })
})

$('#exampleModal').on('hidden.bs.modal', function (e) {
    currentId = null
    document.getElementById('form').reset();
})
updateNav();
showContent();
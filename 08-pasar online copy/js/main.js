let products = [];

let currentId = null;

let search = '';

let locationFilter = [];
let offeringFilter = [];
let categoryFilter = null;

let maxPrice = null;
let minPrice = null;


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
    document.querySelectorAll('.nav-item').forEach(function (navItem) {

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



    card.append(img);
    card.append(cardBody);
    col.append(card);

    return col;


}

function showContent() {
    let el = document.getElementById('content');

    el.innerHTML = '';

    let filter = [...products];

    if (locationFilter.length > 0) {
        filter = filter.filter(product => locationFilter.findIndex(e => e === product.prodloc) >= 0);
    }

    if (offeringFilter.length > 0) {
        filter = filter.filter(product => offeringFilter.findIndex(e => (product.prodoff.findIndex(c => c === e) >= 0)) >= 0)
    }

    if(categoryFilter !== null) {
        filter = filter.filter(product => product.prodcat === categoryFilter)
        // filter = filter.filter(function(product) {
        //     return product.prodcat === categoryFilter;
        // }) 
    }

    if(minPrice != null) {
        filter = filter.filter(product => product.prodprice >= minPrice);
    }

    if(maxPrice != null) {
        filter = filter.filter(product => product.prodprice <= maxPrice);
    }



    if (search.trim().length) {
        filter = filter.filter(function (product) {
            return product.prodname.search(new RegExp(search.trim(), 'i')) >= 0
        })
    }

    filter.forEach(product =>{el.prepend(getProd(product))
    })


}

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    search = document.querySelector('[name="search"]').value

    showContent();
})

document.getElementById('formFilter').addEventListener('click', function() {
    categoryFilter = null;
    locationFilter = [];
    offeringFilter = [];
    

    if (document.querySelector('#locationJakartaPusat:checked') !== null) {

        locationFilter.push(document.querySelector('#locationJakartaPusat').value);
    }
    
    if (document.querySelector('#locationJakartaUtara:checked') !== null) {

        locationFilter.push(document.querySelector('#locationJakartaUtara').value);
    }
  
    if (document.querySelector('#locationJakartaTimur:checked') !== null) {

        locationFilter.push(document.querySelector('#locationJakartaTimur').value);
    }
    
    if (document.querySelector('#locationJakartaSelatan:checked') !== null) {

        locationFilter.push(document.querySelector('#locationJakartaSelatan').value);
    }
    
    if (document.querySelector('#locationJakartaBarat:checked') !== null) {

        locationFilter.push(document.querySelector('#locationJakartaBarat').value);
    }




    if (document.querySelector('#gratis:checked') !== null) {

        offeringFilter.push(document.querySelector('#gratis').value);
    }
    
    if (document.querySelector('#cashback:checked') !== null) {

        offeringFilter.push(document.querySelector('#cashback').value);
    }

    if (document.querySelector('#diskon:checked') !== null) {

        offeringFilter.push(document.querySelector('#diskon').value);
    }


    if (document.querySelector('[name="category"]:checked') !== null) {
        categoryFilter = document.querySelector('[name="category"]:checked').value;
    }
     
    // console.log(offeringFilter)

    showContent();
})

document.getElementById('pricemin').addEventListener('submit', function(e) {
    e.preventDefault();

    if (document.querySelector('[name="pricemin"]').value.length === 0) {
        minPrice = null;
    } else  {
        minPrice = parseInt(document.querySelector('[name="pricemin"]').value)
    }

    showContent();

    
})


document.getElementById('pricemax').addEventListener('submit', function(e) {
    e.preventDefault();

    if (document.querySelector('[name="pricemax"]').value.length === 0) {
        maxPrice = null;
    } else  {
        maxPrice = parseInt(document.querySelector('[name="pricemax"]').value)
    }

    showContent();

    
})

document.getElementById('btnReset').addEventListener('click', function (e) {
    e.preventDefault();

    document.getElementById('formFilter').reset();

    locationFilter = [];
    offeringFilter = [];
    categoryFilter = null;

    showContent();
})

showContent();
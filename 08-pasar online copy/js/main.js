let products = [];

let currentId = null;

let search = '';

let locationFilter = [];
let offeringFilter = [];
let categoryFilter = null;

let maxPrice = null;
let minPrice = null;
let wishListPage = false;
let cartPage = false;


if (localStorage.getItem('products') !== null) {
    products = JSON.parse(localStorage.getItem('products'));
} else {
    products = [{"id":"b35a2903-ffd9-4c97-933a-249ba6ca12a8","prodname":"ikan bandeng","prodimg":"https://miro.medium.com/max/400/0*94dD7zQY9GCrwEul.jpg","prodloc":"jakut","prodprice":5000,"prodcat":"dapur","prodoff":["gratis","cashback"],"wishlist":true},{"id":"e54ea3bf-d751-47c8-92c9-6c95c3f29d50","prodname":"Laptop Gaming ","prodimg":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6359/6359955_sa.jpg;maxHeight=400;maxWidth=400","prodloc":"jabar","prodprice":40000000,"prodcat":"gaming","prodoff":["gratis","cashback","diskon"]},{"id":"1861d0b0-5b9a-4d63-8b03-39ae3be7d2c7","prodname":"Hashirama action figure","prodimg":"https://i.ebayimg.com/images/g/qYUAAOSwk5FdwNpn/s-l400.jpg","prodloc":"jatim","prodprice":45250000,"prodcat":"fashion","prodoff":["gratis","cashback"],"wishlist":false},{"id":"3d1195c2-e760-4f2f-bdce-279423a8dccf","prodname":"motor beat mberrr","prodimg":"https://1.bp.blogspot.com/-RN68KliMiEE/V7GFfG5cPYI/AAAAAAAAFq8/D8JZ1nAi75sfOij9FUi-QqEFeFE3B1KXwCLcB/s400/CW-2-min-min.png","prodloc":"jakut","prodprice":2000000,"prodcat":"elektronik","prodoff":["gratis","cashback"],"wishlist":false},{"id":"ad511246-a24d-4ac2-9bbf-f6b608fef970","prodname":"Kacamata pixel","prodimg":"https://s0.bukalapak.com/img/02740800931/w-300/Open_Ds_Kacamata_Pixel_Meme_Like_A_Boss_Sunglasses_Halloween.jpg","prodloc":"jakut","prodprice":25000,"prodcat":"fashion","prodoff":["gratis","cashback","diskon"],"wishlist":false},{"id":"cfbb99aa-b01b-4814-9758-8a29cff30d18","prodname":"Diamond minecraft murah","prodimg":"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3OMDwZPDQPvVNT1asCGtLB767sQE8jd0oQOPA1eHYUa1CmlzE","prodloc":"jabar","prodprice":200000,"prodcat":"elektronik","prodoff":["gratis","cashback"]},{"id":"1c1af04d-9615-48c3-9a4b-52b08a929c4a","prodname":"Uang mainan murah dijamin auto kaya","prodimg":"https://s1.bukalapak.com/img/1860078511/s-400-400/duit_uang_mainan_cocok_untuk_mahar_nikahan.jpg","prodloc":"jatim","prodprice":1000000,"prodcat":"fashion","prodoff":["gratis","cashback"],"wishlist":false}]
updateStorage
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
    col.classList.add('my-3');

    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('shadow-sm');
    card.classList.add('h-100');
    card.style = 'position: relative;'

    
    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = product.prodimg;
    img.alt = product.prodname;
    
    card.append(img);
    
    let wishlistIcon = document.createElement('div');
    wishlistIcon.classList.add('wishlist');
    wishlistIcon.classList.add('position-absolute');
    wishlistIcon.style = 'right: 5px; top: 5px; cursor: pointer; user-select: none;';
    
    wishlistCondition(product.wishlist);

    card.append(wishlistIcon);

    wishlistIcon.addEventListener('click', function() {
        // alert('Added')
        if (product.wishlist === undefined || product.wishlist === false) {
            product.wishlist = true;
            wishlistCondition(product.wishlist);
            updateStorage();
            showContent();
            wishlistUpdate();
            console.log(`Name: ${product.prodname}, Wishlist?: ${product.wishlist}`);
        } else {
            product.wishlist = false;
            wishlistCondition(product.wishlist);
            updateStorage();
            showContent();
            wishlistUpdate();
            console.log(`Name: ${product.prodname}, Wishlist?: ${product.wishlist}`);
        }
    })

    function wishlistCondition(wishlist) {
        if (wishlist === false || wishlist === undefined) {
            wishlistIcon.innerHTML = `<i class="material-icons text-primary">favorite_border</i>`
        } else {
            wishlistIcon.innerHTML = `<i class="material-icons text-primary">favorite</i>`
        }
    }

    let body = document.createElement('div');
    body.classList.add('card-body');
    body.classList.add('text-center');
    body.innerHTML = `
    <h5 class="card-title my-2">${product.prodname}</h5>
    <p class="card-text text-muted font-weight-light">${parseLocation(product.prodloc)}</p>
    <p class="text-success font-weight-bold">Rp. ${numberWithCommas(product.prodprice)}</p>
    <p class="font-weight-bold">${parseCategory(product.prodcat)}</p>
    `

    let offerings = document.createElement('div');
    offerings.classList.add('d-flex');
    offerings.classList.add('my-3');
    offerings.classList.add('justify-content-center');

    

    if (product.prodoff.find(offering => offering === "gratong") !== undefined) {
        body.innerHTML += `<img class="card-img-top mx-1" style="width: 20px;"
                            src="https://i.pinimg.com/originals/0c/2a/03/0c2a030c2d2188b0a67a54249ae6b79c.png"
                            alt="Gratis Ongkir" title="Gratis Ongkir">`
    }

    if (product.prodoff.find(offering => offering === "cashback") !== undefined) {
        body.innerHTML += `<img class="card-img-top mx-1" style="width: 20px;"
                            src="https://cdn1.iconfinder.com/data/icons/web-design-29/60/wallet__icon__vector__illustration-512.png"
                            alt="Cashback" title="Cashback">`
    }

    if (product.prodoff.find(offering => offering === "disc") !== undefined) {
        body.innerHTML += `<img class="card-img-top mx-1" style="width: 20px;"
                            src="https://i.pinimg.com/originals/ab/ed/26/abed265cd5f621820ce2457d1abc7391.png"
                            alt="Diskon" title="Diskon">`
    }

    let footer = document.createElement('div');
    footer.classList.add('card-footer');

    let addToCart = document.createElement('button');
    addToCart.classList.add('btn');
    addToCart.classList.add('btn-primary');
    addToCart.classList.add('w-100');
    addToCart.innerHTML = '<small>Add to cart</small>'

    footer.append(addToCart);

    addToCart.addEventListener('click', function(e) {
        e.preventDefault();

        if (product.inCart === undefined) {
            product.inCart = 0;
            product.inCart = product.inCart + 1;
        } else {
            product.inCart = product.inCart + 1;
        }

        updateStorage();

        cartUpdate();

        console.log();
        
    })


    body.append(offerings);
    
    
    card.append(body);
    card.append(footer);
    col.append(card);

    return col;
}
function getShoppingCart(product) {

    let col = document.createElement('div');
    col.classList.add('col');
    col.classList.add('mb-4');

    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('h-100');
    card.classList.add('shadow-sm');

    let cardRow = document.createElement('div');
    cardRow.classList.add('row');
    cardRow.classList.add('no-gutters');

    let imgCol = document.createElement('div');
    imgCol.classList.add('col-md-2');

    let img = document.createElement('img');
    img.src = product.prodimg;
    img.alt = product.prodname;
    img.classList.add('card-img-top');

    imgCol.append(img);
    cardRow.append(imgCol);

    let desc = document.createElement('div');
    desc.classList.add('col-md-8');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = product.prodname;

    let cardPrice = document.createElement('p');
    cardPrice.innerHTML = `<span class="location d-block font-weight-bold text-success">Rp ${numberWithCommas(product.prodprice)}</span>`;

    let cardDelete = document.createElement('a');
    cardDelete.classList.add('btn');
    cardDelete.classList.add('btn-danger');
    cardDelete.classList.add('mt-3');
    cardDelete.innerHTML = '<i class="material-icons text-white" style="font-size: 16px">delete</i>';

    cardDelete.addEventListener('click', function(e) {
        e.preventDefault();

        let confirmDelete = confirm('Are you sure you want to delete this item?');

        if (confirmDelete = true) {
            delete product.inCart;
            showShoppingCart();
            cartUpdate();
            updateStorage();
        } else {
            return;
        }
    })

    cardBody.append(cardTitle);
    cardBody.append(cardPrice);
    cardBody.append(cardDelete);
    desc.append(cardBody);
    cardRow.append(desc);

    let amountCol = document.createElement('div');
    amountCol.classList.add('col-md-2');
    amountCol.classList.add('p-3');

    let formAmount = document.createElement('div');
    formAmount.classList.add('form-group');

    let label = document.createElement('label');
    label.innerText = 'Jumlah';

    let amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.classList.add('form-control');
    amountInput.classList.add('text-right');
    amountInput.id = 'itemCartAmount';
    amountInput.min = '1';
    amountInput.style = 'user-select: none;'
    amountInput.value = product.inCart;

    amountInput.addEventListener('change', function() {
        product.inCart = parseInt(amountInput.value);
        updateStorage();
        showShoppingCart();
        cartUpdate();
    })



    // amountInput.addEventListener('click')


    formAmount.append(label);
    formAmount.append(amountInput);
    amountCol.append(formAmount);
    cardRow.append(amountCol);

    card.append(cardRow)

    col.append(card);

    return col;
}
function cartUpdate() {
    let badgeCart = document.getElementById('badgeCart');

    let inCartSize = 0;

    let filter = [...products];

    filter.forEach(function(product) {
        if (product.inCart !== undefined) {
            inCartSize += product.inCart;
        }
        return inCartSize;
    })

    console.log(inCartSize)

    if (inCartSize === 0) {
        badgeCart.classList.add('d-none');
    } else {
        badgeCart.classList.remove('d-none');
        badgeCart.innerText = inCartSize.toString();
    }
    
}

function wishlistUpdate() {
    let wishlistSize = products.filter(product => product.wishlist === true).length;
    if (wishlistSize != 0) {
        document.getElementById('badgeWishlist').classList.remove('d-none')
        document.getElementById('badgeWishlist').innerHTML = `${wishlistSize}`
    } else {
        document.getElementById('badgeWishlist').classList.add('d-none')
    }
}


function showShoppingCart() {
    let lel = document.getElementById('content-shoping-carts');
    lel.innerHTML = '';

    let filter = [...products];

    filter = filter.filter(product => product.inCart > 0 || product.inCart !== undefined);
    console.log(filter)

    filter.forEach(product => {
        // console.log(filter)
        lel.prepend(getShoppingCart(product));
    })

    let totalPrice = document.getElementById('rp-total-price');
    let price = 0;
    filter.forEach(product => {
        price = price + (product.prodprice*product.inCart);
    });

    totalPrice.innerText = `Rp ${numberWithCommas(price)}`;
}

document.getElementById('search').addEventListener('submit', function(e) {  
    e.preventDefault();
    
    search = document.querySelector('[name="search"]').value;

    

    showContent();
})



function showContent() {
    let el = document.getElementById('content');

    el.innerHTML = '';

    let filter = [...products];

    if (wishListPage === true) {
        filter = filter.filter(product => product.wishlist === true)
    }

    if (locationFilter.length > 0) {
        filter = filter.filter(product => locationFilter.findIndex(e => e === product.prodloc) >= 0);
    }

    if (offeringFilter.length > 0) {
        filter = filter.filter(product => offeringFilter.findIndex(e => (product.prodoff.findIndex(c => c === e) >= 0)) >= 0)
    }

    if (categoryFilter !== null) {
        filter = filter.filter(product => product.prodcat === categoryFilter)
        // filter = filter.filter(function(product) {
        //     return product.prodcat === categoryFilter;
        // }) 
    }

    if (minPrice != null) {
        filter = filter.filter(product => product.prodprice >= minPrice);
    }

    if (maxPrice != null) {
        filter = filter.filter(product => product.prodprice <= maxPrice);
    }



    if (search.trim().length) {
        filter = filter.filter(function (product) {
            return product.prodname.search(new RegExp(search.trim(), 'i')) >= 0
        })
    }

    filter.forEach(product => {
        el.prepend(getProd(product))
    })


}

function changeContent() {

    if (wishListPage === true) {

        document.getElementById('navWishlist').style = 'background-color: #0069d9;'
        document.getElementById('navCart').style = '';

        document.getElementById('items-page').classList.remove('d-none');
        document.getElementById('cart-page').classList.add('d-none');

    } else if (cartPage === true) {

        document.getElementById('navWishlist').style = ''
        document.getElementById('navCart').style = 'background-color: #0069d9;';

        document.getElementById('items-page').classList.add('d-none');
        document.getElementById('cart-page').classList.remove('d-none');

    } else {
        document.getElementById('navWishlist').style = ''
        document.getElementById('navCart').style = '';

        document.getElementById('items-page').classList.remove('d-none');
        document.getElementById('cart-page').classList.add('d-none');
    }
}

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    search = document.querySelector('[name="search"]').value

    showContent();
})

document.getElementById('formFilter').addEventListener('click', function () {
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

document.getElementById('pricemin').addEventListener('submit', function (e) {
    e.preventDefault();

    if (document.querySelector('[name="pricemin"]').value.length === 0) {
        minPrice = null;
    } else {
        minPrice = parseInt(document.querySelector('[name="pricemin"]').value)
    }

    showContent();


})


document.getElementById('pricemax').addEventListener('submit', function (e) {
    e.preventDefault();

    if (document.querySelector('[name="pricemax"]').value.length === 0) {
        maxPrice = null;
    } else {
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

document.getElementById('navWishlist').addEventListener('click', function (e) {
    e.preventDefault();

    if (wishListPage === false) {
        wishListPage = true;

    } else {
        return;
    }
    changeContent();
    showContent();
})
document.getElementById('home').addEventListener('click', function (e) {
    e.preventDefault();

    if (wishListPage === true || cartPage === true) {
        wishListPage = false;
        cartPage = false;
    } else {
        return;
    }
    changeContent();
    showContent();
})


document.getElementById('navCart').addEventListener('click', function(e) {
    e.preventDefault();

    if (cartPage === false) {
        cartPage = true;
        WishListPage = false;
    } else {
        return;
    }

    changeContent();

    showShoppingCart();
})

cartUpdate();
wishlistUpdate();
showContent();
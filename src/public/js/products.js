const getProducts = search => {
    showLoading(true);
    search = search ? search : '';
    return getJSON('/api/products/' + search).then(json => {
        const wishlist = getLocalWishlist();
        json.products = json.products.map(product => {
            product.wishlisted = wishlist.indexOf(product.id) >= 0;
            return product;
        })
        return json;
    });
}
const getWishlist = userId => {
    showLoading(true);
    return getJSON('/api/products/wishlist/' + userId).then(json => {
        const wishlist = getLocalWishlist();
        json.products = json.products.filter(product => {
            return wishlist.indexOf(product.id) >= 0;
        });
        json.products = json.products.map(product => {
            product.wishlisted = true;
            return product;
        })
        return json;
    });
};

const getLocalWishlist = () => {
    try {
        const wishlist = window.localStorage.getItem('wishlist');
        return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
        console.log(error);
        return null;
    }
}

const setLocalWishlist = wishlist => {
    if (Array.isArray(wishlist)) wishlist = JSON.stringify(wishlist);
    window.localStorage.setItem('wishlist', wishlist);
}

const wishlistAdd = productId => {
    let wishlist = getLocalWishlist();
    if (!wishlist || !Array.isArray(wishlist)) wishlist = [];
    if (wishlist.indexOf(productId) >= 0) return;
    wishlist.push(productId);
    setLocalWishlist(wishlist);
}

const wishlistRemove = productId => {
    let wishlist = getLocalWishlist();
    if (!wishlist || !Array.isArray(wishlist)) return;
    if (wishlist.indexOf(productId) === -1) return;
    wishlist = wishlist.filter(wishlisted => wishlisted !== productId);
    setLocalWishlist(wishlist);
}

const toggleWishlist = (productId, ribbon) => {
    // Toggle active state
    const activeClassName = 'active';
    ribbon.classList.toggle(activeClassName);

    // Add or remove from wishlist based on the new state
    const isActive = ribbon.classList.contains(activeClassName);
    isActive ? wishlistAdd(productId) : wishlistRemove(productId);
}

const newCard = product => {
    const card = document.createElement('div');
    card.className = 'product';

    const ribbon = document.createElement('div');
    ribbon.className = 'wishlist-ribbon';
    if (product.wishlisted) ribbon.className += ' active';
    ribbon.addEventListener('click', () => toggleWishlist(product.id, ribbon));

    const heart = document.createElement('i');
    heart.setAttribute('aria-hidden', 'true');
    heart.className = 'fa fa-heart';

    const img = document.createElement('img');
    img.setAttribute('src', product.image);

    const title = document.createElement('h3');
    title.className = 'product-title';
    title.innerText = product.title;

    const priceTag = document.createElement('p');
    priceTag.className = 'product-price';
    priceTag.innerText = product.price;

    ribbon.appendChild(heart);
    card.appendChild(ribbon);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(priceTag);

    return card;
}

const createProductCard = product => {
    const format = product.currencyFormat;
    const currency = product.currencyId;

    let price = product.price;
    price = currency === 'BRL' ? floatToBRL(price) : `${format} ${price}`;
    product.price = price;

    const card = newCard(product);
    document.querySelector('main').appendChild(card);
}

const addProductsToDOM = products => {
    document.querySelector('main').innerHTML = '';
    products.forEach(createProductCard);
    showLoading(false);
}

const loadProducts = search => {
    getProducts(search).then(res => addProductsToDOM(res.products));
}

const loadWishlist = userId => {
    getWishlist(userId).then(res => addProductsToDOM(res.products));
}

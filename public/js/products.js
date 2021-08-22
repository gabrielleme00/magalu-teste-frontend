const getProducts = search => {
    search = search ? search : '';
    return getJSON('/api/products/' + search);
}
const getWishlist = userId => getJSON('/api/products/wishlist/' + userId);

const wishlistAdd = productId => {

}

const wishlistRemove = productId => {
    
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

    const card = newCard({
        image: product.image,
        title: product.title,
        price: price
    });

    document.querySelector('main').appendChild(card);
}

const addProductsToDOM = products => {
    document.querySelector('main').innerHTML = '';
    products.forEach(createProductCard);
}

const loadProducts = search => {
    getProducts(search).then(res => addProductsToDOM(res.products));
}

const loadWishlist = userId => {
    getWishlist(userId).then(res => addProductsToDOM(res.products));
}

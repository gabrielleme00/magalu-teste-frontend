const productsAPI = "https://run.mocky.io/v3/";
const productsEndpoint = "66063904-d43c-49ed-9329-d69ad44b885e";
const productsURL = productsAPI + productsEndpoint;

// TODO -> Passar a consulta para o backend
const getProducts = () => getJSON(productsURL);

const newCard = product => {
    const card = document.createElement('div');
    card.className = 'product';

    const ribbon = document.createElement('div');
    ribbon.className = 'wishlist-ribbon';

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

switch (window.location.pathname) {
    case '/':
        getProducts().then(res => res.products.forEach(createProductCard));
        break;
    case '/wishlist':
        getProducts().then(res => res.products.forEach(createProductCard));
        break;
    default:
        alert('Oops');
        break;
}

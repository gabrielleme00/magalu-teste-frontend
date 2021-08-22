const setRoute = route => {
    const navCurrentRoute = document.getElementById('nav-current-route');
    navCurrentRoute.innerText = route;
}

switch (window.location.pathname) {
    case '/':
        setRoute('Home');
        loadProducts();
        break;
    case '/wishlist':
        setRoute('Home > Wishlist');
        const userId = '123';
        loadWishlist(userId);
        break;
    default:
        alert('Oops');
        break;
}

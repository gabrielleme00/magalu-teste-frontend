const setRoute = route => {
    const navCurrentRoute = document.getElementById('nav-current-route');
    navCurrentRoute.innerText = route;
}

const setupSearch = () => {
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('keypress', e => {
        e = e ? e : window.event;
        const keyCode = e.code || e.key;
        if (keyCode !== 'Enter') return;
        const value = e.target.value;
        if (value) window.location.href = '/?search=' + value;
        else window.location.href = '/';
    });
}

const main = () => {
    const path = window.location.pathname;
    const search = getURLParam('search');

    switch (path) {
        case '/':
            setRoute('Home');
            if (search) loadProducts(search);
            else loadProducts();
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

    setupSearch();
}

window.onload = main;

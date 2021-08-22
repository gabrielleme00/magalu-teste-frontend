const floatToBRL = f => {
    return f.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

const getJSON = url => fetch(url, {
    "method": "GET"
}).then(res => {
    return res.json();
}).catch(err => {
    console.error(err);
});

const getURLParam = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

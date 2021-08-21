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

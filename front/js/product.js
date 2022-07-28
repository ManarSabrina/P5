function api() {
    fetch("http://localhost:3000/api/products")

    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
    })

    .then(function(values) {
        card(values);
        url();
    })
    
    .catch(function(err) {
    // Une erreur est survenue
    });
}

api();

function url () {

    let str = "http://127.0.0.1:5501/front/html/product.html?";

    for (let i = 0; i < values.length; i++) {
        let url = new URL('${values[i]._id}', str);
        let nom = url.searchParams.get("name");
        console.log(nom);
    }
}


function card(values) {

    for (let i = 0; i < values.length; i++) {
        let image = document.getElementsByClassName("item__img");
        image.innerHTML = 
        `<img src="${values[i].imageUrl}" alt="Photographie d'un canapé">`;

        let titre = document.getElementById("title");
        titre.innerHTML = `${values[i].name}`;

        let prix = document.getElementById("price");
        prix.innerHTML = `${values[i].price}`;

        let description = document.getElementById("description");
        description.innerHTML = `${values[i].description}`;

        for (let j = 0; j < colors.length; j++) {

            let couleurs = document.getElementById("colors");
            couleurs.innerHTML = `<option value="${values[i].colors}">${values[i].colors[j]}</option>`;
        }
    }
}




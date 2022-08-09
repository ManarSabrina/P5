// APPEL DE L'API
function api() {
    let id = optentionIdUrl();
    fetch(`http://localhost:3000/api/products/${id}`)

    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
    })

    .then(function(values) {
        affichageCaracteristiquesProduit(values);
    })
    
    .catch(function(err) {
    // Une erreur est survenue
    });
}

api();

// OBTENTION DE L'ID PAR L'URL
function optentionIdUrl () 
{
    let pointInterogationId = window.location.search;

    let urlSearchParams = new URLSearchParams(pointInterogationId);

    let id = urlSearchParams.get("id");

    return id;
}

// AFFICHAGE CARACTERISTIQUES PRODUITS 
function affichageCaracteristiquesProduit (caracteristiquesProduit) 
{
    let imageContainer = document.getElementsByClassName("item__img")[0];
    imageContainer.innerHTML = `<img src="${caracteristiquesProduit.imageUrl}" alt="Photographie d'un canapé">`;

    let titre = document.getElementById("title");
    titre.innerHTML = `${caracteristiquesProduit.name}`;

    let prix = document.getElementById("price");
    prix.innerHTML = `${caracteristiquesProduit.price}`;

    let description = document.getElementById("description");
    description.innerHTML = `${caracteristiquesProduit.description}`;

    for (let i = 0; i < caracteristiquesProduit.colors.length; i++) {

        let containerCouleurs = document.getElementById("colors");
        containerCouleurs.innerHTML += `<option class="choixCouleur" value="${caracteristiquesProduit.colors[i]}">${caracteristiquesProduit.colors[i]}</option>`;
    }

    envoieCaracteristiquesProduitDsLocalStorage (caracteristiquesProduit);
}

// ENVOIE (DE QQ) CARACTERISTIQUES PRODUITS DS LE LOCAL STORAGE
function envoieCaracteristiquesProduitDsLocalStorage (caracteristiquesProduit) 
{

    
    console.log(caracteristiquesProduit);
    

    let btnEnvoiePanier = document.querySelector("#addToCart");
    console.log(caracteristiquesProduit);
    btnEnvoiePanier.addEventListener("click", (e) => { 
        console.log(caracteristiquesProduit);
        e.preventDefault();
        console.log(caracteristiquesProduit);
        // Creer une variable, qui condiendra les cles et valeures present dans le local storage
        let produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
        console.log(caracteristiquesProduit);
        let containerCouleurs = document.getElementById("colors");
        console.log(caracteristiquesProduit);
        //Recuperation des qq caracteristiques produits 
        let breveCaracteristiquesProduit = {
        idProduit: caracteristiquesProduit._id,
        couleurProduit: `${containerCouleurs.value}`, // ??? Comment sait on que ca a ete selectionné et lequel a ete selectionné ? 
        nombre: 1, 
        };
        console.log(caracteristiquesProduit);
        

        if ( caracteristiquesProduit._id === produitsPresentsDansLocalStorage.idProduit && caracteristiquesProduit.color === produitsPresentsDansLocalStorage.couleurProduit ) 
        {
            breveCaracteristiquesProduit.nombre = breveCaracteristiquesProduit.nombre + 1
        }
        
        
        console.log(breveCaracteristiquesProduit);
        console.log(breveCaracteristiquesProduit.nombre);
        console.log(produitsPresentsDansLocalStorage);

        // Si il y a des produits dans le local storage
        if (produitsPresentsDansLocalStorage) {
        produitsPresentsDansLocalStorage.push(breveCaracteristiquesProduit);
        localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
        
        }
        // Si il n'y a de produit 
        else {
        produitsPresentsDansLocalStorage = [];
        produitsPresentsDansLocalStorage.push(breveCaracteristiquesProduit);
        localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
        }

     });

    /*Local storage 
    Json > Js = JSON.parse()
    Js > Json = JSON.stringify()*/
}



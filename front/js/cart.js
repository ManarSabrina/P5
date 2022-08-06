// Creer une variable, qui condiendra les cles et valeures present dans le local storage
 let produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

// AFFICHER LES PRODUITS DANS LE PANIER
 function affichageProduitsPanier (produitsPresentsDansLocalStorage) 
 {
    let container = document.querySelector("#cart__items"); 
    let containerTotalQuantity = document.querySelector("#totalQuantity"); 
    let containerTotalPrice = document.querySelector("#totalPrice");  
    let structureProduitPanier = [];
    let prixTotal = 0;

    for (i = 0; i < produitsPresentsDansLocalStorage.length; k++) {
        structureProduitPanier = structureProduitPanier + `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
                <img src="${produitsPresentsDansLocalStorage[i].imageProduit}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${produitsPresentsDansLocalStorage[i].nomProduit}</h2>
                    <p>${produitsPresentsDansLocalStorage[i].couleurProduit}</p>
                    <p>${produitsPresentsDansLocalStorage[i].prixProduit}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${produitsPresentsDansLocalStorage[i].nombre}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`

        if (produitsPresentsDansLocalStorage[i].idProduit ===  && produitsPresentsDansLocalStorage[i].couleurProduit === ) {
            produitsPresentsDansLocalStorage[i].nombre = produitsPresentsDansLocalStorage[i].nombre + 1;
        } // Je le compart a quoi ? (C'est claire ds ma tete mais pas ds le code !)

        // Total 
        prixTotal = prixTotal + produitsPresentsDansLocalStorage[i].prixProduit;
        containerTotalPrice.innerHTML = prixTotal;
    }

    if (i == produitsPresentsDansLocalStorage.length) {
        container.innerHTML = structureProduitPanier;
        containerTotalQuantity.innerHTML = k;
        //containerTotalPrice.innerHTML = 
    
     }

     suppressionDeProduit();
 }


 // SUPPRESSION DE PRODUITS DS LE PANIER 
let resteDesProductsApresSupp = [];

const suppressionDeProduit = async (affichageProduitsPanier) => 
{
    await affichageProduitsPanier;

    let corbeilles = document.querySelectorAll(".deleteItem");
    corbeilles.forEach((corbeille) => {
        corbeille.addEventListener("click", () => {

            let produitsPresentsDansLocalStorageSupp = produitsPresentsDansLocalStorage.length;

            if (produitsPresentsDansLocalStorageSupp == 1) {
                return (
                    localStorage.removeItem("produit") 
                );
            }
            else {
                resteDesProductsApresSupp = produitsPresentsDansLocalStorage.filter(e => {
                    if(corbeille.dataset.id != e._id || corbeille.dataset.color != e.colors) {
                        // .id et .color ?
                        return true
                    }
                });
                console.log(resteDesProductsApresSupp);
                localStorage.setItem("produit", JSON.stringify(resteDesProductsApresSupp));
            }
        });
    });
};


// APPEL DE L'API
function api() {
    fetch(`http://localhost:3000/api/products`)

        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })

        .then(function(values) {
            affichageProduitsPanier(values);
        })

        .catch(function(err) {
            // Une erreur est survenue
        });
}
api();


// Creer une variable, qui condiendra les cles et valeures present dans le local storage
let produitsPresentsDansLocalStorage = JSON.parse(localStorage.getItem("produit"));


// SUPPRETION DE PRODUITS DANS LE PANIER 
function suppressionDeProduit() {

    // Recuperation des corbeilles 
    let corbeilles = document.querySelectorAll(".deleteItem")
   
    for (let k  = 0; k < corbeilles.length; k++) {
        // Au clic supprimer l'article 
        corbeilles[k].addEventListener("click", (event) => {
            event.preventDefault();

            // Selection de la balise article. 
            const article = corbeilles[k].closest("article.cart__item");

            // Selection de l'id du produit de la balise article. 
            const idArticle = article.getAttribute("data-id");

            // Selection de la couleur du produit de la balise article. 
            const couleurArticle = article.getAttribute("data-color");

            produitsPresentsDansLocalStorage = produitsPresentsDansLocalStorage.filter(el => el.idProduit !== idArticle && el.couleurProduit !== couleurArticle);

            // Js > JSON, et l'envoyer ds la clé "produit" du local storage. 
            localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));

            article.remove();
        });
    }
}

// AFFICHER LES PRODUITS DANS LE PANIER
function affichageProduitsPanier(caracteristiquesProduit) {
    
    let container = document.querySelector("#cart__items");
    let containerTotalQuantity = document.querySelector("#totalQuantity");
    let containerTotalPrice = document.querySelector("#totalPrice");
    let structureProduitPanier = [];
    let prixTotal = 0;
    let nombreTotal = 0;
    

    for (i = 0; i < produitsPresentsDansLocalStorage.length; i++) {
        
        // CHERCHER LES DONNES DS "caracteristiquesProduit" ET LES COMPARER AVEC "produitsPresentsDansLocalStorage"
        for (j = 0; j < caracteristiquesProduit.length; j++) {
            
            if (caracteristiquesProduit[j]._id === produitsPresentsDansLocalStorage[i].idProduit) {
                
                structureProduitPanier = structureProduitPanier + `
                <article class="cart__item" data-id="${produitsPresentsDansLocalStorage[i].idProduit}" data-color="${produitsPresentsDansLocalStorage[i].couleurProduit}">
                    <div class="cart__item__img">
                        <img src="${caracteristiquesProduit[j].imageUrl}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${caracteristiquesProduit[j].name}</h2>
                            <p>${produitsPresentsDansLocalStorage[i].couleurProduit}</p>
                            <p>${caracteristiquesProduit[j].price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitsPresentsDansLocalStorage[i].nombre}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`
                
                // Prix total 
                prixTotal = prixTotal + caracteristiquesProduit[j].price * produitsPresentsDansLocalStorage[i].nombre;
                
                containerTotalPrice.innerHTML = prixTotal;

                // Nombre total d'article 
                nombreTotal = nombreTotal + parseInt(produitsPresentsDansLocalStorage[i].nombre);

                containerTotalQuantity.innerHTML = nombreTotal;
            }
        }
    }
    container.innerHTML = structureProduitPanier;
    
    suppressionDeProduit();
} 


function evolutionQuantiteProduit() {

    let containerQuantiteProduit = document.getElementsByClassName("itemQuantity");

    console.log(containerQuantiteProduit);

    for (let m = 0; m < containerQuantiteProduit.length; m++) 
    {
        console.log("Hello");
        //-----PROBLEM-----
        
        // Au clic la quantité de l'article evolue. 
        containerQuantiteProduit[m].addEventListener("click", (event) => {
            event.preventDefault();
            console.log(containerQuantiteProduit[m]);

            // Selection de la balise article. 
            const article = containerQuantiteProduit[m].closest("article.cart__item");

            // Selection de l'id du produit de la balise article. 
            const idArticle = article.getAttribute("data-id");

            // Selection de la couleur du produit de la balise article. 
            const couleurArticle = article.getAttribute("data-color");


            for (n = 0; n < produitsPresentsDansLocalStorage.length; n++) {
                if (produitsPresentsDansLocalStorage[n].idProduit === idArticle && produitsPresentsDansLocalStorage[n].couleurProduit === couleurArticle) 
                {
                    console.log("Je suis dedans");
                    produitsPresentsDansLocalStorage[n].nombre = containerQuantiteProduit[m].value;

                    console.log(produitsPresentsDansLocalStorage[n].nombre);
                }
                    
            }
            // Js > JSON, et l'envoyer ds la clé "produit" du local storage. 
            localStorage.setItem("produit", JSON.stringify(produitsPresentsDansLocalStorage));
        });
    }
}

evolutionQuantiteProduit();

function analyseeEtRecupererLesDonneesDuFormulaire (){ 
    // Recuperation de id, des articles. 
    let products = [];
    for (let p = 0; p < produitsPresentsDansLocalStorage.length; p++) {
        products.push(produitsPresentsDansLocalStorage[p].idProduit);
    }
    console.log(products);

    // Recuperation des donnees du formulaire, lors du clic du bouton du formulaire. 
    const btnFormulaire = document.querySelector("#order");

    btnFormulaire.addEventListener("click", (event) => {
        event.preventDefault();

        // Recuperation des donnees du formulaire. 
        let rensegementsPersonne = JSON.parse(localStorage.getItem("contact"));

        let prenomPersonne = document.querySelector("#firstName").value;
        let nomPersonne = document.querySelector("#lastName").value;
        let adressePersonne = document.querySelector("#address").value;
        let villePersonne = document.querySelector("#city").value;
        let emailPersonne = document.querySelector("#email").value;

        let contact = {
            firstName : `${prenomPersonne}`,
            lastName : `${nomPersonne}`,
            address : `${adressePersonne}`,
            city : `${villePersonne}`,
            email: `${emailPersonne}`
        };

        // Controle du formulaire. 

        // Condition de syntaxe commune : Prenom, nom et ville. 
        const regexPrenomNomVille = (abc) => {
            return /^([A-Za-z\s]{2,15})?([-]{0,1})?([A-Za-z\s]{3,20})$/.test(abc)
        }

        //Factorisation du message d'alerte. 
        const messageAlerte = (abc) => {
            return `Veuillez rensegner correctement votre ${abc}.\nLes chiffre et sympole ne sont pas autorisés.\nNe pas depasser 20 caracteres, minimun 3 caracreres`;
        }

        // Prenom
        function controleDuPrenom() {
            if(regexPrenomNomVille(prenomPersonne)){
                return true;
            } else {
                alert(messageAlerte("prenom"));
                return false;
            };
        };

        // Nom
        function controleDuNom() {
            if(regexPrenomNomVille(nomPersonne)){
                return true;
            } else {
                alert(messageAlerte("nom"));
                return false; 
            };
        };

        // Ville
        function controleDeLaVille() {
            if(regexPrenomNomVille(villePersonne)){
                return true;
            } else {
                alert(messageAlerte("ville"));
                return false;
            };
        };

        // Adresse
        function controleDeLAdresse() {
            if(/^[A-Za-z0-9\s]{5,50}$/.test(adressePersonne)){
                return true;
            } else {
                alert("Veuillez rensegner correctement votre adresse postale.\nL'adresse ne doit contenir que des lettres et des chiffres.");
                return false;
            };
        };

        // Email
        /*function controleDuMail() {
            if(/^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+$/.test(adressePersonne)){
                return true;
            } else {
                alert("Veuillez rensegner correctement votre email");
                return false;
            };
        };*/
        
        // Formulaire en entier. 
        if(controleDuPrenom() && controleDuNom() && controleDeLaVille() && controleDeLAdresse() /*&& controleDuMail()*/){
            // Mettre et enregistrement ds le local storage. 
            
            localStorage.setItem("contact", JSON.stringify(contact));

        } else {
            return false;
        };

        const objetAEnvoyerVersLeServeur = {
            contact,
            products
        };

        console.log(objetAEnvoyerVersLeServeur);

        //Envoie de l'objet vers le serveur 
        const promise1 = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(objetAEnvoyerVersLeServeur),
            headers: {
                "Content-Type" : "application/json",
            },
        });
        console.log(promise1);

        let idCommande = "";

        // Voir le resultat du serveur ds la console 
        promise1.then(async(response)=>{
            try{
                console.log(response);

                const contenuDeLaReponse = await response.json();
                console.log(contenuDeLaReponse);

                idCommande = contenuDeLaReponse.orderId;
                console.log(idCommande);

                // Redirection page confirmation.
                if (response.ok) {
                    location.href=`./confirmation.html?id=${idCommande}`;
                }
                else {
                    alert(`Probleme avec le serveur : erreur ${response.status}`)
                };
                
            }catch(e){
                console.log(e)
            }
        })
    });
}

analyseeEtRecupererLesDonneesDuFormulaire ();
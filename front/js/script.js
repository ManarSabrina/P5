// APPEL DE L'API
function api() {
    fetch("http://localhost:3000/api/products")

    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
    })

    .then(function(values) {
        creatCards(values);
    })
    
    .catch(function(err) {
    // Une erreur est survenue
    });
}

api();

// CREATION DES CARDS PRODUIT
function creatCards (values) {
    console.log(values);

    let section = document.getElementById("items");

    for (let i = 0; i < values.length; i++) {
        section.innerHTML += 
        `<a href="./product.html?id=${values[i]._id}">
            <article>
                <img src="${values[i].imageUrl}" alt="${values[i].altTxt}">
                <h3 class="productName">${values[i].name}</h3>
                <p class="productDescription">${values[i].description}</p>
            </article>
        </a>`;  
    }
}





// COURS 1 //


/* 
- Variable (let, var, const) 
- Type de variable (number, string, boolean) 
- */


// OBJET 
// Une variable a plusieures ligne

/* EX 

let myBook = {
    title: 'The Story of Tau',
    author: 'Will Alexander',
    numberOfPages: 250,
    isAvailable: true
};  
*/

// Acceder aux donnees d'un objet

/* EX

let bookTitle = myBook.title;
let bookPage = myBook.numberOfPages;

OU 

let bookTitle = myBook["titke"];
let bookPage = myBook["numberOfPages"];
*/


// CLASSES
// C'est un model pour un objet dans le code. 

/* EX 

class Book {
}

*/

/* EX : Construction de classe
(Le  constructor d'une classe est la fonction qui est appelée quand on crée une nouvelle instance)

class Book {
    constructor(title, author, pages) {
    }
}

EX : Pour cree une instance de la classe

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}

(Maintenant que la classe est terminée, vous pouvez créer des instances par le mot clé new)

let myBook = new Book("L'Histoire de Tao", "Will Alexander", 250);
//Cette ligne crée l'objet suivant :
{
    title: "L'Histoire de Tao",
    author: "Will Alexander",
    pages: 250
}

*/


// TABLEAUX (ARRAY)
//(Utiiser les tableaux pour enregistrer une liste ordonnée d'élements)

/* EX
let guests = [Aisha, Firdaws, Mariam];

let fistGuest = guests[0];
let secondGuest = guests[1];
let thirdGuest = guests[2];
*/

/* EX : Comptage d'elment 
let guests = [Aisha, Firdaws, Mariam];

let numGuests = guests.length;

   EX :  Ajout et suppression d'element (ajout fin, ajoue debut, supression)

guests.push("Manar");
guests.unshift("Manar");
guest.pop();

*/


// IF - ELSE

/* EX 
let UserLoggedIn = true;
if (UserLoggedIn) {
   console.log("Utilisateur connecté!");
} else {
   console.log("Alerte, intrus!");
}
 */


// SWITCH
//(Si on a plusieures objet, puis qu'on souhaite verifier une seule valeur (dans chaque objet, de la meme clé), alors utilisé l'instruction switch)

/* EX 
let firstUser = {
    name: "Will Alexander",
    age: 33,
    accountLevel: "normal"
};

let secondUser = {
    name: "Sarah Kate",
    age: 21,
    accountLevel: "premium"
};

let thirdUser = {
    name: "Audrey Simon",
    age: 27,
    accountLevel: "mega-premium"
};  

switch (firstUser.accountLevel) {
case 'normal':
      console.log('You have a normal account!');

break;
case 'premium':
      console.log('You have a premium account!');

break;
case 'mega-premium':
      console.log('You have a mega premium account!');
break;

default:
      console.log('Unknown account type!');
}
 */


// FOR

/* EX : For
const numberOfPassengers = 10;
for (let i = 0; i < numberOfPassengers; i++) {
    console.log("Passager embarqué !");
}

console.log("Tous les passagers sont embarqués !");

   EX : For... of (Pour les cas où l'indice précis d'un élément n'est pas nécessaire pendant l'itération)
const passengers = [
    "Will Alexander",
    "Sarah Kate",
    "Audrey Simon",
    "Tao Perkington"
]

for (let passenger of passengers) {
   console.log("Embarquement du passager " + passenger);
}


   EX : For... in (elle effectue tout le travail d'itération pour vous)
const passengers = [
    "Will Alexander",
    "Sarah Kate'",
    "Audrey Simon",
    "Tao Perkington"
]

for (let i in passengers) {
   console.log("Embarquement du passager " + passengers[i]);
}
*/


// WHILE

/* EX 
let seatsLeft = 10;
let passengersStillToBoard = 8;
let passengersBoarded = 0;

while (seatsLeft > 0 && passengersStillToBoard > 0) {
    passengersBoarded++; // un passager embarque
    passengersStillToBoard--; // donc il y a un passager de moins à embarquer
    seatsLeft--; // et un siège de moins
}

console.log(passengersBoarded); // imprime 8, car il y a 8 passagers pour 10 sièges
 */


// FONCTIONS 

/* EX

/ On définit la fonction
function afficherDeuxValeurs(valeur1, valeur2) {
      console.log('Première valeur:' + valeur1);
      console.log('Deuxième valeur:' + valeur2);
}

/ On exécute la fonction
afficherDeuxValeurs(12, 'Bonjour');

/ On obtient dans la console
/ > Première valeur:12 
/ > Deuxième valeur:Bonjour 
 */


// METHODES D'INSTNCE
//(Fonction specifique, fonction associées a une classe et qui opèrent a l'interieur de chaque instance de cette classe.)

/* EX
class BankAccount {
   constructor(owner, balance) {
      this.owner = owner;
      this.balance = balance; // Propriete de classe
   }
}

const newAccount = new BankAccount("Will Alexander", 500); // Instance 

class BankAccount {
   constructor(owner, balance) {
      this.owner = owner;
      this.balance = balance;
   }
   showBalance() { 
      console.log("Solde: " + this.balance + " EUR");
   } // Methode
}

EX : Methode pour une nouvelle instance 

const newAccount = new BankAccount("Will Alexander", 500);

newAccount.showBalance(); // imprime "Solde: 500 EUR" à la console

EX : Autre exemple de methode 
class Show {
  constructor(title, numberOfSeasons) {
    this.title = title;
    this.numberOfSeasons = numberOfSeasons;
    this.ratings = [];
    this.averageRating = 0;
  }
  
  addRating(rating) {
    this.ratings.push(rating);
    let sum = 0;
    for (let rating of this.ratings) {
      sum += rating;
    }
    
    this.averageRating = sum / this.ratings.length;
  }
}
 */


// METHODE STATISTIQUE 
/* https://openclassrooms.com/fr/courses/6175841-apprenez-a-programmer-avec-javascript/6279381-definissez-des-methodes-dinstance-et-des-proprietes */



// COURS 2 //

// DOM /
//(Interface (sous forme d'arbre genealogique qui va des parents aux enfants), qui nous permet de mofifier des elments et leurs styles, et de connaitre le comportement du visiteur (avec sa souris par ex), ainsi que de recuperer les données d'un formulaire, ... )

// ACCEDEZ AUX ELEMENTS DU DOM /
//(Le document est le point de depart du DOM, represente notre page en entier)

// PAR L'ID
/* document.getElementById('id') */

// PAR LA CLASSE
/* document.getElementsByClassName('classe') 
Et si plusieures classe du meme nom on peux : 
const firstClasse = classe[0];
*/ 

// PAR LE NOM DE BALISE
/* document.getElementsByTagName('div') 
Et si plusieures classe du meme nom on peux : 
const firstDiv = div[0]; */

// CIBLER UN ELEMENT
/* document.querySelector("#myId p.article > a") 

De 
<div id="myId">
    <p>
        <span><a href="#">Lien 1</a></span>
        <a href="#">Lien 2</a>
        <span><a href="#">Lien 3</a></span>
    </p>
    <p class="article">
        <span><a href="#">Lien 4</a></span>
        <span><a href="#">Lien 5</a></span>
        <a href="#">Lien 6</a>
    </p>
    <p>
        <a href="#">Lien 7</a>
        <span><a href="#">Lien 8</a></span>
        <span><a href="#">Lien 9</a></span>
    </p>
</div>
*/


// SANS LE DOCUMENT 
//(Pour parcourire les enfents et parents)

/* element.children >> Retourne le liste les enfants de l'element.
element.parentElement >> Retourne l'element parents de celui-ci. 
element.nextElementSibling (ou) element.previousElementSibling >> Retourne l'element suivant (ou) précédent de meme niveau que notre elment. 

EX : 
Avec 
<div id="parent">
    <div id="previous">Précédent</div>
    <div id="main">
        <p>Paragraphe 1</p>
        <p>Paragraphe 2</p>
    </div>
    <div id="next">Suivant</div>
</div>

const elt = document.getElementById('main');

elt.children
elt.parentElement
elt.parentElement
elt.previousElementSibling
*/


// MOFIFICATION DU DOM /

// MOFIFI CONTENU ELEMENT 
/* innerHTML (avec intrepretation)*/
/* textContent (sans intrepretation)*/

// MODIF LA CLASSE
/* Modif >> elt.classList.replace("oldClass", "newClass"); */
/* Supp >> elt.classList.remove("class"); 
Si plusieurs >> elt.classList.remove(["class", ... ])*/
/* Ajouter >> elt.classList.add("class"); 
Si plusieurs >> elt.classList.add(["class", ... ]) */
/* Verifier si la classe specifique est contenue par cet element >>  contains("class")*/


// MODIF LE STYLE D'UN ELT
/* Ex pour la couluer d'arriere plant >> element.style.backgroundColor = '#000'; */

// MODIF OU REMPLACER DES ATTRIBUTS
/* element.setAttribute("name", "value") 
Prend en paramètres le nom de l'attribut et sa valeur et ne retourne rien.

EX 
elt.setAttribute("type", "password");   // Change le type de l'input en un type password
elt.setAttribute("name", "my-password");    // Change le nom de l'input en my-password
elt.getAttribute("name");               // Retourne my-password
*/

// CREER, REMPLACER, SUPP DES ELMENTS 

// CREE UN ELT 
/* const newElt = document.createElement("div"); */

// AJOUTER, SUPP ET REMPLACE DES ENFANTS 
/*  Ajoute >>
EX 
const newElt = document.createElement("div");
let elt = document.getElementById("main");

elt.appendChild(newElt); */

/* Supp >> 
EX 
parentNode.removeChild("element")
*/

/* Remplace >> 
EX 
parentNode.replaceChild("newElement", "oldElement")
*/


// ECOUTER LES EVENEMENTS 
//(Un evenements est une actions faite, en envoyant un contenu lorsque l'utilisateur le demande. Un evenement est un nom + une fonction (appelé callback))

/* Ecouter un event >> addEventListener("nom de l'event", "fonction a appeler") 

Au clic >> element.addEventListener('click', onClick)

EX 
const elt = document.getElementById('mon-lien');    // On récupère l'élément sur lequel on veut détecter le clic
elt.addEventListener('click', function() {          // On écoute l'événement click
    elt.innerHTML = "C'est cliqué !";               // On change le contenu de notre élément pour afficher "C'est cliqué !"
}); 

Supp le comportement par defaut >> preventDefault()
(Ouverture d'une autre page pour un lien, envoie du formulaire au serveur pour un formulaire, ...)

EX 
const elt = document.getElementById('mon-lien');    // On récupère l'élément sur lequel on veut détecter le clic
elt.addEventListener('click', function(event) {     // On écoute l'événement click, notre callback prend un paramètre que nous avons appelé event ici
    event.preventDefault();                         // On utilise la fonction preventDefault de notre objet event pour empêcher le comportement par défaut de cet élément lors du clic de la souris
});

Stoper la propagation >> stopPropagation()

EX 
elementInterieur.addEventListener('click', function(event) {
    event.stopPropagation();
    elementAvecMessage.innerHTML = "Message de l'élément intérieur";
});
*/

// RECUP DONNEES UTILISATEURS
// (Detection du mouvement de la souris)

/* https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5578181-recuperez-des-donnees-utilisateurs-avec-les-evenements */

//(Lire le contenu d'un champ texte, qui sera remplis par l'utilisateur). Meme lien que ci dessus. 

// API //
//(Interface qui met a disposition des points d'acces a des ressources)

// (utilisation du protocole HTTP pour la requette au serveur et nous retourner une reponse : le rendu html et css, ainsi que le code de statut)

/* Methode HTTP permet de : 
- Recupperer des resources >> Get
- Creer ou modifier >> Post
- Modifier >> Put
- Supprimer >> Delete
*/

/* Recuperer des données - Commensont ! 

/ Envoie une requette de type get.
fetch("http://url-service-web.com/api/users"); 

/ Recuperer les donnes au format JSON - Recuperer le resultat de la requete
fetch(“https://mockbin.com/request”)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
*/

// Valider les donnes saisies par les utilisateures

/*  
En utilisant le DOM, ecouter l'evenement "onChange" pour vérifier la donnée, dès que l'utilisateur a fini de l'éditer. Ou "onInput" pour vérifier la donnée à chaque nouveau caractère.

EX :
myInput.addEventListener('input', function(e) {
    var value = e.target.value;
    if (value.startsWith('Hello ')) {
        isValid = true;
    } else {
        isValid = false;
    }
});
*/

/* 
En utilsant Regex, qui permet de vérifier qu'un texte corresponde à une description que l'on a définie.

EX : 
function isValid(value) {
    return /^e[0-9]{3,}$/.test(value);
}

(si l'on veut savoir si notre texte commence par la lettre  e  et est suivi d'au moins 3 chiffres)
*/

/* OU 
Directement avec le html, avec l'attribut "type" pour les inputs, ou d'autre attribut de validation simple (voir cours) et l'attribut pattern, qui equivaux au validateur Regex (voir cours)
Cours : https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577611-validez-les-donnees-saisies-par-vos-utilisateurs */

// SAUVEGARDEZ DES DONNEES SUR LE SERVICE WEB

/* Envoie de donnes 
fetch("http://url-service-web.com/api/users", {
	method: “POST”, // Envoyer
	headers: { 
'Accept': 'application/json', 
'Content-Type': 'application/json' // Prevenir que c'est du JSON
},
	body: JSON.stringify(jsonBody) // Convertion de JS en JSON
});
*/
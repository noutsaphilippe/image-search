const accessKey = "YV6yjHmkrt4bk-peojfrmEJ6bEGa2eqoAxQdg3wSlU8 ";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("js-sb");
const getImage = document.querySelector(".js-images");
const btn = document.getElementById("js-sm");
const btnSearch = document.getElementById("btn");

let saveInput = '';
let showMore = 1;

async function getInputEl() {
// on se connecte à l'api et crée un delay pour attendre la réponse
    const url = `https://api.unsplash.com/search/photos?page=${showMore}&query=${saveInput}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

// ici on vide la page html dès que l'on envoi le formulaire
    if (showMore === 1) {
        getImage.innerHTML = "";
    }
    
// maintenant il faut appeler un array et faire looper les 10 images en resultat
    const results = data.results;
    results.map((result)=>{
        console.log(result);
        const divForNewHtml = document.createElement("div");
              divForNewHtml.classList.add("div-image");
        console.log(divForNewHtml)
        const divForNewImages = document.createElement("img");
              divForNewImages.src = result.urls.small;
              divForNewImages.alt = result.alt_description;
        const imageLink = document.createElement("a");
              imageLink.href = result.links.html;
              imageLink.target = "_blank";
              imageLink.textContent = result.alt_description;

              divForNewHtml.appendChild(divForNewImages);
              divForNewHtml.appendChild(imageLink);
              getImage.appendChild(divForNewHtml);
              showMore++;
    });
//on fait afficher le bouton shawMore
    if (showMore > 1) {
        btn.style.display = "block";
    }
}
// on bloque le rafraichissement de la page après chq submit
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    saveInput = inputEl.value;
    console.log(saveInput);
    getInputEl();
})

//le JS pour commande le bouton show more d'afficher nouvelle page
btn.addEventListener("click", () => {
    getInputEl();
})

btnSearch.addEventListener("click", () => {
    showMore = 1;
    saveInput = inputEl.value;
    btn.style.display = "none";
    getInputEl();
})



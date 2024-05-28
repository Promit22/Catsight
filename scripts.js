if (!localStorage.getItem('kat')) {
  fetcher();
}
const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions");



document.addEventListener('click', (event) => {
  const isClickOnSearchBar = searchInput.contains(event.target);
  const isClickOnSuggestionList = suggestionsList.contains(event.target);

  if (!isClickOnSearchBar && !isClickOnSuggestionList) {
    suggestionsList.style.display = 'none'; // Hide suggestions
  }
});



async function fetcher() {
  try {
    let req = await fetch("https://api.thecatapi.com/v1/breeds", { method: 'GET', headers: { 'x-api-key': 'live_0GNo1gdJyt1dzjLKoez5uyfuQcIjvPj1ZZD0JSCsUFdsPu5KUhE3NigjE66mGHIf'} });    
    let json = await req.json();
    localStorage.setItem('kat', JSON.stringify(json));
    listMaker(json);
  } catch (err) { alert('Error: ' + err.message);}
  //console.log(sugArr);
  
}


function listMaker(catData) {
  let length = catData.length;
  let slist = [];
  for (let i = 0; i < length; i++) {
    slist.push(catData[i].name.toLowerCase());
  }
  localStorage.setItem('list', JSON.stringify(slist));
}


//console.log(catObj);
//console.log(sugArr);

searchInput.addEventListener("keyup", () => {
  let sugArr = JSON.parse(localStorage.getItem('list'));
  if(sugArr) {
  const searchTerm = searchInput.value.toLowerCase(); // Get user input in lowercase
  const suggestions = sugArr.filter(
    (term) => term.startsWith(searchTerm) // Filter based on search term
  );

  // Clear existing suggestions
  suggestionsList.innerHTML = "";

  // Create and append suggestions
  suggestions.forEach((s) => {
    const suggestionItem = document.createElement("li");
    suggestionItem.textContent = s;
    suggestionItem.addEventListener('click', () => {
      searchInput.value = s;
    });
    suggestionsList.appendChild(suggestionItem);
  });

  // Show or hide suggestions list
  suggestionsList.style.display = suggestions.length > 0 ? "block" : "none";
}
});

let srchImg = document.getElementById('image');
let name = document.getElementById('name');
let desc = document.getElementById('des');
let temparament = document.getElementById('temperament');
let card = document.querySelector('.cat-card');
let wiki = document.getElementById('wiki');

function bringIt() {
  let catObj = JSON.parse(localStorage.getItem('kat'));
  //console.log(catObj);

  let lowerSearch = searchInput.value.toLowerCase();
  for (let cats of catObj) {
    let lowerCat = cats.name.toLowerCase();
    if (lowerSearch === lowerCat) {
      card.style.display = 'block';
      srchImg.src = Object.hasOwn(cats, 'image') ? cats.image.url : './unavailable.jpg';
      srchImg.alt = cats.name;
      name.textContent = cats.name.toUpperCase();
      desc.textContent = cats.description;
      temparament.textContent = 'Temperament: ' + cats.temperament;
      wiki.href = cats.wikipedia_url;
      return '';
    }
  }
  name.textContent = 'Cat not found';
}


let explore = document.getElementById('explore');

//cards.addEventListener('click', () => {cards.style.animation = 'expand 1s ease-in-out 0s forward';});

explore.addEventListener('click', () => {
  let catObj = JSON.parse(localStorage.getItem('kat'));
  if(catObj) {
  explore.disabled = 'true';
let container = document.querySelector('.card-container');
  for(let cats of catObj) {
    let card = document.createElement('div');
    card.classList.add('card');
    let name = document.createElement('h3');
    name.classList.add('card-name');
    name.textContent = cats.name;
    card.appendChild(name);
   let content = document.createElement('div');
   content.classList.add('card-content');
   let img = document.createElement('img');
   img.src = Object.hasOwn(cats, "image") ? cats.image.url : './unavailable.jpg';
   img.alt = cats.name;
   content.appendChild(img);
   let des = document.createElement('p');
   des.classList.add('card-description')
   des.textContent = cats.description;
   content.appendChild(des);
   let temp = document.createElement('p');
   temp.textContent = 'Temperament: ' + cats.temperament;
   content.appendChild(temp);
   let link = document.createElement('a');
   link.href = cats.wikipedia_url;
   link.textContent = 'Learn more-';
   content.appendChild(link);
   
   card.appendChild(content);
   
   container.appendChild(card);
   card.addEventListener('click', () => card.classList.toggle('expanded'));
  }
}
});
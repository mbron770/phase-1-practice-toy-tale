let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  fetchToyListGet()
  addNewToy() 
});

function fetchToyListGet() {
  const url = 'http://localhost:3000/toys'
  return fetch(url)
  .then(response => response.json())
  .then(displayToysInCard)
}

function displayToysInCard(toys) {
  const toyCollection = document.querySelector('#toy-collection')
  toys.forEach(toy => {
    const cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    toyCollection.append(cardDiv)
    const toyName = document.createElement('h2')
    toyName.textContent = toy.name
    const toyImage = document.createElement('img')
    toyImage.src = toy.image
    toyImage.className = 'toy-avatar'
    const toyLikesCount = document.createElement('p')
    toyLikesCount.textContent = toy.likes 
    const likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.id = toy.id
    likeButton.textContent = 'Like ❤️'

    cardDiv.append(toyName, toyImage, toyLikesCount, likeButton)
  })
}

function addNewToy(){
  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener('submit', e => {
    e.preventDefault()
    const toyName = document.getElementById("nameInput").value;
    const toyImage = document.getElementById("imageInput").value;
    const newToyInfo = {
      name: toyName, 
      image: toyImage,
      likes: 0 
    }
    
    
    
    const url = 'http://localhost:3000/toys'
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
      },

      body: JSON.stringify(newToyInfo),
    }).then(response => response.json())
    .then(aNewToy => {
      //displayToysInCard(aNewToy)
    }) 
  })

}





/*
          <input
          type="submit"
          name="submit"
          value="Create Toy"
          class="submit"
        />
      </form>



*/



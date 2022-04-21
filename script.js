const gameContainer = document.getElementById("game");
const newGame = document.querySelector('#new-game'); 


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on  
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let count = 0;  
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target.className);


  if (count < 2) {
    const color = event.target.className; 
    event.target.style.backgroundColor = color; 
    event.target.classList.add('clicked', 'inactive'); 
    count++ 
    if (count >= 2) {
      let match = checkCard();
      if (match){
        count = 0; 
      } else {
        setTimeout(function() {
          count = 0; 
        }, 1000);
      }
    }
  } else {
    event.preventDefault();
  }
}

function checkCard(){
  let clickedCards = gameContainer.getElementsByClassName('clicked'); 
  let card1 = clickedCards[0]
  let card2 = clickedCards[1]
  if(card1.className === card2.className){
    card1.className = 'inactive'; 
    card2.className = 'inactive'; 
    return true;  
  } else {
    setTimeout(function(){
      card1.style.backgroundColor = ''; 
      card2.style.backgroundColor = ''; 
      card1.classList.remove('clicked', 'inactive');
      card2.classList.remove('clicked', 'inactive');
    }, 1000)

    return false; 
  };
}

// when the DOM loads
newGame.addEventListener('click', function() {
  gameContainer.innerHTML = ''; 
  createDivsForColors(shuffledColors); 
})

/* */
var facingUpCount = 0;
var cardsFacingUp = [];
var score = 0;
var board = document.getElementById("board");
var images = [
 "pair1",
 "pair2",
 "pair3",
 "pair4",
 "pair5",
 "pair6",
 "pair7",
 "pair8",
 "pair9",
 "pair10",
 "pair11",
 "pair12"
];
var desiredCount = 0;
var shuffledPairs = [];

if (document.readyState !== "loading") {
 getDesiredCount("pairsCount");
} else {
 document.addEventListener("DOMContentLoaded", function(event) {
  event.preventDefault();
  getDesiredCount("pairsCount");
 });
}

function getDesiredCount(dropDownId) {
 var el = document.getElementById(dropDownId);
 desiredCount = parseInt(el.options[el.selectedIndex].value);
 shuffledPairs = shuffle(images.slice(0, desiredCount));
 console.log(shuffledPairs);
 setup(shuffledPairs);
}

function setup(shuffledPairs) {
 document.getElementById("board").innerHTML = "";
 var collection = new DocumentFragment();
 var len = shuffledPairs.length;
 for (var i = 0; i < len; i++) {
  card = document.createElement("div");
  var arr = ["card", `card${i + 1}`, shuffledPairs[i]];
  card.classList.add(...arr);
  collection.appendChild(card);
 }
 if (len == 12) {
  board.style.cssText =
   "width: calc(120px*4 + 20px*3 ); height: calc(120px*3 + 20px*3); display: grid; grid-gap: 20px; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr);";
 } else if (len == 16) {
  board.style.cssText =
   "width: calc(120px*4 + 20px*3 ); height: calc(120px*4 + 20px*4); display: grid; grid-gap: 20px; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr);";
 } else if (len == 24) {
  board.style.cssText =
   "width: calc(120px*6 + 20px*5 ); height: calc(120px*4 + 20px*4); display: grid; grid-gap: 20px; grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(3, 1fr);";
 }
 board.appendChild(collection);
 var listOfCards = document.getElementsByClassName("card");
 for (let card of listOfCards) {
  card.addEventListener("click", flip);
 }
}

function flip() {
 if (facingUpCount < 2) {
  cardsFacingUp.push(this);
	this.classList.add('fadeIn');
	setTimeout(() => {
		this.style.border = "1px solid #ebf5fc";
	}, 100);
  this.removeEventListener("click", flip);
  facingUpCount += 1;
  if (facingUpCount == 2) {
   setTimeout(checkForMatch, 800);
  }
 }
}

function checkForMatch() {
 var card1 = cardsFacingUp[0];
 var card2 = cardsFacingUp[1];
 var bg1 = window.getComputedStyle(card1).getPropertyValue("background-image");
 var bg2 = window.getComputedStyle(card2).getPropertyValue("background-image");
 if (bg1 == bg2) {
  console.log("match");
  card1.removeEventListener("click", flip);
  card2.removeEventListener("click", flip);
  score += 1;
  if (score == 6) {
   alert("You win!!");
  }
 } else {
  console.log("no match");
  card1.addEventListener("click", flip);
  card2.addEventListener("click", flip);
  card1.style.border = "60px solid #ebf5fc";
  card2.style.border = "60px solid #ebf5fc";
 }
 facingUpCount = 0;
 cardsFacingUp.length = 0;
}

function shuffle(array) {
 array = array.reduce(function(res, current) {
  return res.concat([current, current]);
 }, []);

 var currentIndex = array.length,
  temporaryValue,
  randomIndex;

 // While there remain elements to shuffle...
 while (0 !== currentIndex) {
  // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
 }

 return array;
}

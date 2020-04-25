/*
* Function that initiates the whole Game application.
*/
function init(){
  initGameUI();
}

function initGameUI(){
  // Call functions that creates the Game UI
}

function initChests(e){
	let imageOne = document.createElement('img');
	imageOne.id = 'image-one';
	imageOne.src = 'images/chest-closed.png';
	imageOne.style = 'width: 15em; height: 10em';
	let imageTwo = document.createElement('img');
	imageTwo.id = 'image-two';
	imageTwo.src = 'images/chest-closed.png';
	imageTwo.style = 'width: 15em; height: 10em; margin-left: 1em;';
	let imageThree = document.createElement('img');
	imageThree.id = 'image-three';
	imageThree.src = 'images/chest-closed.png';
	imageThree.style = 'width: 15em; height: 10em; margin-left: 1em;';
	chestsDiv.appendChild(imageOne);
	chestsDiv.appendChild(imageTwo);
	chestsDiv.appendChild(imageThree);
	var imageOneTag = document.getElementById("image-one");
	var imageTwoTag = document.getElementById("image-two");
	var imageThreeTag = document.getElementById("image-three");
	imageOneTag.addEventListener("click", function () {chestClicked(1, e)}, false);
	imageTwoTag.addEventListener("click", function () {chestClicked(2, e)}, false);
	imageThreeTag.addEventListener("click", function () {chestClicked(3, e)}, false);
}

function initScoreBoard(){
}

function initRefreshButton(){
}

function initChestEventListeners() {
}

function placeTreassure(){
}

function chestClicked(imageIdentifier, e){
	let randomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
	var imageOneTag = document.getElementById("image-one");
	var imageTwoTag = document.getElementById("image-two");
	var imageThreeTag = document.getElementById("image-three");
	let replaceImage = document.createElement('img');
	replaceImage.id = 'image-replace';
	replaceImage.src = 'images/chest-open.png';
	
	let treasureImage = document.createElement('img');
	treasureImage.id = 'image-treasure';
	treasureImage.src = 'images/chest-jewel.png';
	
	console.log(imageIdentifier);
	console.log(randomNumber);
	if (imageIdentifier !== randomNumber) {
		if (imageIdentifier === 1) {
			treasureImage.style = 'width: 15em; height: 10em;';
			chestsDiv.replaceChild(treasureImage, imageOneTag);
		} else if (imageIdentifier === 2) {
			treasureImage.style = 'width: 15em; height: 10em; margin-left: 1em;';
			chestsDiv.replaceChild(treasureImage, imageTwoTag);
		} else {
			treasureImage.style = 'width: 15em; height: 10em; margin-left: 1em;';
			chestsDiv.replaceChild(treasureImage, imageThreeTag);
		}
	} else {
		if (imageIdentifier === 1) {
			replaceImage.style = 'width: 15em; height: 10em;';
			chestsDiv.replaceChild(replaceImage, imageOneTag);
		} else if (imageIdentifier === 2) {
			replaceImage.style = 'width: 15em; height: 10em; margin-left: 1em;';
			chestsDiv.replaceChild(replaceImage, imageTwoTag);
		} else {
			replaceImage.style = 'width: 15em; height: 10em; margin-left: 1em;';
			chestsDiv.replaceChild(replaceImage, imageThreeTag);
		}
	}
}

function getImageFromPexels(){
  // make a request towards pexels API and get 1 Diamond image
  // 563492ad6f917000010000014304512fa34a457ba983f0558cfe579a
  var xhr = new XMLHttpRequest();
  var page = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  xhr.onreadystatechange  = function () {
	  if (this.readyState == 4 && this.status == 200) {
		  var result = JSON.parse(this.responseText);
		  console.log(result);
		}
	};
  xhr.open('GET', `https://api.pexels.com/v1/curated?per_page=1&page=${page}`, true);
  xhr.setRequestHeader('Authorization', '563492ad6f917000010000014304512fa34a457ba983f0558cfe579a');
  xhr.send();
}

function refresh(){
}

function removeChestEvents(){
}

var chestsDiv = document.getElementById("chests");
var refreshButton = document.getElementById("refresh-button");

window.addEventListener("load", initChests);
refreshButton.addEventListener("click", getImageFromPexels);
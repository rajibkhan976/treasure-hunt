/*
* Function that initiates the whole Game application.
*/

var chestsDiv = document.getElementById("chests");
let score = 0;

function init(){
  initGameUI();
}

function initGameUI(e){
  // Call functions that creates the Game UI
  initChests(e);
  initRefreshButton();
  initScoreBoard();
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
	initChestEventListeners(imageOneTag, imageTwoTag, imageThreeTag, e);
}

function initScoreBoard(){
	let scoreCounter = document.createElement('p');
	scoreCounter.id = 'score-counter';
	scoreCounter.innerHTML = `Score: ${score}`;
	scoreCounter.style = 'display: block; color: white; margin: 1em auto; font-size: 1.2em;';
	var refreshButton = document.getElementById("refresh-button");
	refreshButton.after(scoreCounter);
}

function initRefreshButton(){
	var refreshButton = document.getElementById("refresh-button");
	refreshButton.addEventListener("click", refresh);
}

function initChestEventListeners(imageOneTag, imageTwoTag, imageThreeTag, e) {
	imageOneTag.addEventListener("click", function () {chestClicked(1, e)}, false);
	imageTwoTag.addEventListener("click", function () {chestClicked(2, e)}, false);
	imageThreeTag.addEventListener("click", function () {chestClicked(3, e)}, false);
}

function placeTreassure(imageOneTag, imageTwoTag, imageThreeTag, imageIdentifier, randomNumber){
	
	getImageFromPexels();
	
	let scoreCounter = document.getElementById("score-counter");
	let data = sessionStorage.getItem('result');
	let imageTreasure = JSON.parse(data);
	let treasureImage = document.createElement('img');
	
	if (imageTreasure !== undefined &&
	imageTreasure.photos !== undefined &&
	imageTreasure.photos.length !== 0) {
		imageTreasure.photos.map((value, index) => {
			treasureImage.src = `${value.src.original}`;
		});
	}
	
	if (imageIdentifier === 1 && randomNumber === 1) {
		treasureImage.id = 'image-one';
		treasureImage.style = 'width: 15em; height: 10em;';
		chestsDiv.replaceChild(treasureImage, imageOneTag);
		score += 5;
		scoreCounter.innerHTML = `Score: ${score}`;
		removeChestEvents(imageOneTag, imageTwoTag, imageThreeTag);
	} else if (imageIdentifier === 2 && randomNumber === 2) {
		treasureImage.id = 'image-two';
		treasureImage.style = 'width: 15em; height: 10em; margin-left: 1em;';
		chestsDiv.replaceChild(treasureImage, imageTwoTag);
		score += 5;
		scoreCounter.innerHTML = `Score: ${score}`;
		removeChestEvents(imageOneTag, imageTwoTag, imageThreeTag);
	} else {
		treasureImage.id = 'image-three';
		treasureImage.style = 'width: 15em; height: 10em; margin-left: 1em;';
		chestsDiv.replaceChild(treasureImage, imageThreeTag);
		score += 5;
		scoreCounter.innerHTML = `Score: ${score}`;
		removeChestEvents(imageOneTag, imageTwoTag, imageThreeTag);
	}
}

function chestClicked(imageIdentifier, e){
	
	let randomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
	
	var imageOneTag = document.getElementById("image-one");
	var imageTwoTag = document.getElementById("image-two");
	var imageThreeTag = document.getElementById("image-three");
	
	let replaceImage = document.createElement('img');
	replaceImage.src = 'images/chest-open.png';
	
	if (imageIdentifier !== randomNumber) {
		if (imageIdentifier === 1) {
			replaceImage.id = 'image-one';
			replaceImage.style = 'width: 15em; height: 13em;';
			chestsDiv.replaceChild(replaceImage, imageOneTag);
			removeChestEvents(imageOneTag, imageTwoTag, imageThreeTag);
		} else if (imageIdentifier === 2) {
			replaceImage.id = 'image-two';
			replaceImage.style = 'width: 15em; height: 13em; margin-left: 1em;';
			chestsDiv.replaceChild(replaceImage, imageTwoTag);
			removeChestEvents(imageOneTag, imageTwoTag, imageThreeTag);
		} else {
			replaceImage.id = 'image-three';
			replaceImage.style = 'width: 15em; height: 13em; margin-left: 1em;';
			chestsDiv.replaceChild(replaceImage, imageThreeTag);
			removeChestEvents(imageOneTag, imageTwoTag, imageThreeTag);
		}
	} else {
		placeTreassure(imageOneTag, imageTwoTag, imageThreeTag, imageIdentifier, randomNumber);
	}
}

function getImageFromPexels(){
  // make a request towards pexels API and get 1 Diamond image
  // 563492ad6f917000010000014304512fa34a457ba983f0558cfe579a
  var xhr = new XMLHttpRequest();
  var page = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  xhr.onreadystatechange  = function () {
	  if (this.readyState == 4 && this.status == 200) {
		  var result = this.responseText;
		  sessionStorage.setItem('result', result);
		}
	};
  xhr.open('GET', `https://api.pexels.com/v1/curated?per_page=1&page=${page}`, true);
  xhr.setRequestHeader('Authorization', '563492ad6f917000010000014304512fa34a457ba983f0558cfe579a');
  xhr.send();
}

function refresh(e){
	
	var imageOneTag = document.getElementById("image-one");
	var imageTwoTag = document.getElementById("image-two");
	var imageThreeTag = document.getElementById("image-three");
	chestsDiv.removeChild(imageOneTag);
	chestsDiv.removeChild(imageTwoTag);
	chestsDiv.removeChild(imageThreeTag);
	initChests(e);
}

function removeChestEvents(imageOneTag, imageTwoTag, imageThreeTag){
	imageOneTag.removeEventListener("click", function () {chestClicked(1, e)}, false);
	imageTwoTag.removeEventListener("click", function () {chestClicked(2, e)}, false);
	imageThreeTag.removeEventListener("click", function () {chestClicked(3, e)}, false);
}

window.addEventListener("load", init);
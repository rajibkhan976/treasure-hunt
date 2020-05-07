/*
* Function that initiates the whole Game application.
*/
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
	  
	var chestsDiv = document.getElementById("chests"); //capturing the div element by id
	var refreshButton = document.getElementById("refresh-button"); //capturing the refresh button by id
	let score = 0; //initializing the score 
	//calling the game initiator event while window loads
    init();
	
	function init(){
		//initiating the game user interface
		initGameUI();
	}

	function initGameUI(e){
		// Call functions that creates the Game UI
		initChests(e);
		initRefreshButton();
		initScoreBoard();
	}

	function initChests(e){
		//initiating the chests setup
		let imageOne = document.createElement('img'); //creating an image tag
		imageOne.id = 'image-one';
		imageOne.src = 'images/chest-closed.png';
		imageOne.style = 'width: 15em; height: 10em';
		let imageTwo = document.createElement('img'); //creating an image tag
		imageTwo.id = 'image-two';
		imageTwo.src = 'images/chest-closed.png';
		imageTwo.style = 'width: 15em; height: 10em; margin-left: 1em;';
		let imageThree = document.createElement('img'); //creating an image tag
		imageThree.id = 'image-three';
		imageThree.src = 'images/chest-closed.png';
		imageThree.style = 'width: 15em; height: 10em; margin-left: 1em;';
		chestsDiv.appendChild(imageOne);
		chestsDiv.appendChild(imageTwo);
		chestsDiv.appendChild(imageThree);
		var imageOneTag = document.getElementById("image-one"); //capturing the image element by its id
		var imageTwoTag = document.getElementById("image-two"); //capturing the image element by its id
		var imageThreeTag = document.getElementById("image-three"); //capturing the image element by its id
		initChestEventListeners(imageOneTag, imageTwoTag, imageThreeTag, e);
	}

	function initScoreBoard(){
		// initializing and setting up the score board
		let scoreCounter = document.createElement('p'); //creating a p element to show the score
		scoreCounter.id = 'score-counter';
		scoreCounter.innerHTML = `Score: ${score}`;
		scoreCounter.style = 'display: block; color: white; margin: 1em auto; font-size: 1.2em;';
		refreshButton.after(scoreCounter);
	}

	function initRefreshButton(){
		//adding the click event to the refresh button
		refreshButton.addEventListener("click", refresh);
	}

	function initChestEventListeners(imageOneTag, imageTwoTag, imageThreeTag, e) {
		//adding click events to the chests images
		imageOneTag.addEventListener("click", function () {chestClicked(1, e)}, false);
		imageTwoTag.addEventListener("click", function () {chestClicked(2, e)}, false);
		imageThreeTag.addEventListener("click", function () {chestClicked(3, e)}, false);
	}

	function placeTreassure(imageOneTag, imageTwoTag, imageThreeTag, imageIdentifier, randomNumber){
		//palcing the treasure image based on the result of random matches
		getImageFromPexels();
		
		let scoreCounter = document.getElementById("score-counter"); //capturing the p tag of scoreboard by id
		let data = sessionStorage.getItem('result'); //storing the data fetched from the remote api
		let imageTreasure = JSON.parse(data); //storing the parsed data in JSON format
		let treasureImage = document.createElement('img'); //creating the treasure image tag
		
		if (imageTreasure !== undefined &&
		imageTreasure !== null &&
		imageTreasure.photos !== undefined &&
		imageTreasure.photos !== null &&
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
		//checking the random matches between the players guess and the position of the treasure
		let randomNumber = Math.floor(Math.random() * (3 - 1 + 1)) + 1; //storing a random number between 1-3
		
		var imageOneTag = document.getElementById("image-one"); //capturing the image tag by id
		var imageTwoTag = document.getElementById("image-two"); //capturing the image tag by id
		var imageThreeTag = document.getElementById("image-three"); //capturing the image tag by id
		
		let replaceImage = document.createElement('img'); //creating the opened chest image tag
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
	  var xhr = new XMLHttpRequest(); //initializing a new request
	  var page = Math.floor(Math.random() * (1000 - 1 + 1)) + 1; //string the random page number
	  xhr.onreadystatechange  = function () {
		  if (this.readyState == 4 && this.status == 200) {
			  var result = this.responseText; //storing the response data
			  sessionStorage.setItem('result', result); //storing the result into session
			}
		};
	  xhr.open('GET', `https://api.pexels.com/v1/curated?per_page=1&page=${page}`, true);
	  xhr.setRequestHeader('Authorization', '563492ad6f917000010000014304512fa34a457ba983f0558cfe579a');
	  xhr.send();
	}

	function refresh(e){
		//refresing the chests images
		var imageOneTag = document.getElementById("image-one"); //capturing the image tag by id
		var imageTwoTag = document.getElementById("image-two"); //capturing the image tag by id
		var imageThreeTag = document.getElementById("image-three"); //capturing the image tag by id
		chestsDiv.removeChild(imageOneTag);
		chestsDiv.removeChild(imageTwoTag);
		chestsDiv.removeChild(imageThreeTag);
		initChests(e);
	}

	function removeChestEvents(imageOneTag, imageTwoTag, imageThreeTag){
		//removing the click events from the chests iimages
		imageOneTag.removeEventListener("click", function () {chestClicked(1, e)}, false);
		imageTwoTag.removeEventListener("click", function () {chestClicked(2, e)}, false);
		imageThreeTag.removeEventListener("click", function () {chestClicked(3, e)}, false);
	}

  }
}


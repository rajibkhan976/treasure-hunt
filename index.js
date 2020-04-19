/*
* Function that initiates the whole Game application.
*/
function init(){
  initGameUI();
}

function initGameUI(){
  // Call functions that creates the Game UI
}

function initChests(){
	let img = document.createElement('img');
	chestsDiv.appendChild(img);
}

function initScoreBoard(){
}

function initRefreshButton(){
}

function initChestEventListeners() {
}

function placeTreassure(){
}

function chestClicked(e){
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
chestsDiv.addEventListener("click", initChests);
refreshButton.addEventListener("click", getImageFromPexels);
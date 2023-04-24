// function to show the pop-up window with the images
function showPopup() {
	// show the background blur
	document.getElementById("background").style.display = "block";

	// show the pop-up container
	document.getElementById("popup-container").style.display = "block";
}

// function to close the pop-up window
function closePopup() {
	// hide the background blur and the pop-up container
	document.getElementById("background").style.display = "none";
	document.getElementById("popup-container").style.display = "none";
}

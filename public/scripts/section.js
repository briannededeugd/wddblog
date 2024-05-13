console.log("Section added!");

var nextsection = document.getElementById("nextsection");

if (nextsection) {
	nextsection.addEventListener("click", () => {
		const section = document.getElementById("css");

		if (section) {
			window.scrollBy(0, section.clientHeight);
		}
	});
}

var scrollToContent = document.getElementById("scrolldowntocontent");

if (scrollToContent) {
	scrollToContent.addEventListener("click", () => {
		window.scrollBy(0, window.innerHeight);
	});
}

/**======================
 *    SCROLL RIGHT
 *========================**/
var scrollHorizontalButtons = document.querySelectorAll(".scrollhorizontal");
scrollHorizontalButtons.forEach((button) => {
	button.addEventListener("click", scrollHorizontal); // Pass the function reference without invoking it
});

function scrollHorizontal() {
	var goalsContainer = document.getElementById("goals");

	if (goalsContainer) {
		goalsContainer.scrollBy({
			left: goalsContainer.clientWidth,
			behavior: "smooth", // Adding smooth scrolling behavior
		});
	}
}

/**======================
 *    SCROLL LEFT
 *========================**/

var scrollHorizontalReverseButtons = document.querySelectorAll(".scrollleft");
scrollHorizontalReverseButtons.forEach((button) => {
	button.addEventListener("click", scrollHorizontalReversed);
});

function scrollHorizontalReversed() {
	var goalsContainer = document.getElementById("goals");

	if (goalsContainer) {
		goalsContainer.scrollBy({
			left: -goalsContainer.clientWidth, // Negative value to scroll left
			behavior: "smooth", // Adding smooth scrolling behavior
		});
	}
}

/**======================
 *    SCROLL HOME
 *========================**/
var scrollHomeButton = document.querySelector(".scrollhome");
scrollHomeButton.addEventListener("click", scrollHome);

function scrollHome() {
	var goalsContainer = document.getElementById("goals");

	if (goalsContainer) {
		goalsContainer.scrollBy({
			left: -2 * goalsContainer.clientWidth, // Scroll 2 times the negative width
			behavior: "smooth", // Adding smooth scrolling behavior
		});
	}
}

/**============================================
 *               SCROLL TO TOP
 *=============================================**/
document
	.querySelector(".scrollt-to-top")
	.addEventListener("click", function () {
		window.scrollTo(0, 0);
	});

/**============================================
 *               ACTIVE LINK ITEMS
 *=============================================**/

document.addEventListener("DOMContentLoaded", function () {
	var currentUrl = window.location.pathname;
	var navLinks = document.querySelectorAll(".header ul li a");

	navLinks.forEach(function (link) {
		var href = link.getAttribute("href");
		// Check if the current URL contains the entire word from the href
		if (href !== "/" && currentUrl.includes(href)) {
			link.parentElement.classList.add("activenavitem");
		} else if (href === "/" && currentUrl === "/") {
			link.parentElement.classList.add("activenavitem");
		}
	});
});

/**============================================
 *               CURRENT DATE + TIME
 *=============================================**/

// Function to update current time
function updateTime() {
	// Get current date
	let currentDate = new Date();
	let options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	let dateInLongFormat = currentDate.toLocaleDateString("en-US", options);

	let hours = currentDate.getHours().toString().padStart(2, "0");
	let minutes = currentDate.getMinutes().toString().padStart(2, "0");
	let seconds = currentDate.getSeconds().toString().padStart(2, "0");
	let currentTime = `${hours}:${minutes}:${seconds}`;

	// Display current date and time
	let currentDateElement = document.getElementById("currentdate");
	let currentTimeElement = document.getElementById("currenttime");

	if (currentDateElement) {
		currentDateElement.textContent = dateInLongFormat;
	}

	if (currentTimeElement) {
		currentTimeElement.textContent = currentTime;
	}
}

// Update time immediately
updateTime();

// Update time every second
setInterval(updateTime, 1000);

/**============================================
 *               LOADER
 *=============================================**/

window.addEventListener("load", (event) => {
	document.querySelector(".loader-wrapper").classList.add("pageloaded");
});

/**============================================
 *               PREFERS REDUCED MOTION
 *=============================================**/

var elements = document.getElementsByTagName("*");
const motionToggle = document.getElementById("partypooper");

const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function noMovements() {
	if (motionToggle.checked || isReduced) {
		for (let i = 0; i < elements.length; i++) {
			elements[i].classList.add("notransition");
		}
	} else {
		for (let i = 0; i < elements.length; i++) {
			elements[i].classList.remove("notransition");
		}
	}
}

// Function to save the state to localStorage
function saveState() {
	localStorage.setItem("motionToggleState", motionToggle.checked);
}

// Function to load the state from localStorage
function loadState() {
	const savedState = localStorage.getItem("motionToggleState");
	if (savedState !== null) {
		motionToggle.checked = JSON.parse(savedState);
	}
}

// Load the saved state on page load
loadState();

// Apply the noMovements function on page load
noMovements();

// Add event listener to save state when the toggle changes
motionToggle.addEventListener("change", () => {
	saveState();
	noMovements();
});

/**============================================
 *               HAMBURGER MENU
 *=============================================**/

const hamburgerToggle = document.getElementById("menu-toggle");
hamburgerToggle.addEventListener("click", () => {
	hamburgerToggle.classList.toggle("active");
});

/**============================================
 *               RECENT BLOGS (HOMEPAGE)
 *=============================================**/

const blogButtons = document.querySelectorAll(".blog-display > div > div");
document.addEventListener("DOMContentLoaded", function () {
	if (blogButtons) {
		showActiveBlogs();
		window.onresize = showActiveBlogs;
	}
});

function showActiveBlogs() {
	if (blogButtons.length === 0) return;

	if (window.innerWidth > 750) {
		blogButtons.forEach((button) => {
			button.classList.remove("activeblog");

			button.addEventListener("click", function () {
				// Remove .activeblog class from all buttons
				blogButtons.forEach((btn) => btn.classList.remove("activeblog"));

				// Add .activeblog class to the clicked button
				this.classList.add("activeblog");
			});
		});

		blogButtons[0].classList.add("activeblog");
	} else if (window.innerWidth < 750) {
		blogButtons.forEach((btn) => btn.classList.add("activeblog"));
	}
}

/**============================================
 *               TOGGLE FILTERS (PHONE)
 *=============================================**/

const filters = document.querySelector(".blog-filters");

if (filters) {
	document.querySelector(".toggle-filters").addEventListener("click", () => {
		filters.classList.add("open-filters");
	});
}

if (filters) {
	document.querySelector(".close-filters").addEventListener("click", () => {
		filters.classList.remove("open-filters");
	});
}

/**============================================
 *           TOGGLE MY USE AND IDEAS
 *=============================================**/

const reflectionToggle = document.querySelector(".reflection h2");

if (reflectionToggle) {
	reflectionToggle.addEventListener("click", () => {
		const allReflections = document.querySelectorAll(".reflection > section");
		allReflections.forEach((reflectitem) => {
			reflectitem.classList.toggle("active-reflection");
		});
	});
}

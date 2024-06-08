/**============================================
 *               SCROLL TO TOP
 *=============================================**/
document
	.querySelector(".scrollt-to-top")
	.addEventListener("click", function () {
		window.scrollTo(0, 0);
	});

/**============================================
 *           LIGHT-DARK MODE SWITCH
 *=============================================**/

// Function to update UI based on dark mode state
function updateDarkModeUI() {
	const indi = document.getElementById("modeswitch-indicator");
	const body = document.body;

	// Function to apply dark mode based on the state
	function applyDarkMode(isDarkMode) {
		if (isDarkMode) {
			indi.style.transform = "translate(100%, -50%)";
			body.classList.add("darkmode");
		} else {
			indi.style.transform = "translate(0%, -50%)";
			body.classList.remove("darkmode");
		}
	}

	// Check the user's system preference
	const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

	// Determine the initial mode based on user preference and darkmode state
	if (darkmode === undefined) {
		darkmode = prefersDarkScheme.matches;
	}

	// Apply the initial mode
	applyDarkMode(darkmode);

	// Add an event listener to the toggle (assuming there's a toggle button)
	document.getElementById("modeswitch").addEventListener("click", () => {
		// Toggle darkmode state
		darkmode = !darkmode;

		// Update the UI based on the new darkmode state
		applyDarkMode(darkmode);
	});

	// Add an event listener to system preference changes
	prefersDarkScheme.addEventListener("change", (e) => {
		if (darkmode === undefined) {
			// If darkmode is undefined, follow the system preference
			applyDarkMode(e.matches);
		}
	});
}

// Assuming darkmode is initially undefined (first visit)
let darkmode;

// Call the function on page load
window.onload = updateDarkModeUI;

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
			console.log("no transition");
		}
	} else {
		for (let i = 0; i < elements.length; i++) {
			elements[i].classList.remove("notransition");
			console.log("transition back on");
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
})
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
// Check if dark mode preference is stored in localStorage
let darkmode = localStorage.getItem("darkmode") === "true";

// Function to update UI based on dark mode state
function updateDarkModeUI() {
	const indi = document.getElementById("modeswitch-indicator");
	const body = document.body;

	if (darkmode) {
		indi.style.transform = "translate(100%, -50%)";
		body.classList.add("darkmode");
		console.log("Switching to dark mode");
	} else {
		indi.style.transform = "translate(0%, -50%)";
		body.classList.remove("darkmode");
		console.log("Switching to light mode");
	}
}

// Function to toggle dark mode
function toggleDarkMode() {
	darkmode = !darkmode;

	// Update UI
	updateDarkModeUI();

	// Update dark mode preference in localStorage
	localStorage.setItem("darkmode", darkmode);
}

// Event listener for mode switch button
var modeswitch = document.getElementById("modeswitch");

if (modeswitch) {
	modeswitch.addEventListener("click", toggleDarkMode);
}

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

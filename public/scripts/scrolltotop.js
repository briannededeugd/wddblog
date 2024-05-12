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
document.getElementById("modeswitch").addEventListener("click", toggleDarkMode);

/**============================================
 *               ACTIVE LINK ITEMS
 *=============================================**/

document.addEventListener("DOMContentLoaded", function () {
	// Initial setup
	updateDarkModeUI();
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

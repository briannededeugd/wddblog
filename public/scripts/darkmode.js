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
			if (indi) {
				indi.style.transform = "translate(100%, -50%)";
				body.classList.add("darkmode");
			} else {
				body.classList.add("darkmode");
			}
		} else {
			if (indi) {
				indi.style.transform = "translate(0%, -50%)";
				body.classList.remove("darkmode");
			} else {
				body.classList.remove("darkmode");
			}
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
	const modeswitch = document.getElementById("modeswitch");

	if (modeswitch) {
		modeswitch.addEventListener("click", () => {
			// Toggle darkmode state
			darkmode = !darkmode;

			// Update the UI based on the new darkmode state
			applyDarkMode(darkmode);
		});
	}

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

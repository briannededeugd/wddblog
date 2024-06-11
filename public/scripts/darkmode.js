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

	// Get stored preferences
	const storedPreference = localStorage.getItem("darkmode");
	const sessionPreference = sessionStorage.getItem("darkmode");

	// Determine the initial mode based on stored preferences and system preference
	if (sessionPreference !== null) {
		darkmode = JSON.parse(sessionPreference);
	} else if (storedPreference !== null) {
		darkmode = JSON.parse(storedPreference);
	} else {
		darkmode = prefersDarkScheme.matches;
	}

	// Apply the initial mode
	applyDarkMode(darkmode);

	// Store the preference in session storage
	sessionStorage.setItem("darkmode", darkmode);

	// Add an event listener to the toggle (assuming there's a toggle button)
	const modeswitch = document.getElementById("modeswitch");

	if (modeswitch) {
		modeswitch.addEventListener("click", () => {
			// Toggle darkmode state
			darkmode = !darkmode;

			// Update the UI based on the new darkmode state
			applyDarkMode(darkmode);

			// Store the new preference in local and session storage
			localStorage.setItem("darkmode", darkmode);
			sessionStorage.setItem("darkmode", darkmode);
		});
	}

	// Add an event listener to system preference changes
	prefersDarkScheme.addEventListener("change", (e) => {
		if (sessionStorage.getItem("darkmode") === null) {
			// If darkmode is undefined in session, follow the system preference
			applyDarkMode(e.matches);
		}
	});

	// Add an event listener to clear session storage when the user leaves the site
	window.addEventListener("beforeunload", () => {
		sessionStorage.removeItem("darkmode");
		// localStorage.removeItem("darkmode");
	});
}

// Call the function on page load
window.onload = updateDarkModeUI;

console.log("Script added");

/**============================================
 *               ACCORDION
 *=============================================**/

const items = document.querySelectorAll(".item");

const reset = () => {
	items.forEach((item) => {
		item.classList.remove("animation");
		// Remove fade-in class to hide text immediately
		hideText(item);
	});
};

function hideText(item) {
	const h3 = item.querySelector("h3");
	const p = item.querySelector("p");
	const a = item.querySelector(".readblog");
	if (h3 && p) {
		// Instead of changing visibility, remove the class that shows the text
		h3.classList.remove("fade-in");
		p.classList.remove("fade-in");
		a.classList.remove("fade-in");
		item.classList.remove("gradient-overlay");
	}
}

function showText(item) {
	const h3 = item.querySelector("h3");
	const p = item.querySelector("p");
	const a = item.querySelector(".readblog");
	if (h3 && p) {
		// Add fade-in class to animate the text visibility
		h3.classList.add("fade-in");
		p.classList.add("fade-in");
		a.classList.add("fade-in");
		item.classList.add("gradient-overlay");
	}
}

function accordion(e) {
	const item = e.target.closest(".item");
	if (!item) return;
	reset();
	item.classList.add("animation");
	// Listen for the transitionend event to show text with fade-in effect
	item.addEventListener("transitionend", () => showText(item), { once: true });
}

const init = () => {
	items[items.length - 1].classList.add("animation");
	// Optionally show text for the initially flexed item with fade-in effect
	items[items.length - 1].addEventListener(
		"transitionend",
		() => showText(items[items.length - 1]),
		{ once: true }
	);
};

window.addEventListener("load", init, false);
window.addEventListener("click", accordion, false);
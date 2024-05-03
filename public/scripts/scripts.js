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

/**========================================================================
 *                      DROPDOWNS (ONE AT A TIME)
 *========================================================================**/

const tagButton = document.getElementById("tagbutton");
const likelytouseButton = document.getElementById("likelytousebutton");
const impactButton = document.getElementById("impactbutton");
const inspirationButton = document.getElementById("inspirationbutton");
const sortButton = document.getElementById("sort");

function oneAtATime() {
	const checkboxes = [
		tagButton,
		likelytouseButton,
		impactButton,
		inspirationButton,
	];

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", function () {
			console.log("CHECKBOX CLICKED:", this);
			if (this.checked) {
				checkboxes.forEach((otherCheckbox) => {
					if (otherCheckbox !== this) {
						otherCheckbox.checked = false;
					}
				});
			}
		});
	});

	// Add click event listener to document body to uncheck checkboxes when clicked outside
	document.body.addEventListener("click", function (event) {
		// Check if the click event happened outside the checkboxes and their container
		if (!event.target.closest(".edit-view")) {
			checkboxes.forEach((checkbox) => {
				checkbox.checked = false;
			});
		}
	});
}

// Call the function to enable the one-at-a-time behavior
oneAtATime();

/**========================================================================
 *                           FILTER FUNCTIONALITY
 *========================================================================**/

document.getElementById("applyfilters").addEventListener("click", function () {
	const selectedTags = Array.from(
		document.querySelectorAll("input[name='tags']:checked")
	).map((tag) => tag.dataset.tag);
	const selectedLikelyToUse = Array.from(
		document.querySelectorAll("input[name='likelytouse']:checked")
	).map((use) => use.dataset.tag);
	const selectedImpact = Array.from(
		document.querySelectorAll("input[name='impact']:checked")
	).map((impact) => impact.dataset.tag);
	const selectedInspiration = Array.from(
		document.querySelectorAll("input[name='inspiration']:checked")
	).map((inspiration) => inspiration.dataset.tag);

	const filters = {
		tags: selectedTags,
		likelytouse: selectedLikelyToUse,
		impact: selectedImpact,
		inspiration: selectedInspiration,
	};

	// Send an AJAX request to the server with filter parameters
	fetch("/filter", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(filters),
	})
		.then((response) => response.json())
		.then((data) => {
			// Update the content on the page with the filtered data
			renderFilteredData(data);
			// Add selected filters to the selectedfilters section
			renderSelectedFilters(filters);
		})
		.catch((error) => {
			console.error("Error applying filters:", error);
		});
});

function renderSelectedFilters(filters) {
	const selectedFiltersSection = document.querySelector(".selectedfilters");
	selectedFiltersSection.innerHTML = ""; // Clear existing content

	for (const category in filters) {
		const categoryFilters = filters[category];
		if (categoryFilters.length > 0) {
			const selectedIndicator = document.createElement("h3");
			selectedIndicator.textContent = "Selected filters: ";
			selectedFiltersSection.appendChild(selectedIndicator);

			categoryFilters.forEach((filter) => {
				const filterButton = document.createElement("button");
				filterButton.textContent = filter;
				filterButton.classList.add("filter-button");

				const removeIcon = document.createElement("i");
				removeIcon.classList.add("material-symbols-outlined");
				removeIcon.textContent = "close";

				filterButton.appendChild(removeIcon);

				filterButton.addEventListener("click", function () {
					// Remove the filter when the button is clicked
					removeFilter(category, filter);
				});
				selectedFiltersSection.appendChild(filterButton);
			});
		}
	}
}

function removeFilter(category, filter) {
	// Uncheck the corresponding checkbox
	const checkbox = document.querySelector(
		`input[name='${category}'][data-tag='${filter}']`
	);
	if (checkbox) {
		checkbox.checked = false;
	}

	// Trigger the apply filters event to reapply filters without the removed one
	const applyFiltersButton = document.getElementById("applyfilters");
	applyFiltersButton.click();
}

function renderFilteredData(data) {
	const blogGrid = document.getElementById("blogGrid");
	blogGrid.innerHTML = ""; // Clear existing content

	data.forEach((metadata) => {
		const article = document.createElement("article");
		article.classList.add("blog-item");

		const link = document.createElement("a");
		link.setAttribute("href", `/posts/${metadata.lecturerUrl}`);
		link.classList.add("readblog");

		const divImage = document.createElement("div");
		divImage.style.backgroundImage = `url('../images/${metadata.image}')`;

		const icon = document.createElement("i");
		icon.classList.add("material-symbols-outlined");
		icon.textContent = "arrow_outward";

		divImage.appendChild(icon);

		const divInfo = document.createElement("div");
		divInfo.classList.add("card-info");

		const h5 = document.createElement("h5");
		h5.textContent = `On ${metadata.date}`;

		const h3 = document.createElement("h3");
		h3.textContent = metadata.name;

		const p = document.createElement("p");
		p.textContent = metadata.description;

		divInfo.appendChild(h5);
		divInfo.appendChild(h3);
		divInfo.appendChild(p);

		const h4 = document.createElement("h4");
		h4.setAttribute("id", "tagcontainer");

		metadata.tags.forEach((tag) => {
			const span = document.createElement("span");
			span.textContent = tag;
			h4.appendChild(span);
		});

		link.appendChild(divImage);
		link.appendChild(divInfo);
		link.appendChild(h4);

		article.appendChild(link);

		blogGrid.appendChild(article);
	});
}

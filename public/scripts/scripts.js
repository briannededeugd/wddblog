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
		sortButton,
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

function renderSelectedFilters() {
	// Gather selected filter options
	const selectedTags = getSelectedOptions("tags");
	const selectedLikelyToUse = getSelectedOptions("likelytouse");
	const selectedImpact = getSelectedOptions("impact");
	const selectedInspiration = getSelectedOptions("inspiration");

	const filters = {
		tags: selectedTags,
		likelytouse: selectedLikelyToUse,
		impact: selectedImpact,
		inspiration: selectedInspiration,
	};

	const selectedFiltersSection = document.querySelector(".selectedfilters");
	selectedFiltersSection.innerHTML = ""; // Clear existing content

	// Check if any filters are selected
	let anyFilterSelected = false;

	// Iterate over each category of filters
	for (const category in filters) {
		const categoryFilters = filters[category];
		if (categoryFilters.length > 0) {
			// Set flag to indicate that at least one filter is selected
			anyFilterSelected = true;

			// Create the heading "Selected Filters:" only if it's not already created
			if (!selectedFiltersSection.querySelector("h3")) {
				const selectedIndicator = document.createElement("h3");
				selectedIndicator.textContent = "Selected filters: ";
				selectedFiltersSection.appendChild(selectedIndicator);
			}

			// Create filter buttons for each selected filter
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

	// If no filters are selected, remove the heading "Selected Filters:"
	if (!anyFilterSelected) {
		const selectedIndicator = selectedFiltersSection.querySelector("h3");
		if (selectedIndicator) {
			selectedIndicator.remove();
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

	applyFiltersAndSort();
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

// Add event listeners for radio buttons (sorting) and checkboxes (filtering)
document
	.querySelectorAll(
		"input[name='inspiration'], input[name='tags'], input[name='likelytouse'], input[name='impact'], input[name='sort']"
	)
	.forEach((input) => {
		input.addEventListener("change", applyFiltersAndSort);
	});

function applyFiltersAndSort() {
	// Gather selected filter options
	const selectedTags = getSelectedOptions("tags");
	const selectedLikelyToUse = getSelectedOptions("likelytouse");
	const selectedImpact = getSelectedOptions("impact");
	const selectedInspiration = getSelectedOptions("inspiration");
	const sortType = getSelectedSortType();

	// Send an AJAX request to apply filters and sort
	fetch("/applyFiltersAndSort", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			tags: selectedTags,
			likelytouse: selectedLikelyToUse,
			impact: selectedImpact,
			inspiration: selectedInspiration,
			sortType: sortType,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			// Update the content on the page with the filtered and sorted data
			renderFilteredData(data);
			renderSelectedFilters();
		})
		.catch((error) => {
			console.error("Error applying filters and sort:", error);
		});
}

function getSelectedOptions(name) {
	return Array.from(
		document.querySelectorAll(`input[name='${name}']:checked`)
	).map((input) => input.dataset.tag);
}

function getSelectedSortType() {
	const selectedSortRadio = document.querySelector(
		"input[name='sort']:checked"
	);
	return selectedSortRadio ? selectedSortRadio.dataset.tag : "Newest first";
}

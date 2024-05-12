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
		const intro = document.querySelector(".introduction");
		window.scrollBy(0, intro.clientHeight);
	});
}

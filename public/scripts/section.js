console.log("Section added!");

document.getElementById("nextsection").addEventListener("click", () => {
	const section = document.getElementById("css");
	window.scrollBy(0, section.clientHeight);
});

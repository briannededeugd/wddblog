/**================================================================================================
 * ?                                           ABOUT
 * @author         :  Brianne de Deugd
 * @email          :  brianne@live.nl
 * @repo           :  wddblog
 * @createdOn      :  February 15th, 2024
 * @description    :  This is my blog for the minor Web Design & Development (and beyond...)
 *================================================================================================**/

const helmet = require("helmet");
const marked = require("marked");
const fs = require("fs");
const { format } = require("date-fns");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable ETags
app.set("etag", false);

const path = require("path");

app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"], // Default rule for all sources
			imgSrc: ["'self'", "https://wddblog.vercel.app"], // Allows images from the domain
			scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
		},
	})
);

/**========================================================================
 *                           TEMPLATING ENGINE
 *========================================================================**/

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

/**========================================================================
 *                           ROUTING
 *========================================================================**/

/**----------------------
 *       Homepage
 *------------------------**/

let blogMetadata = [];

// Server-side routing
app.get("/", (req, res) => {
	const metadataDir = path.join(__dirname, "metadata");

	fs.readdir(metadataDir, (err, files) => {
		if (err) {
			return res.status(500).send("Error reading metadata directory");
		}

		const blogMetadata = [];

		files.forEach((file) => {
			const metadataPath = path.join(metadataDir, file);
			const metadataJSON = fs.readFileSync(metadataPath, "utf8");
			const metadata = JSON.parse(metadataJSON);

			// Keep original date for sorting
			metadata.originalDate = new Date(metadata.date);

			// Format the date for display
			metadata.date = format(metadata.originalDate, "MMMM do, yyyy");

			blogMetadata.push(metadata);
		});

		// Sort blogMetadata array based on the "originalDate" field
		blogMetadata.sort((a, b) => b.originalDate - a.originalDate);

		let blogAmount = files.length;

		// Slice the array to get the first three elements
		const recentBlogs = blogMetadata.slice(0, 3);

		res.render("index", { blogMetadata: recentBlogs, blogAmount });
	});
});
/**----------------------
 *    Blogs
 *------------------------**/

app.get("/posts/:postName", (req, res) => {
	const postName = req.params.postName;
	const filePath = path.join(__dirname, "posts", `${postName}.md`);
	const metadataPath = path.join(__dirname, "metadata", `${postName}.json`);

	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			// If the Markdown file is not found, send a 404 response;
			return res.status(404).send("Post not found");
		}

		// Convert the Markdown to HTML
		const blogContent = marked.parse(data);

		// Read and parse the JSON metadata
		fs.readFile(metadataPath, "utf8", (err, metadataJSON) => {
			if (err) {
				// If the metadata file is not found, handle the error
				return res.status(404).send("Metadata not found");
			}

			// Parse the JSON string into an object
			const metadata = JSON.parse(metadataJSON);

			// Format the date
			const formattedDate = format(new Date(metadata.date), "MMMM do, yyyy");
			metadata.date = formattedDate;

			// Read all metadata files to find related posts
			const metadataDir = path.join(__dirname, "metadata");
			let blogMetadata = [];

			fs.readdir(metadataDir, (err, files) => {
				if (err) {
					return res.status(500).send("Error reading metadata directory");
				}

				files.forEach((file) => {
					const metadataPath = path.join(metadataDir, file);
					const metadataJSON = fs.readFileSync(metadataPath, "utf8");
					const fileMetadata = JSON.parse(metadataJSON);

					if (file !== `${postName}.json`) {
						blogMetadata.push(fileMetadata);
					}
				});

				// Find blogs with matching tags
				const matchingBlogs = blogMetadata.filter((fileMetadata) => {
					if (metadata.tags && fileMetadata.tags) {
						return metadata.tags.some((tag) => fileMetadata.tags.includes(tag));
					}
					return false;
				});

				// Select up to three matching blogs
				const relatedBlogs = matchingBlogs.slice(0, 3);

				// Render the EJS template with the blog content, metadata, and related blogs
				res.render("pages/blogpost", {
					blogContent,
					lecturerName: metadata.name,
					blogDate: metadata.date,
					week: metadata.week,
					tags: metadata.tags,
					lecturerUrl: metadata.lecturerUrl,
					description: metadata.description,
					futureUse: metadata.howLikelyToUse,
					projectImpact: metadata.impactOnCurrentProjects,
					inspirationLevel: metadata.inspirationLevel,
					integration: metadata.integration,
					opinions: metadata.opinions,
					relatedBlogs, // Pass the related blogs to the template
				});
			});
		});
	});
});

app.get("/randomblog", (req, res) => {
	let postName;
	const allPosts = [
		"fennadewilde",
		"hackathon",
		"jeremykeith",
		"kilianvalkhof",
		"nilsbinder",
		"rosaschuurman",
		"juliamiocene",
		"vasilisvangemert",
		"mariekedehoop",
		"robertspier",
		"bramus",
		"dewaag",
		"q42",
		"miriamsuzanne",
	];

	function randomPost(allPosts) {
		postName = allPosts[Math.floor(Math.random() * allPosts.length)];
	}

	randomPost(allPosts);

	const filePath = path.join(__dirname, "posts", `${postName}.md`);
	const metadataPath = path.join(__dirname, "metadata", `${postName}.json`);

	// Read all metadata files to find related posts
	const metadataDir = path.join(__dirname, "metadata");
	let blogMetadata = [];

	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			// If the Markdown file is not found, send a 404 response
			return res.status(404).send("Post not found");
		}

		// Convert the Markdown to HTML
		const blogContent = marked.parse(data);

		// Read and parse the JSON metadata
		fs.readFile(metadataPath, "utf8", (err, metadataJSON) => {
			if (err) {
				// If the metadata file is not found, handle the error
				return res.status(404).send("Metadata not found");
			}

			// Parse the JSON string into an object
			const metadata = JSON.parse(metadataJSON);
			// Format the date
			const formattedDate = format(new Date(metadata.date), "MMMM do, yyyy");
			metadata.date = formattedDate;

			fs.readdir(metadataDir, (err, files) => {
				if (err) {
					return res.status(500).send("Error reading metadata directory");
				}

				files.forEach((file) => {
					const metadataPath = path.join(metadataDir, file);
					const metadataJSON = fs.readFileSync(metadataPath, "utf8");
					const fileMetadata = JSON.parse(metadataJSON);

					if (file !== `${postName}.json`) {
						blogMetadata.push(fileMetadata);
					}
				});

				// Find blogs with matching tags
				const matchingBlogs = blogMetadata.filter((fileMetadata) => {
					if (metadata.tags && fileMetadata.tags) {
						return metadata.tags.some((tag) => fileMetadata.tags.includes(tag));
					}
					return false;
				});

				// Select up to three matching blogs
				const relatedBlogs = matchingBlogs.slice(0, 3);

				// Render the EJS template with the blog content, metadata, and related blogs
				res.render("pages/blogpost", {
					blogContent,
					lecturerName: metadata.name,
					blogDate: metadata.date,
					week: metadata.week,
					tags: metadata.tags,
					lecturerUrl: metadata.lecturerUrl,
					description: metadata.description,
					futureUse: metadata.howLikelyToUse,
					projectImpact: metadata.impactOnCurrentProjects,
					inspirationLevel: metadata.inspirationLevel,
					integration: metadata.integration,
					opinions: metadata.opinions,
					relatedBlogs, // Pass the related blogs to the template
				});
			});
		});
	});
});

/**----------------------
 *    Weekly Nerd Page
 *------------------------**/
app.get("/weeklynerd", (req, res) => {
	const metadataDir = path.join(__dirname, "metadata");
	blogMetadata = [];

	fs.readdir(metadataDir, (err, files) => {
		if (err) {
			return res.status(500).send("Error reading metadata directory");
		}

		files.forEach((file) => {
			const metadataPath = path.join(metadataDir, file);
			const metadataJSON = fs.readFileSync(metadataPath, "utf8");
			const metadata = JSON.parse(metadataJSON);

			// Keep original date for sorting
			metadata.originalDate = new Date(metadata.date);

			// Format the date
			const formattedDate = format(new Date(metadata.date), "MMMM do, yyyy");
			metadata.date = formattedDate;

			blogMetadata.push(metadata);
		});

		// Filter blog posts based on query parameters
		const filteredMetadata = blogMetadata.filter((metadata) => {
			let include = true;
			if (req.query.tags && metadata.tags) {
				const selectedTags = req.query.tags.split(",");
				include = selectedTags.every((tag) => metadata.tags.includes(tag));
			}
			if (req.query.likelytouse && metadata.howLikelyToUse) {
				const selectedLikelyToUse = req.query.likelytouse.split(",");
				include =
					include && selectedLikelyToUse.includes(metadata.howLikelyToUse);
			}
			if (req.query.impact && metadata.impactOnCurrentProjects) {
				const selectedImpact = req.query.impact.split(",");
				include =
					include && selectedImpact.includes(metadata.impactOnCurrentProjects);
			}
			if (req.query.inspiration && metadata.inspirationLevel) {
				const selectedInspiration = req.query.inspiration.split(",");
				include =
					include && selectedInspiration.includes(metadata.inspirationLevel);
			}
			return include;
		});

		// Sort filteredMetadata array by date in descending order (most recent first)
		filteredMetadata.sort(
			(a, b) => new Date(b.originalDate) - new Date(a.originalDate)
		);

		res.render("pages/weeklynerd", { blogMetadata: filteredMetadata });
	});
});

app.post("/applyFiltersAndSort", (req, res) => {
	const { tags, likelytouse, impact, inspiration, sortType } = req.body;

	// Apply filters
	let filteredMetadata = blogMetadata.filter((metadata) => {
		return (
			(!tags.length || tags.some((tag) => metadata.tags.includes(tag))) &&
			(!likelytouse.length || likelytouse.includes(metadata.howLikelyToUse)) &&
			(!impact.length || impact.includes(metadata.impactOnCurrentProjects)) &&
			(!inspiration.length || inspiration.includes(metadata.inspirationLevel))
		);
	});

	// Apply sorting to filtered metadata
	switch (sortType) {
		case "Newest first":
			filteredMetadata.sort(
				(a, b) => new Date(b.originalDate) - new Date(a.originalDate)
			);
			break;
		case "Oldest first":
			filteredMetadata.sort(
				(a, b) => new Date(a.originalDate) - new Date(b.originalDate)
			);
			break;
		case "A-Z":
			filteredMetadata.sort((a, b) => a.name.localeCompare(b.name));
			break;
		default:
			// Default to sorting by newest first
			filteredMetadata.sort(
				(a, b) => new Date(b.originalDate) - new Date(a.originalDate)
			);
	}

	res.json(filteredMetadata);
});

/**----------------------
 *    Goals and Plans
 *------------------------**/

app.get("/goalsplans", (req, res) => {
	res.render("pages/goalsplans");
});

/**----------------------
 *    About Me
 *------------------------**/
app.get("/aboutme", (req, res) => {
	res.render("pages/aboutme");
});

/**-----------------------
 *        Arcade
 *---------------------**/
app.get("/arcade", (req, res) => {
	res.render("pages/arcade");
});

/**-----------------------
 *        Memory
 *---------------------**/
app.get("/memory", (req, res) => {
	const metadataDir = path.join(__dirname, "metadata");
	let blogMetadata = [];

	fs.readdir(metadataDir, (err, files) => {
		if (err) {
			return res.status(500).send("Error reading metadata directory");
		}

		files.forEach((file) => {
			const metadataPath = path.join(metadataDir, file);
			const metadataJSON = fs.readFileSync(metadataPath, "utf8");
			const metadata = JSON.parse(metadataJSON);

			blogMetadata.push(metadata);
		});

		// Select 8 random blogs
		const randomBlogs = getRandomBlogs(blogMetadata, 8);
		// Duplicate each selected blog to ensure it appears twice
		const memoryCards = [...randomBlogs, ...randomBlogs];
		// Shuffle the memory cards
		shuffleArray(memoryCards);

		res.render("pages/memory", { memoryCards: JSON.stringify(memoryCards) });
	});
});

// Function to select random blogs
function getRandomBlogs(blogMetadata, num) {
	const randomIndexes = [];
	const randomBlogs = [];

	// Generate unique random indexes
	while (randomIndexes.length < num) {
		const randomIndex = Math.floor(Math.random() * blogMetadata.length);
		if (!randomIndexes.includes(randomIndex)) {
			randomIndexes.push(randomIndex);
		}
	}

	// Select blogs based on random indexes
	randomIndexes.forEach((index) => {
		randomBlogs.push(blogMetadata[index]);
	});

	return randomBlogs;
}

// Function to shuffle an array
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

/**========================================================================
 *                           404 Error Handler
 *========================================================================**/

app.use((req, res) => {
	res
		.status(404)
		.send("I'm sorry, I was not able to find the page you were looking for");
});

/**========================================================================
 *                           START WEBSERVER
 *========================================================================**/
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

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
			blogMetadata.push(metadata);
		});

		// Sort blogMetadata array based on the "date" field
		blogMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));

		// Slice the array to get the first three elements
		const recentBlogs = blogMetadata.slice(0, 3);

		res.render("index", { blogMetadata: recentBlogs });
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

			// Render the EJS template with the blog content and metadata
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
	];

	function randomPost(allPosts) {
		postName = allPosts[Math.floor(Math.random() * allPosts.length)];
	}

	randomPost(allPosts);

	const filePath = path.join(__dirname, "posts", `${postName}.md`);
	const metadataPath = path.join(__dirname, "metadata", `${postName}.json`);

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

			// Render the EJS template with the blog content and metadata
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
		filteredMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));

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
			filteredMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));
			break;
		case "Oldest first":
			filteredMetadata.sort((a, b) => new Date(a.date) - new Date(b.date));
			break;
		case "A-Z":
			filteredMetadata.sort((a, b) => a.name.localeCompare(b.name));
			break;
		default:
			// Default to sorting by newest first
			filteredMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));
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

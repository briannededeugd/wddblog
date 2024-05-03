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
app.get("/", (req, res) => {
	const metadataDir = path.join(__dirname, "metadata");

	fs.readdir(metadataDir, (err, files) => {
		if (err) {
			return res.status(500).send("Error reading metadata directory");
		}

		const blogMetadata = []; // Define blogMetadata array here

		files.forEach((file) => {
			const metadataPath = path.join(metadataDir, file);
			const metadataJSON = fs.readFileSync(metadataPath, "utf8");
			const metadata = JSON.parse(metadataJSON);
			blogMetadata.push(metadata); // Populate blogMetadata array
		});

		// Sort blogMetadata array by date in descending order (most recent first)
		blogMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));

		res.render("index", { blogMetadata });
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

	fs.readdir(metadataDir, (err, files) => {
		if (err) {
			return res.status(500).send("Error reading metadata directory");
		}

		const blogMetadata = []; // Define blogMetadata array here

		files.forEach((file) => {
			const metadataPath = path.join(metadataDir, file);
			const metadataJSON = fs.readFileSync(metadataPath, "utf8");
			const metadata = JSON.parse(metadataJSON);
			blogMetadata.push(metadata); // Populate blogMetadata array
		});

		res.render("pages/weeklynerd", { blogMetadata });
	});
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

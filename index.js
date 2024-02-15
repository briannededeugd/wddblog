/**================================================================================================
 * ?                                           ABOUT
 * @author         :  Brianne de Deugd
 * @email          :  brianne@live.nl
 * @repo           :  wddblog
 * @createdOn      :  February 15th, 2024
 * @description    :  This is my blog for the minor Web Design & Development (and beyond...)
 *================================================================================================**/

const helmet = require("helmet");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("etag");

app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"], // Default rule for all sources
			imgSrc: ["'self'", "https://wddblog.vercel.app"], // Allows images from the domain
		},
	})
);

/**========================================================================
 *                           TEMPLATING ENGINE
 *========================================================================**/

app.set("views", "views");
app.set("view engine", "ejs");

/**========================================================================
 *                           ROUTING
 *========================================================================**/

/**----------------------
 *       Homepage
 *------------------------**/
app.get("/", async (req, res) => {
	res.render("index");
});

app.get("/kilianvalkhof", (req, res) => {
	res.render("pages/kilianvalkhof");
});

app.get("/test", async (req, res) => {
	res.render("pages/test");
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

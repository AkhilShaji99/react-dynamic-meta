const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { getPostById } = require("./server/stub/posts");
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, "./build", "index.html");

// static resources should just be served as they are
app.use(express.static(path.resolve(__dirname, "./build"), { maxAge: "30d" }));

// here we serve the index.html page
app.get("/*", (req, res, next) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }
    // get post info
    const postId = req.query.id;
    // const post = getPostById(postId);
    // if (!post) return res.status(404).send("Post not found");
    //API Call
    console.log("loadeddd");
    axios
      .get(postId==1 ? "https://coral-ecom.cloud6.ae/coral-api/get_meta_data/home" : "https://coral-ecom.cloud6.ae/coral-api/get_meta_data/about")
      .then((response) => {
        htmlData = htmlData
          .replace("<title>React App</title>", `<title>${response.data.meta_data.title}</title>`)
          .replace("__META_OG_TITLE__", response.data.meta_data.og_title)
          .replace("__META_OG_DESCRIPTION__", response.data.meta_data.og_description)
          .replace("__META_DESCRIPTION__", response.data.meta_data.meta_description)
          .replace("__META_OG_IMAGE__", response.data.meta_data.og_image);
        return res.send(htmlData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    //#End of API Call
    // inject meta tags
    // logToFile('Custom log message');
    
    // return res.send('<h1>Hiii</h1>')
  });
});

function logToFile(message) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFile(path.join(__dirname, "access.log"), logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});

import express from "express";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath
import { createUrl, findUrls, getUrl } from "./controllers/url.controllers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// server settings
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware
app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "ejs");
app.use("/styles", express.static(path.join(__dirname, "../frontend/styles")));

// EndPoints
app.get("/", findUrls);
app.post("/shortUrls", createUrl);
app.get("/:shortUrl", getUrl);

export default app;

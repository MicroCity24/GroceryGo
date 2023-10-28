import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import connectToMongoDB from "./start/db.js";
import routes from "./start/routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
connectToMongoDB();

routes(app);

app.use(express.static("static"));
app.use(
  "/pages",
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "static/pages")
  )
);
app.use(
  "/css",
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "static/css")
  )
);
app.use(
  "/img",
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "static/img")
  )
);
app.use(
  "/js",
  express.static(
    path.join(path.dirname(new URL(import.meta.url).pathname), "static/js")
  )
);

app.listen(PORT, () => console.log("api running..."));

app.get("/", (req, res) => res.json("here is the get route"));

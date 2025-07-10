import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import App from "../src/App";
import { fetchError } from "./utils/fetchError";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", async (req, res) => {
  fs.readFile(path.resolve("./index.html"), "utf8", async (err, data) => {
    if (err) {
      return res.status(500).send("An error occurred");
    }

    try {
      const fetchTodos = await fetch("https://jsonplaceholder.typicode.com/todoqqs");



      if (!fetchTodos.ok) {
        throw new fetchError(fetchTodos.statusText, fetchTodos.status, fetchTodos.url);
      }

      const todos = await fetchTodos.json();

      return res.send(data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToStaticMarkup(<App todos={todos} />)}</div>`
      ));

    } catch (error) {
      console.error("Erreur lors du fetch des todos :", error);
      return res.status(500).send("Une erreur est survenue lors de la récupération des todos");
    }

  });
});

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})

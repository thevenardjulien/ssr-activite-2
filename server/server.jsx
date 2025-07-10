import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import App from "../src/App";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", async (req, res) => {
  fs.readFile(path.resolve("./index.html"), "utf8", async (err, data) => {
    if (err) {
      return res.status(500).send("An error occurred");
    }

    const fetchTodos = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await fetchTodos.json();

    return res.send(data.replace(
      '<div id="root"></div>',
      `<div id="root">${ReactDOMServer.renderToStaticMarkup(<App todos={todos} />)}</div>
      <script>
        window.TODOS = ${JSON.stringify(todos)}
      </script>`
    ));
  });
});

app.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
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

    try {
      const fetchTodos = await fetch(
        "https://jsonplaceholder.typicode.com/todosss"
      );

      if (!fetchTodos.ok) {
        throw new Error(
          `Une erreur est survenue lors de la récupération des todos : ${fetchTodos.status} ${fetchTodos.statusText}`
        );
      }

      const todos = await fetchTodos.json();

      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            <App todos={todos} />
          )}</div>
          <script>
            window.__INITIAL__DATA__ = ${JSON.stringify(todos)};
          </script>
          `
        )
      );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(`${error}`);
    }
  });
});

app.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

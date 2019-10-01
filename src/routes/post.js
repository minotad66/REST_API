"use strict";
let fs = require("fs");

module.exports = function(app) {
  app.get("/posts", (req, res, next) => {
    return res.status(200).json(posts);
  });

  app.post("/posts", (req, res, next) => {
    const { body } = req;
    body.id = posts.length + 1;
    posts.push(body);
    console.log(posts);
    return res.status(201).json(body);
  });

  app.get("/posts/:id", (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json("Invalid param");
    }
    const post = posts.find(element => element.id === parseInt(id, 10));
    if (post) {
      return res.status(200).json(post);
    }
    return res.status(404).json("Not found");
  });

  app.delete("/posts/:id", (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json("Invalid param");
    }
    const copy = [...posts];
    posts = posts.filter(element => element.id !== parseInt(id, 10));
    if (copy.length > posts.length) {
      return res.status(200).json(posts);
    }
    return res.status(404).json("Not found");
  });

  app.put("/posts/:id", (req, res, next) => {
    const { id } = req.params;
    const { autor, body } = req.body;
    if (isNaN(id)) {
      return res.status(400).json("Invalid param");
    }
    let post = posts.map(element => {
      if (element.id === parseInt(id, 10)) {
        element.autor = autor;
        element.body = body;
      }
      return element;
    });
    return res.status(200).json(posts);
  });
};

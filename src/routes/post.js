"use strict";

const fs = require("fs");
const posts = require(__dirname + "/posts.json");

module.exports = function(app) {
  app.get("/posts", (req, res, next) => {
    res.sendFile(__dirname + "/posts.json");
  });

  app.post("/posts", (req, res, next) => {
    const { body } = req;
    body.id = posts.length + 1;
    fs.readFile(__dirname + "/posts.json", function(error, file) {
      let parsedFile = JSON.parse(file);
      parsedFile = req.body;
      posts.push(parsedFile);
      let data = JSON.stringify(posts);
      fs.writeFile(__dirname + "/posts.json", data, error => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    });
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
    fs.readFile(__dirname + "/posts.json", function(error, file) {
      let parsedFile = JSON.parse(file);
      parsedFile = parsedFile.filter(element => element.id !== parseInt(id, 10));
      let data = JSON.stringify(parsedFile);
      const copy = [...posts];
      fs.writeFile(__dirname + "/posts.json", data, error => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
      if (copy.length > parsedFile.length) {
        return res.status(200).json(parsedFile);
      }
      return res.status(404).json("Not found");
    });
  });

  app.put("/posts/:id", (req, res, next) => {
    const { id } = req.params;
    const { autor, body } = req.body;
    if (isNaN(id)) {
      return res.status(400).json("Invalid param");
    }
    fs.readFile(__dirname + "/posts.json", function(error, file) {
      let parsedFile = JSON.parse(file);
      parsedFile = parsedFile.map(element => {
        if(element.id === parseInt(id, 10)){
          element.autor = autor;
          element.body = body;
          return element;
        }
        else{
          return element;
        }
      });
      console.log(parsedFile);
      let data = JSON.stringify(parsedFile);
      fs.writeFile(__dirname + "/posts.json", data, error => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
      return res.status(200).json(parsedFile);
    });
  });
};

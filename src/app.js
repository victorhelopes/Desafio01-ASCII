const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {
    title,
    url,
    techs
  } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes : 0
  }

  repositories.push(repository);

  response.status(201).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id;

  if(!isUuid(id)){
    response.status(400).send();
  }

  const {
    title,
    url,
    techs
  } = request.body;

  const repository = repositories.find(repo => repo.id === id);

  if(repository){
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    response.status(200).json(repository)
  }

  response.status(400).send();
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id;

  if(!isUuid(id)){
    response.status(400).send();
  }

  const repository = repositories.pop(repo => repo.id === id);
  if(repository){
    response.status(204).json(repository);
  }

  response.status(400).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id;

  if(!isUuid(id)){
    response.status(400).send();
  }

  const repository = repositories.find(repo => repo.id === id);

  if(repository){
    repository.likes++;
    response.status(201).json(repository)
  }

  response.status(400).send();
});

module.exports = app;

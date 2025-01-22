# Fastify Demo API

## Description

This is a small fastify application that provides a REST API with a very simple CRUD

## Architecture

The architecture is based on the clean architecture (just folders, no packages) and solid principles, you can follow the following design patterns:

- **Dependency Injection**
- **Interface**
- **Repository**
- **Plugins**

## Prerequisites

You need to have a local mongo database setup and launched before running the projet
The name of the Database must be **fastify-tutorial** and the collection inside must be named **items**
Here is a sample of data you can add:

```json:
[{
  "_id": {
    "$oid": "6787cdeabd401939ac023fcc"
  },
  "name": "Bob"
},
{
  "_id": {
    "$oid": "6787cdf5bd401939ac023fce"
  },
  "name": "Dylan"
},
{
  "_id": {
    "$oid": "6787f6cd0b469e34a7924eb0"
  },
  "name": "Barbara",
  "__v": 0
},
{
  "_id": {
    "$oid": "6787f8f636a3da553a4c6397"
  },
  "name": "Samantha",
  "__v": 0
}]
```


## Useful Commands

- ### npm install (to install the dependencies)
- ### npm start (to start the server)
- ### npm run dev (to start the server in dev mode)

Enjoy :)

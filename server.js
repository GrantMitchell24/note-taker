const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

let database = require("./db/db.json")

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlendcoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);



/*
  Any time you neded to access the data:
    do fs.readFile then use JSON.parse()

  =====  working w/ real data ========

  Anytime you need to update the file:
    stringify the data first 
    them use fs.writeFile()

*/


app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get("/api/notes", (req, res) => {
  res.json(database)
})

app.post("/api/notes", (req, res) => {
  let noteModel ={
    title: req.body.title,
    text:req.body.text,
    id: uuidv4() // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
  }
  
  database.push(noteModel)

  fs.writeFileSync("./db/db.json", JSON.stringify(database))

  res.json(database)
})

app.get('feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
  );
  


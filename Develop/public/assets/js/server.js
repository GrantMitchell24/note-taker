const express = require('express');
const path = require('path');
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

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get("/api/notes", (req, res) => {
  res.json(database)
})

app.post("/api/notes", (req, res) => {
  let noteMOdel= {
    title: req.body.title,
    text: req.body.text
  }

  database.push(noteModel)

  fs.writeFileSync("./db/db.json", JSON.stringify(database))

  res.json(database)
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
  );
  


const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

morgan.token("body", function getBody(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
function createId() {
  return Math.floor(Math.random() * Math.floor(1000000));
}

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "040-123456",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "040-123456",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "040-123456",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id.toString() === id);
  if (person) res.json(person);
  else res.status(404).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }
  if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: createId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/info", (req, res) => {
  res.send(
    `<div>` +
      `phonebook has info for ${persons.length} people` +
      `<p>${Date()}</p>` +
      `</div>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

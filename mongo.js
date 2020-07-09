if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const mongoose = require("mongoose");
const url = `mongodb+srv://fso:${password}@fsocluster.ntkwi.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => console.log(person));
    mongoose.connection.close();
  });
} else if (process.argv.length == 5) {
  const person_name = process.argv[3];
  const person_number = process.argv[4];

  const person = new Person({
    content: person_name,
    number: person_number,
  });

  person.save().then((result) => {
    console.log(`added ${person_name} number ${person_number} to phonebook`);
    mongoose.connection.close();
  });
}

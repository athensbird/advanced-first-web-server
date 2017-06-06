// Your server code here...
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import countryModel from './models/CountryModel';

// Create database connection

const App = express();

App.use(bodyParser.json());

mongoose.connect('mongodb://localhost/countries');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('MongoDB Connected!');
});

// App.use((req, res, next) => {
//   console.log('Keine Ahnung!');
//   next();
// });

App.get('/falseRoute', (req, res, next) => {
  console.log('Falsch!');
  const error = new Error('Das ist mein erster Fehler');
  return next(error);
});

const PORT = 4000;

// const countries = [
//   {
//     "id": 1,
//     "name": "United Kingdom",
//     "capital": "London",
//     "food": "Fish & Chips"
//   },
//   {
//     "id": 2,
//     "name": "France",
//     "capital": "Paris",
//     "food": "Foie gras"
//   },
//   {
//     "id": 3,
//     "name": "Germany",
//     "capital": "Berlin",
//     "food": "Schnitzel"
//   },
//   {
//     "id": 4,
//     "name": "Italy",
//     "capital": "Rome",
//     "food": "Gelato"
//   }
// ];

App.listen(PORT, (err) => {
  return err;
});

// middleware is just the defined function in this case
// eslint-disable-next-line
App.use((err, req, res, next) => {
  console.log('Error Middleware', err);
  return res.status(500).json({message: err.message});
});

App.get('/countries', (request, response, next) => {
  countryModel.find({}).exec()
    .then((data) => {
      return response.json(data);
    })
    .catch((err) => {
      return next(err);
    });
});

App.get('/countries/:id', (req, res) => {
  countryModel.findById(req.params.id).exec()
    .then((country) => {
      return res.json(country);
    })
    .catch((err) => {
      return console.log(`Error: ${err}`);
    });
});


App.delete('/countries/:id', (req, res) => {
  countryModel.findByIdAndRemove(req.params.id).exec()
    .then(() => {
      return res.json('Delete successful!');
    })
    .catch((err) => {
      return console.log(`Error: ${err}`);
    });
});

App.put('/countries/:id', (req, res, next) => {
  countryModel.findById(req.params.id).exec()
    .then((country) => {
      country.name = req.body.name || country.name;
      country.capital = req.body.capital || country.capital;
      country.food = req.body.food || country.food;

      return country.save();
    })
    .then((country) => {
      return res.json(country);
    })
    .catch((err) => {
      return next(err);
    });
});

App.get('/wiegehts', (request, response) => {
  return response.json({
    Deutsche: 'gut'
  });
});

App.post('/wiegehts', (request, response) => {
  return response.json({
    wiegehts: 'sehr gut'
  });
});

// App.get('/countries/:id', (request, response) => {
//   const targetedCountry = countries.find((country) => {
//     return String(country.id) === request.params.id;
//   });
//   return response.json(targetedCountry || null);
// });

App.post('/countries', (request, response) => {
  const country = new countryModel(request.body);
  console.log(request.body);
  country.save()
    .then(savedCountry => {
      console.log('Country was saved!');
      return response.json(savedCountry);
    })
    .catch((err) => {
      console.log('Error encounted');
      return response.json(err);
    });
  // console.log(request.body);
  // const country = {
  //   id: countries.length + 1,
  //   name: 'Spain',
  //   ...request.body
  // };
  // countries.push(country);
  // return response.json(countries);
});

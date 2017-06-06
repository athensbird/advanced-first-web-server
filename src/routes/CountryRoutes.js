import express from 'express';
const router = express.Router();

router.get('/countries', (req, res) => {
  return res.json([
    {
      id: 1,
      name: 'United Kingdom',
      capital: 'London',
      food: 'Fish & Chips'
    },
    {
      id: 2,
      name: 'France',
      capital: 'Paris',
      food: 'Foie gras'
    },
    {
      id: 3,
      name: 'Germany',
      capital: 'Berlin',
      food: 'Schnitzel'
    },
    {
      id: 4,
      name: 'Italy',
      capital: 'Rome',
      food: 'Gelato'
    }
  ]);
});

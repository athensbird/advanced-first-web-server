import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  id: {
    // required: true,
    type: Number
  },
  name: {
    // required: true,
    type: String
  },
  capital: {
    // required: true,
    type: String
  },
  food: {
    required: false,
    type: String
  }
});

export default mongoose.model('countryModel', citySchema);

import mongoose from 'mongoose';

import app from './app';

import('dotenv/config');

mongoose.connect('mongodb+srv://kztn:8E6kCCd6auBF5gmt@megahackv32020.4svav.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.listen(process.env.PORT || 3333);

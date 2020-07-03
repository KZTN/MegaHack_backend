import mongoose from 'mongoose';

import app from './app';

import('dotenv/config');

mongoose.connect(process.env.SERVER_TOKEN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.listen(process.env.PORT || 3333);

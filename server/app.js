import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to Politico API',
  });
});

app.listen(3000, () => {
  console.log('App started on port: ' +port);
});

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import officeRouter from './routes/office'

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/offices', officeRouter);

app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to Politico API',
  });
});

app.listen(port, () => {
  console.log('App started on port: ' +port);
});

export default app;

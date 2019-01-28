import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import officeRouter from './routes/office';
import partyRouter from './routes/party';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/offices', officeRouter);
app.use('/api/v1/parties', partyRouter);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to Politico API',
}));

app.listen(port, () => {
  console.log(`App started on port: ${port}`);
});

export default app;

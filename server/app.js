import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import candidateRoute from './routes/candidates';
import officeRouter from './routes/office';
import partyRouter from './routes/party';
import authRoute from './routes/auth';
import voteRouter from './routes/vote';

dotenv.config();
const app = express();
const port = process.env.PORT;

const swaggerDoc = yaml.load(`${process.cwd()}/swagger.yaml`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/v1/', candidateRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/offices', officeRouter);
app.use('/api/v1/parties', partyRouter);
app.use('/api/v1/votes', voteRouter);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to Politico API',
}));

app.listen(port, () => {
  console.log(`App started on port: ${port}`);
});

export default app;

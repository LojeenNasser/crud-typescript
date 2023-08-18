import express from 'express';
import { connect } from 'mongoose';
import config from './config';
import taskRouter from './routes/TaskRoutes';
import userRouter from './routes/UserRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tasks', taskRouter);
app.use('/auth', userRouter);

async function startServer() {
  try {
    await connect(config.mongodbUri);

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error starting server:', error.message);
    } else {
      console.error('An unknown error occurred while starting the server.');
    }
  }
}

startServer();

export default app;

import express from 'express';
import { connectDatabase, getMongoUri } from './config/database';
import { apiRouter } from './routes';

const app = express();
const port = Number(process.env.PORT) || 8000;
const mongoUri = getMongoUri();

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    baseUrl,
    mongoUri,
  });
});

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Backend running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
};

void startServer();

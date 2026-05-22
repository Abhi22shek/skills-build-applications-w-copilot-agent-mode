# OctoFit Tracker Frontend

## Environment variable

Set `VITE_CODESPACE_NAME` in `.env.local` so the frontend can call your Codespaces API URL:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds the API base URL as:

`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

`http://localhost:8000/api`

## Run

```bash
npm install
npm run dev
```

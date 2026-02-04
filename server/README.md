Setup and run the server

1. Copy `.env.example` to `.env` and fill in the values (especially `MONGO_URI` and `JWT_SECRET`).
2. Install dependencies: `npm install`.
3. Start in development: `npm run dev` (requires `nodemon`).
4. Start production: `npm start`.

Required env vars:
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret for signing JWTs
- CLIENT_URL: (optional) allowed client origin
- PORT: Server port (default 5000)

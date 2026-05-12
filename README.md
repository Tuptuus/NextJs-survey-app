# NextJs Survey App

A full-stack survey application built with Next.js 14 and TypeScript. Users can create surveys, collect responses, and view results with visual charts.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Authentication:** Auth.js (GitHub OAuth + credentials)
- **Database:** MongoDB via Prisma ORM
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS + shadcn/ui
- **Containerization:** Docker

## Features

- GitHub OAuth and credentials-based authentication
- Create surveys with multiple question types
- Share surveys via link
- Submit responses as an authenticated user
- View aggregated results with charts

## Live Demo

https://next-js-survey-app.vercel.app/

> **Known issues on the live demo:** Creating new surveys returns a 500 error due to the database connection on the deployed instance. Viewing and responding to existing surveys works correctly, including the results charts. Running the project locally with your own MongoDB instance works fully.

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/Tuptuus/NextJs-survey-app.git
cd NextJs-survey-app
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables — create a `.env` file with the following:

```env
DATABASE_URL=mongodb+srv://...
AUTH_SECRET=your_secret
AUTH_JWT_SECRET=your_jwt_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
AUTH_TRUST_HOST=TRUE
```

4. Push the Prisma schema to your database

```bash
npx prisma db push
```

5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running with Docker

```bash
docker build -t survey-app .
docker run -p 3000:3000 --env-file .env survey-app
```

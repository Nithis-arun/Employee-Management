# Employee Management — Frontend

This repository contains the frontend (React) and backend (Spring Boot) for the Employee Management sample app.

This README focuses on the frontend located at the repository root (React app). It also includes brief notes for starting the backend which lives in `employee-backend/`.

## Contents

- `src/` — React source code
- `public/` — static assets and HTML
- `employee-backend/` — Java Spring Boot backend (separate module)

## Prerequisites

- Node.js (LTS recommended, e.g. 16+)
- npm or yarn
- Java 11+ and Maven to run the backend (if you need the backend locally)

## Setup (frontend)

1. Install dependencies

```bash
cd /path/to/repo
# from repo root
npm install
```

2. Run the development server

```bash
npm start
```

By default the React dev server runs on http://localhost:3000. The frontend expects the backend API to be reachable via an environment variable described below.

3. Build for production

```bash
npm run build
```

The build output will be placed in `build/` or `dist/` depending on project config.

## Environment variables

- `REACT_APP_API_BASE_URL` — base URL for backend API (e.g. `http://localhost:8080/api`)

Create a `.env` file in the repo root or use your environment manager to provide this before running the dev server.

## Backend (brief)

The backend is a Spring Boot app in `employee-backend/`.

To run locally:

```bash
cd employee-backend
./mvnw spring-boot:run
```

The backend default port is usually `8080`. Confirm or change the port in `employee-backend/src/main/resources/application.properties`.

## Recommended .gitignore

The repository already contains a `.gitignore` that excludes `node_modules/`, `.DS_Store`, IDE files and the backend `target/` folder. If you track any IDE files accidentally, remove them and commit the changes.

## Branching and workflow

- Frontend is available on the `frontend` branch (pushed to `origin/frontend`).
- If you want to propose changes, create a feature branch from `frontend` and open a Pull Request into `main` or `frontend` as appropriate.

## Troubleshooting

- If you see CORS issues: ensure backend CORS configuration allows requests from your frontend origin (e.g., `http://localhost:3000`).
- If `node_modules/` is missing after checkout, run `npm install`.

## Contact / Next steps

If you'd like, I can:

- Open a Pull Request from `frontend` into `main`.
- Add a small `README` to the backend module as well.
- Remove accidentally committed IDE files and help clean history if needed.

---

Created and pushed by repository helper on your request.

# FarmConnect

FarmConnect is a bilingual (English and Marathi) full-stack marketplace designed to connect farmers directly with vendors, reduce dependency on middlemen, and improve transparency in crop pricing.

## Live Deployment (Version 2)

- Frontend (Vercel): https://farmconnect-pied.vercel.app/
- Backend API (Render): https://farmconnect-api-cqc0.onrender.com

## Project Overview

The platform includes:

- Live crop-buying listings posted by approved vendors
- Farmer, vendor, and admin role-based flows
- Admin approval workflow for vendor onboarding
- Government scheme reference section
- MSP (Minimum Support Price) information for key crops
- Community forum with likes and comments

## Repository Structure

```text
farmconnect/
  client/    React + Vite frontend
  server/    Node.js + Express + MongoDB backend
```

## Technology Stack

- Frontend: React 18, Vite, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- Development: Nodemon, PostCSS, Autoprefixer

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or Atlas)

## Local Development Setup

### 1. Backend Setup

```bash
cd server
npm install
copy .env.example .env
```

Update `server/.env` with environment-specific values.

Start backend:

```bash
npm run dev
```

Backend runs on `http://localhost:5000` by default.

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Environment Variables

### Backend (`server/.env`)

- `PORT`: API port (default: `5000`)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `NODE_ENV`: environment (`development` or `production`)
- `ADMIN_EMAIL`: seed admin email (used if no admin exists)
- `ADMIN_PASSWORD`: seed admin password (used if no admin exists)

### Frontend (`client/.env`, optional)

- `VITE_API_URL`: API base URL (fallback in source is `https://farmconnect-api-cqc0.onrender.com/api`)

### Frontend (`client/.env.production`)

- `VITE_API_URL=https://farmconnect-api-cqc0.onrender.com/api`

## Available Scripts

### Client

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run preview`: preview production build locally

### Server

- `npm run dev`: start server with nodemon
- `npm start`: start server in standard mode

## Deployment Notes

- Deploy backend from the `server/` folder (for example on Render or similar providers)
- Deploy frontend from the `client/` folder (for example on Vercel or Netlify)
- Set `VITE_API_URL` in frontend deployment environment to your deployed backend API URL ending with `/api`
- Current production API URL: https://farmconnect-api-cqc0.onrender.com/api

## First Release Scope

This version focuses on core marketplace capabilities and role-based workflows, with responsive support for mobile and desktop. Future versions can extend analytics, notifications, and deeper marketplace intelligence.

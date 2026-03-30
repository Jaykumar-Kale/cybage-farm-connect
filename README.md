# FarmConnect

FarmConnect is a full-stack MERN platform that connects farmers directly with verified vendors. The application is bilingual (Marathi and English), supports role-based workflows, and includes marketplace listings, government schemes, MSP reference data, and a community forum.

## Core Features

- Direct farmer-to-vendor crop marketplace
- Vendor approval workflow managed by administrators
- Role-based dashboards for farmer, vendor, and admin users
- Government schemes catalog with application references
- MSP reference module with seasonal filtering
- Community forum for discussion and knowledge sharing
- Marathi and English language toggle

## User Roles

| Role | Access |
|------|--------|
| Farmer | View prices, schemes, MSP, and forum content |
| Vendor | Create and manage crop listings after admin approval |
| Admin | Review vendors, manage platform data, and monitor stats |

## Project Structure

```text
farmconnect/
  client/    React + Vite + Tailwind frontend
  server/    Node.js + Express + MongoDB API
```

## Technology Stack

| Layer | Technology |
|------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Authentication | JWT |
| Localization | Marathi and English |

## Prerequisites

- Node.js 18 or later
- npm
- MongoDB (local instance or MongoDB Atlas)

## Local Setup

### 1) Start the API Server

```bash
cd server
npm install
```

Create a `.env` file in `server` with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/farmconnect
JWT_SECRET=replace_with_a_secure_secret
NODE_ENV=development
ADMIN_EMAIL=admin@farmconnect.in
ADMIN_PASSWORD=Admin@1234
```

Start the server:

```bash
npm run dev
```

### 2) Start the Frontend

```bash
cd client
npm install
```

Create a `.env` file in `client` with:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the client:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Default Admin Account

If admin seeding is enabled in your backend configuration, use:

- Email: `admin@farmconnect.in`
- Password: `Admin@1234`

## Common Development Flow

1. Register a farmer account and verify dashboard access.
2. Register a vendor account and confirm pending state.
3. Sign in as admin and approve the vendor.
4. Sign in as vendor and create crop listings.
5. Validate listing visibility from a farmer account.

## Scripts

### Client

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build

### Server

- `npm run dev` - start API in development mode
- `npm start` - start API in production mode

## API Summary

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Crops

- `GET /api/crops`
- `GET /api/crops/my`
- `POST /api/crops`
- `PUT /api/crops/:id`
- `DELETE /api/crops/:id`

### Admin

- `GET /api/admin/stats`
- `GET /api/admin/vendors`
- `GET /api/admin/farmers`
- `GET /api/admin/crops`
- `PATCH /api/admin/vendors/:id/approve`
- `PATCH /api/admin/vendors/:id/reject`
- `DELETE /api/admin/vendors/:id`

### Public Data

- `GET /api/schemes`
- `GET /api/msp`
- `GET /api/forum`
- `POST /api/forum`
- `GET /api/weather`

## Deployment Notes

The frontend can be deployed to static hosting platforms such as Vercel, and the backend can be deployed on Node.js hosting providers such as Render or a VPS. Ensure production values are set for:

- `MONGO_URI`
- `JWT_SECRET`
- `NODE_ENV`
- `VITE_API_URL`

## Operational Helplines

- Kisan Call Centre: 1800-180-1551
- PM-KISAN Helpline: 155261
- MSP Procurement: 14422

## Government Portals Referenced

- https://pmkisan.gov.in
- https://pmfby.gov.in
- https://enam.gov.in
- https://pmksy.gov.in
- https://soilhealth.dac.gov.in
- https://krishi.maharashtra.gov.in

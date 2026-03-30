# 🌾 FarmConnect — Direct Farmer to Vendor Marketplace

> **"Jai Jawan Jai Kisan"** — Eliminating middlemen, ensuring fair prices, empowering Indian farmers.

A full-stack MERN application connecting farmers directly to verified vendors with government portal-style UI, bilingual (Marathi/English) support, and role-based access control.

---

## 📁 Project Structure

```
FarmConnect/
├── backend/          ← Node.js + Express + MongoDB API
└── frontend/         ← React (Vite) + Tailwind CSS
```

---

## 👤 User Roles

| Role    | Access |
|---------|--------|
| 🌾 **Farmer**  | View live crop buying prices, govt schemes, MSP, forum |
| 🏪 **Vendor**  | Post/edit/delete crop buying prices (after admin approval) |
| 🔐 **Admin**   | Approve/reject vendors, view all data, manage platform |

---

## ⚡ Local Testing Guide (Step-by-Step)

### Prerequisites
- Node.js v18+ → https://nodejs.org
- MongoDB → https://www.mongodb.com/try/download/community (OR use MongoDB Atlas free cloud)
- Git (optional)

---

### Step 1: Setup Backend

```bash
cd FarmConnect/backend

# 1. Install dependencies
npm install

# 2. Create .env file (copy from example)
cp .env.example .env

# 3. Open .env and set your values:
#    MONGO_URI=mongodb://localhost:27017/farmconnect
#    JWT_SECRET=any_random_long_string_here
#    PORT=5000

# 4. Start the backend server
npm run dev
```

✅ You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
✅ Admin seeded: admin@farmconnect.in / Admin@1234
```

Test the API: Open http://localhost:5000 → should show `{"message":"🌾 FarmConnect API Running"}`

---

### Step 2: Setup Frontend

Open a NEW terminal window:

```bash
cd FarmConnect/frontend

# 1. Install dependencies
npm install

# 2. .env is already set to localhost:5000
# (if needed: VITE_API_URL=http://localhost:5000/api)

# 3. Start the frontend
npm run dev
```

✅ Frontend runs at: **http://localhost:5173**

---

### Step 3: Test the App

Open **http://localhost:5173** in your browser.

#### 🔐 Admin Login (pre-created automatically):
- Email: `admin@farmconnect.in`
- Password: `Admin@1234`

#### Test Flow:
1. **Register as Farmer** → Login → View dashboard with live prices
2. **Register as Vendor** → You'll see "Pending Approval"
3. **Login as Admin** → Approve the vendor
4. **Login as Vendor** → Add crop listing (name, price, location)
5. **Login as Farmer** → See the new crop price on dashboard & marketplace
6. **Toggle language** → Click EN/मर button in top navbar

---

## 🚀 Deployment Guide

### Option A: Free Deployment (Recommended for beginners)

#### Backend → Render.com (Free)

1. Go to https://render.com → Sign up with GitHub
2. Click **New Web Service**
3. Connect your GitHub repo (push `FarmConnect/backend` folder)
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add **Environment Variables** in Render dashboard:
   ```
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/farmconnect
   JWT_SECRET=your_production_secret_here
   NODE_ENV=production
   ADMIN_EMAIL=admin@farmconnect.in
   ADMIN_PASSWORD=YourSecurePassword@123
   PORT=5000
   ```
6. Click **Deploy** → Copy your URL: `https://farmconnect-api-xxxx.onrender.com`

#### Database → MongoDB Atlas (Free 512MB)

1. Go to https://cloud.mongodb.com → Sign up
2. Create **Free Cluster** (M0 Sandbox)
3. Database Access → Create user with password
4. Network Access → Allow `0.0.0.0/0` (all IPs)
5. Click **Connect** → Get connection string:
   `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/farmconnect`
6. Paste this as `MONGO_URI` in Render

#### Frontend → Vercel (Free)

1. Go to https://vercel.com → Sign up with GitHub
2. Push `FarmConnect/frontend` to a GitHub repo
3. Import project in Vercel
4. Add **Environment Variable**:
   ```
   VITE_API_URL=https://farmconnect-api-xxxx.onrender.com/api
   ```
   (Use your actual Render URL from above)
5. Click **Deploy** → Get your URL: `https://farmconnect-xxxx.vercel.app`

---

### Option B: VPS/Cloud Deployment (Advanced)

#### Using PM2 + Nginx on Ubuntu VPS

```bash
# On your VPS
sudo apt update && sudo apt install -y nginx nodejs npm

# Install PM2 globally
npm install -g pm2

# Clone/upload your project
cd /var/www/
# upload your FarmConnect folder here

# Backend
cd /var/www/FarmConnect/backend
npm install
cp .env.example .env  # Edit with production values
pm2 start server.js --name "farmconnect-api"
pm2 save
pm2 startup

# Frontend (build)
cd /var/www/FarmConnect/frontend
npm install
npm run build   # Creates 'dist' folder

# Nginx config
sudo nano /etc/nginx/sites-available/farmconnect
```

Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /var/www/FarmConnect/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/farmconnect /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔗 API Endpoints Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register farmer or vendor |
| POST | `/api/auth/login` | Login any role |
| GET  | `/api/auth/me` | Get current user |

### Crops (Public read, Vendor write)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/crops` | Get all active crop listings |
| GET | `/api/crops/my` | Vendor's own listings |
| POST | `/api/crops` | Create listing (vendor, approved) |
| PUT | `/api/crops/:id` | Update listing (vendor owner) |
| DELETE | `/api/crops/:id` | Delete listing (vendor owner) |

### Admin (Admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/vendors` | All vendors |
| PATCH | `/api/admin/vendors/:id/approve` | Approve vendor |
| PATCH | `/api/admin/vendors/:id/reject` | Reject vendor |
| DELETE | `/api/admin/vendors/:id` | Delete vendor + all crops |

### Public Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schemes` | All govt schemes |
| GET | `/api/msp` | MSP rates 2024-25 |
| GET | `/api/forum` | Forum posts |
| POST | `/api/forum` | Create post (auth) |
| GET | `/api/weather` | State weather advisory |

---

## 🌐 Environment Variables Summary

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/farmconnect
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
ADMIN_EMAIL=admin@farmconnect.in
ADMIN_PASSWORD=Admin@1234
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Language | Bilingual — Marathi (default) + English |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Fonts | Mukta + Hind (Google Fonts) |
| Deployment | Vercel (FE) + Render (BE) + MongoDB Atlas |

---

## 📞 Helplines (Embedded in App)

- **Kisan Call Centre:** 1800-180-1551 (Free, Mon-Sat 6AM-10PM)
- **PM-KISAN Helpline:** 155261
- **MSP Procurement:** 14422
- **Soil Health Card:** 1800-180-1551

---

## 🏛️ Govt Portals Linked

- https://pmkisan.gov.in (PM-KISAN)
- https://pmfby.gov.in (Crop Insurance)
- https://enam.gov.in (eNAM Market)
- https://pmksy.gov.in (Irrigation)
- https://soilhealth.dac.gov.in (Soil Health)
- https://krishi.maharashtra.gov.in (MH Govt)

---

**Made with ❤️ for Indian Farmers | जय जवान जय किसान 🌾**

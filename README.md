# 🕉️ Shri Shivcharan Trust — Frontend

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel" />
</p>

> Official website frontend for **Shri Shivcharan Charitable Trust** — built with Next.js, TypeScript, and Tailwind CSS.

---

## 🌐 Live Website

> **[https://trust-website-frontend.vercel.app](https://trust-website-frontend.vercel.app)** *(update after deployment)*

---

## ✨ Features

- 🏠 Home page with dynamic banners
- 📸 Gallery with event photos
- 📅 Events & Blog sections
- 📬 Contact & Volunteer forms
- 💰 Donation tracking
- 🔒 Admin dashboard (JWT-protected)
- ☁️ Cloudinary image hosting
- 📱 Fully responsive design
- ⚡ Framer Motion animations

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16 | Full-stack React framework |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Framer Motion | 12 | Animations |
| Lucide React | Latest | Icons |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Gopal110/trust-website-frontend.git
cd trust-website-frontend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env.local
# Edit .env.local with your backend URL
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production, set `NEXT_PUBLIC_API_URL` to your deployed backend URL.

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
client/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── context/          # React context providers
├── lib/              # Utility functions & API helpers
├── public/           # Static assets
└── next.config.ts    # Next.js configuration
```

---

## 🔗 Related Repositories

- **Backend API**: [trust-website-backend](https://github.com/Gopal110/trust-website-backend)

---

## 🚢 Deployment

This project is deployed on **Vercel**. Every push to the `main` branch triggers an automatic deployment.

**Required Environment Variables on Vercel:**
- `NEXT_PUBLIC_API_URL` — Your backend API URL

---

## 📄 License

This project is private. All rights reserved — Shri Shivcharan Charitable Trust.

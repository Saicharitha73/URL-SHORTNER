# 🔗 Shortly - Modern URL Shortener & Link Analytics Platform

Shortly is a feature-rich, high-performance URL shortening and link management platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. It offers instant short code generation, real-time analytics dashboards, built-in UTM parameters, downloadable QR codes, and developer API key management.

---

## ✨ Features

- ⚡ **Instant Shortening**: Fast short URL generation using Base62 encoding algorithm with support for custom aliases.
- ⏳ **Expiration & Lifecycle Management**: Set custom expiration dates and toggle link active/inactive status.
- 🎯 **UTM Builder & Campaign Tracking**: Attach `utm_source`, `utm_medium`, and `utm_campaign` parameters directly during link creation.
- 📱 **Downloadable QR Codes**: Generate customizable QR codes for any short link with one-click PNG/SVG download.
- 📊 **Real-Time Link Analytics**: Comprehensive dashboard powered by **Recharts**:
  - Time-series click & unique visitor tracking.
  - Device breakdown (Desktop, Mobile, Tablet).
  - Geolocation distribution by country.
  - Browser and Operating System metrics.
  - Referrer tracking.
- 🔑 **Developer API**: RESTful API endpoints with support for **Live** and **Test** API key management.
- 👥 **Role-Based Access Control**: Built-in User and Admin roles for comprehensive link and key oversight.
- 🎨 **Glassmorphism UI**: Modern, dark-mode design system with micro-interactions and smooth confetti celebrations.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **UI & Styling** | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/) |
| **Data Visualization** | [Recharts 3](https://recharts.org/) |
| **QR Code Generation** | `qrcode.react` |
| **Animations** | `canvas-confetti` |
| **Validation** | [Zod](https://zod.dev/) |

---

## 📂 Project Structure

```text
.
├── app/
│   ├── [shortCode]/         # Short URL redirection handler
│   ├── api/
│   │   └── v1/
│   │       ├── analytics/   # Analytics API endpoints
│   │       ├── keys/        # Developer API Key endpoints
│   │       └── urls/        # URL shortening CRUD API endpoints
│   ├── auth/                # Login & Authentication pages
│   ├── dashboard/           # User & Admin analytics dashboards
│   │   ├── admin/           # Admin links management
│   │   ├── analytics/       # Deep analytics overview
│   │   ├── api/             # API Keys management portal
│   │   └── links/           # User links management table
│   ├── globals.css          # Design system & Tailwind CSS imports
│   ├── layout.tsx           # Global root layout
│   └── page.tsx             # Main landing page & hero shortener
├── components/
│   ├── HeroShortener.tsx    # Interactive link shortening component
│   ├── LandingSections.tsx  # Features, analytics preview & CTA
│   ├── Navbar.tsx           # Top navigation bar
│   └── QrModal.tsx          # QR Code modal with PNG export
├── lib/
│   ├── base62.ts            # Base62 encoding utility
│   ├── store.ts             # In-memory storage & mock database state
│   └── types.ts             # TypeScript definitions & data schemas
├── public/                  # Static assets & public files
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS setup
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saicharitha73/URL-SHORTNER.git
   cd URL-SHORTNER
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 💻 Available Scripts

- `npm run dev`: Starts Next.js development server with hot-reloading.
- `npm run build`: Compiles and builds the production bundle.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint check across the repository.

---

## 📡 API Endpoints

### 1. Create Short URL
- **Endpoint**: `POST /api/v1/urls`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "originalUrl": "https://example.com/my-long-article-url",
    "shortCode": "custom-alias",
    "expiresAt": "2026-12-31T23:59:59Z",
    "utmParameters": {
      "source": "twitter",
      "medium": "social",
      "campaign": "launch"
    }
  }
  ```

### 2. Get Analytics Summary
- **Endpoint**: `GET /api/v1/analytics?urlId=1`
- **Response**: Returns time-series data, country distribution, device types, browser metrics, and top referrers.

### 3. API Key Management
- **Endpoint**: `GET /api/v1/keys` / `POST /api/v1/keys`
- **Description**: Generate and manage Live and Test API tokens for automated link shortening.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

# Bazar Dor (বাজার দর)

Bazar Dor is a modern, real-time price tracker and marketplace web application tailored for tracking essential daily commodities (rice, lentils, oil, vegetables, fish, meat, dairy, spices, etc.) with localized Bengali support, live price tickers, and secure authentication.

🌐 **Live Demo:** [https://bazar-dor-ten-phi.vercel.app](https://bazar-dor-ten-phi.vercel.app)

---

## ✨ Key Features

- **Real-Time Commodity Price Ticker:** Live updating ticker bar displaying current market rates per kg/litre for essential items.
- **Category Browsing:** Easy filtering across categories like Rice, Dal, Oil, Vegetables, Fish, Meat, Dairy, and Spices.
- **Secure Authentication:** Built with **BetterAuth**, supporting Email/Password sign-in as well as Social Authentication (**Google** and **GitHub OAuth**).
- **Serverless Database Architecture:** Powered by **Neon PostgreSQL** and Prisma/BetterAuth adapter for robust, cloud-native scalability.
- **Bilingual Interface:** Clean, responsive UI with rich Bengali typography and emoji-enhanced product cards.
- **Modern Tech Stack:** Built with Next.js, React, Tailwind CSS, and Vercel Serverless Functions.

---

## 🚀 Getting Started Locally

Follow these steps to set up and run the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/bazar-dor.git
cd bazar-dor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your credentials:
```env
DATABASE_URL=postgresql://user:password@your-neon-db-host/dbname?sslmode=require
BETTER_AUTH_SECRET=your_super_secret_key_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Run Database Migrations
```bash
npx @better-auth/cli@latest migrate
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Deployment

This project is optimized for deployment on **Vercel**:
1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Configure the required environment variables (`DATABASE_URL`, `BETTER_AUTH_SECRET`, OAuth credentials, etc.) in the Vercel project dashboard.
4. Deploy!

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
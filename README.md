# FuturePath AI
**Discover your Perfect Academic Journey.**

Live Demo: [future-path-ten.vercel.app](https://future-path-ten.vercel.app/en)

---

## 🌟 Overview
**FuturePath AI** is a cutting-edge EdTech platform designed to empower high school students. By leveraging Artificial Intelligence, the platform analyzes student performance through smart diagnostics to generate personalized learning roadmaps and predict the most suitable **University Majors**.

## ✨ Key Features
* **AI-Powered Diagnostics:** Custom dynamically generated assessments in Biology, Physics, Math, Chemistry, and Languages to identify knowledge gaps.
* **Personalized SmartPaths:** Dynamic learning roadmaps generated based on individual quiz results to strengthen academic performance, with targeted learning resources.
* **University Major Prediction:** Advanced AI analysis to predict the top 5 ideal University Majors based on holistic student performance and interests.
* **Premium Modern UI:** A sleek Emerald Green & Charcoal Black theme featuring Glassmorphism effects for a professional and engaging user experience.
* **Full Bilingual Support:** Seamless switching between Arabic (RTL) and English (LTR) interfaces using Next-Intl.

## 🛠 Tech Stack
* **Frontend:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack) & TypeScript.
* **Styling:** Tailwind CSS & Framer Motion.
* **I18n:** [next-intl](https://next-intl-docs.vercel.app/) for seamless localization.
* **Backend & Auth:** [Auth.js (NextAuth) v5](https://authjs.dev/) & [Prisma ORM](https://www.prisma.io/).
* **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on Supabase / Neon).
* **AI Engine:** OpenRouter API (Gemini 2.0 Flash) for generative logic.

## ⚙️ Quick Start
1. **Clone & Install:**
   ```bash
   git clone https://github.com/Sarahalo204/FuturePath.git
   cd FuturePath
   npm install
   ```
2. **Environment Setup:** Configure your `.env` file:
   ```env
   # Database Connection
   DATABASE_URL="your_postgresql_connection_string"
   
   # Authentication
   AUTH_SECRET="your_secure_random_string"
   
   # AI Integration
   OPENROUTER_API_KEY="your_openrouter_api_key"
   AI_MODEL_NAME="google/gemini-2.0-flash-001"
   ```
3. **Database Sync:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Run Dev:**
   ```bash
   npm run dev
   ```

---

## 👩‍💻 Development Team
* **Sarah Alowjan**
* **Aryaf Alotaibi**

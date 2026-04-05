# FuturePath
**Discover your Perfect Academic Journey.**

**FuturePath AI** هي منصة تعليمية ذكية تعتمد على الذكاء الاصطناعي لمساعدة الطلاب في تحديد مساراتهم الأكاديمية والمهنية بدقة. من خلال تقييمات شاملة، توفر المنصة خطط تعلم مخصصة (Personalized Roadmaps) وتنبؤات مهنية مبنية على البيانات.

---

## ✨ المميزات الرئيسية (Features)

* **AI-Powered Diagnostics:** اختبارات ذكية لتقييم مستوى الطالب في المواد العلمية المختلفة.
* **Personalized SmartPaths:** توليد مسارات تعليمية مخصصة بناءً على نقاط القوة والضعف.
* **Career Prediction:** نظام ذكاء اصطناعي يتوقع المسارات المهنية الأنسب للطالب.
* **Modern Branding:** واجهة مستخدم عصرية باللونين الأسود والأخضر الزمردي وتصميم Glassmorphism.
* **Bi-lingual Support:** دعم كامل للغتين العربية والإنجليزية مع نظام توجيه ذكي (RTL/LTR).

---

## 🛠 التقنيات المستخدمة (Tech Stack)

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) مع دعم **Turbopack**.
* **Language:** TypeScript لضمان استقرار الكود.
* **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) لإدارة اللغات.
* **Authentication:** [Auth.js (NextAuth)](https://authjs.dev/) لتأمين حسابات الطلاب.
* **Database:** [PostgreSQL](https://www.postgresql.org/) مستضافة على **Neon**.
* **ORM:** [Prisma](https://www.prisma.io/) مع تطبيق نمط الـ Singleton لضمان استقرار الاتصالات.
* **Styling:** Tailwind CSS مع مكتبة Framer Motion للحركات التفاعلية.

---

## ⚙️ التثبيت والتشغيل (Local Setup)

1.  **نسخ المستودع:**
    ```bash
    git clone [https://github.com/Sarahalo204/FuturePath.git](https://github.com/Sarahalo204/FuturePath.git)
    cd FuturePath
    ```

2.  **تثبيت المكتبات:**
    ```bash
    npm install
    ```

3.  **إعداد ملف البيئة (`.env`):**
    قم بإنشاء ملف `.env` في المجلد الرئيسي وأضف القيم التالية:
    ```env
    DATABASE_URL="your_neon_database_url?sslmode=require&pgbouncer=true&connection_limit=1"
    AUTH_SECRET="your_auth_secret"
    ```
   

4.  **تحديث قاعدة البيانات وتشغيل السيرفر:**
    ```bash
    npx prisma generate
    npm run dev
    ```

---

## 📂 هيكلة المشروع (Project Structure)

* `src/app/[locale]`: المسارات والصفحات المترجمة.
* `src/components`: المكونات القابلة لإعادة الاستخدام (Navbar, Footer, DiagnosticQuiz).
* `messages/`: ملفات الترجمة الرسمية للموقع (ar.json, en.json).
* `prisma/`: تخطيط قاعدة البيانات (Schema).

---

### 👩‍💻 تطوير:
**Sarah Alowjan**
**Aryaf Alotaibi**

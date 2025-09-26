# Rekhia.com 🌐

Rekhia.com is the official website of **Rekhia**, a **UX/UI Design and Software Development Studio** created under **Busdigital LLC (U.S.)**, operating internationally with a trilingual focus (**English, Hebrew, Spanish**).  

This project is the **first public version (v1)** of the site, currently featuring the **homepage** with all the technical foundations needed to grow in the next phases.  

---

## 🚀 Project Overview

Rekhia is a **multidisciplinary digital studio** that blends UX design, web & app development, e-commerce, and monthly support plans.  
The website communicates Rekhia’s philosophy through two narratives:  
- **Pragmatic:** delivering reliable, scalable digital products today.  
- **Visionary:** building the knowledge, talent, and processes to incubate a future **next-generation MMO**.  

In this first version we have achieved:  
- A solid structure built on **Next.js 15** with **Turbopack**.  
- **Internationalization (i18n)** with `next-intl`, supporting **EN** and **HE** with automatic detection via middleware.  
- **Responsive design** powered by TailwindCSS.  
- Key sections already implemented:
  - **Hero** with dynamic titles and `t.rich` for styled spans and line breaks.  
  - **Services** with visual service cards and custom background images.  
  - **Process / Timeline** animated with Framer Motion, adapted for both **LTR** and **RTL** layouts.  
  - **Final CTA** with brand imagery.  
  - **Professional footer** with logo, navigation, and legal links.  
- **Stripe integration** (monthly plans and custom projects via checkout links).  
- **Vercel build & deployment** configured for CI/CD.  
- Fixed environment-specific issues (e.g., `.PNG` → `.png` file extension bug in production builds).  

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack).  
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/).  
- **Animations:** [Framer Motion](https://www.framer.com/motion/).  
- **UI & Styling:** [TailwindCSS](https://tailwindcss.com/).  
- **Hosting:** [Vercel](https://vercel.com/).  
- **Payments:** [Stripe](https://stripe.com/) (checkout links and invoices).  

---

## 📂 Current Structure

rekhiacom/
├── app/
│ ├── [locale]/ # Internationalized routes (EN/HE)
│ ├── layout.tsx # Root layout
│ └── page.tsx # Homepage (v1)
├── components/ui/ # Reusable UI components
│ ├── Hero
│ ├── Services
│ ├── Timeline
│ ├── CTA
│ └── Footer
├── public/ # Static assets (images, logo)
├── i18n/ # Language configs & middleware
├── README.md # Project documentation
└── package.json

---

## 🌍 Internationalization (i18n)

- Supported locales:  
  - **EN** → `rekhiacom.vercel.app/en`  
  - **HE** → `rekhiacom.vercel.app/he`  
- Automatic locale detection handled via middleware.  
- Translations stored in JSON (`en.json`, `he.json`) with support for `t.rich` (spans, line breaks, styled chunks).  

---

## 📌 Next Steps

- Complete additional pages: **Pricing, About, FAQ, Privacy Policy, Terms of Service**.  
- Implement **Stripe Checkout** directly in pricing pages.  
- Add **portfolio / case studies** section.  
- Improve **accessibility (a11y)**.  
- Optimize SEO and multilingual indexing.  

---

## 👨‍💻 Contribution

This repository is private and maintained by the Rekhia Studio team.  
External pull requests are not accepted at this stage.  

---

## ⚖️ License

© 2025 Busdigital LLC.  
All rights reserved.  

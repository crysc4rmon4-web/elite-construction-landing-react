# 🏗️ Construction Lead Engine — High Performance Landing

High-performance conversion landing page designed for **construction and renovation companies** that need to generate leads directly from their website.

Developed by **Carmona Studio** with a focus on **speed, conversion, and scalability**.

---

# 🚀 Core Concept

Most construction company websites are slow, outdated, and difficult to contact from mobile devices.

This project solves that problem by providing a **lead generation engine** optimized for:

• Instant contact (WhatsApp / Call / Email)
• Mobile-first UX
• Ultra-fast loading performance
• Lead capture automation

The result is a digital asset that converts website visitors into **real project inquiries**.

---

# ⚡ Performance

The architecture prioritizes speed and Core Web Vitals.

Typical Lighthouse scores:

| Metric         | Score |
| -------------- | ----- |
| Performance    | 100   |
| Accessibility  | 95    |
| Best Practices | 96    |
| SEO            | 90+   |

Core Web Vitals:

• LCP ≈ 1.4s
• TBT = 0 ms
• CLS = 0

This ensures excellent user experience even on **slow mobile networks**.

---

# 🧠 Architecture

Built using a modern lightweight frontend stack.

Tech stack:

• React
• Vite
• TailwindCSS

The project uses a **config-driven architecture** allowing rapid customization for different companies.

All business data is centralized in:

```
src/config/data.js
```

Changing this file updates:

• Brand name
• Contact details
• Services
• Images
• SEO data

This allows the landing to be adapted for new clients in minutes.

---

# 🎯 Conversion System

The landing includes a multi-channel lead capture system.

Available contact methods:

• WhatsApp instant message
• Direct phone call
• Lead form submission

When a lead form is submitted:

1. Data is validated client-side
2. Sent to a serverless endpoint
3. Email notification is sent to the business owner

---

# ✉️ Lead Automation

The project integrates:

Resend Email API

This allows automatic delivery of lead information directly to the company inbox without requiring a traditional backend server.

Architecture:

```
Landing
 ↓
Serverless Function
 ↓
Email Notification
```

---

# 🔒 Security & Compliance

The landing includes protection against spam and ensures legal compliance.

Features:

• Honeypot anti-spam protection
• Input validation
• GDPR consent checkbox

These measures help ensure reliable lead collection in production environments.

---

# 📈 SEO Optimization

Technical SEO is implemented to maximize discoverability.

Includes:

• Meta tags
• Canonical URL
• Open Graph metadata
• Structured data (Schema.org)
• robots.txt configuration

Schema type used:

HomeAndConstructionBusiness

This improves visibility in local search results.

---

# 📱 Mobile-First UX

The interface is optimized for mobile users, which represent the majority of visitors in the construction sector.

Features include:

• Large call-to-action buttons
• Instant messaging integration
• Modal contact system
• Touch-friendly layout

---

# 🛠 Development

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Build production version:

```
npm run build
```

---

# 📦 Deployment

Recommended deployment platform:

Vercel

The project is compatible with serverless functions and static hosting.

---

# 📄 License

MIT License.

Commercial use permitted.

---

# 🧑‍💻 Author

Developed by **Carmona Studio**

High-performance digital assets for construction and real estate companies.

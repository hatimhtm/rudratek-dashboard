# Rudratek Dashboard

![Assignment Status](https://img.shields.io/badge/Status-Complete-000000?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

> **A high-fidelity project management dashboard engineered for the Rudratek Frontend Assessment.**

This application demonstrates a mastery of modern React architecture, responsive design systems, and premium user experience patterns. It is designed not just as a prototype, but as a production-ready SaaS foundation.

---

## ⚡ Key Features

| Feature | Description |
| :--- | :--- |
| **📊 Analytics Overview** | Real-time aggregation of project counts, budgets, and status trends with visual indicators. |
| **📑 Advanced Filtering** | Debounced search and multi-select filtering for managing complex project lists. |
| **📱 Mobile-First** | A fully responsive layout that transforms from a desktop sidebar to a native mobile navigation. |
| **🎨 Minimalist Luxury** | A refined aesthetic using glassmorphism, subtle animations, and strict typographic hierarchy. |
| **🌓 Dark Mode** | Context-aware theme switching with persistent state management. |
| **👥 Team Collaboration** | Visual indicators for team members and timeline tracking within project details. |

---

## 🏗️ Architecture

The project is built on **Next.js 14 (App Router)** and follows a strict modular architecture:

```bash
src/
├── app/                 # App Router pages and layouts
│   ├── clients/         # Client portfolio view
│   ├── settings/        # User preferences
│   └── page.tsx         # Main Dashboard
├── components/          # Reusable UI atoms and molecules
│   ├── Sidebar.tsx      # Responsive navigation
│   ├── ProjectCard.tsx  # Polymorphic card/row component
│   └── ...
├── contexts/            # React Context (Theme, State)
├── data/                # Mock data layer (Simulated API)
└── utils/               # Shared helpers (Formatters, CN)
```

**Design Decisions:**
*   **Zero-Runtime CSS**: Utilizes Tailwind CSS for optimal performance and small bundle size.
*   **Edge-Ready**: Designed to be deployable on Vercel Edge Networks.
*   **Type Safety**: 100% strictly typed codebase with TypeScript.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/hatimhtm/rudratek-dashboard.git
    cd rudratek-dashboard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the dashboard**
    Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔧 Post-Submission Refinements

Based on feedback, the following enhancements were implemented:
*   Added a **Sticky Blur Header** to ensuring scrolling content fades gracefully.
*   Implemented a dedicated **Settings Page** with interactive UI elements.
*   Refined **Z-Index Layering** for modal backdrops.
*   Updated aesthetic to **Minimalist Luxury**.

---

## 📬 Connect

**Hatim El Hassak** — *Frontend Engineer*

[![Portfolio](https://img.shields.io/badge/Portfolio-hatimelhassak.is--a.dev-0891b2?style=for-the-badge&logo=safari&logoColor=white)](https://hatimelhassak.is-a.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hatim%20El%20Hassak-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hatimelhassak)
[![Email](https://img.shields.io/badge/Email-hatimelhassak.official%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:hatimelhassak.official@gmail.com)

# Rudratek Dashboard

![Assignment Status](https://img.shields.io/badge/Status-Complete-000000?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

A high-fidelity project management dashboard engineered for the Rudratek Frontend Assessment. This application demonstrates a mastery of modern React architecture, responsive design systems, and premium user experience patterns.

## ⚡ Overview

The **Rudratek Dashboard** is a comprehensive tool for managing ongoing projects, client portfolios, and financial metrics. It moves beyond a simple list view to provide a holistic "SaaS-like" experience with:

*   **Analytics Overview**: Real-time aggregation of project counts, budgets, and status trends.
*   **Multi-View Navigation**: Seamless transitioning between Dashboard and Client portfolio views.
*   **Premium Interaction**: Glassmorphism effects, fluid transitions, and a refined dark mode.
*   **Mobile-First Architecture**: A responsive layout that adapts from a complex desktop sidebar to a native-feeling mobile interface.

## 🛠️ Engineering

Built with a focus on **performance**, **maintainability**, and **clean code**:

*   **Framework**: [Next.js 14](https://nextjs.org) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com) with a custom design system.
*   **Icons**: [Lucide React](https://lucide.dev)
*   **Type Safety**: Strict TypeScript configuration.
*   **State**: Localized state management with Context API for theming.

**Key Architectural Decisions:**
*   **Component Composition**: Highly modular components (`StatsCard`, `ProjectCard`, `Sidebar`) for reusability.
*   **Zero-Runtime CSS**: All styling is handled via Tailwind for optimal performance.
*   **Edge-Ready**: Designed to be deployable on Vercel Edge Networks.

## � Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/hatimhtm/rudratek-dashboard.git
    cd rudratek-dashboard
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the dashboard**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

The interface adheres to a **"Minimalist Luxury"** aesthetic:
*   **Typography**: Inter (Google Fonts) for readability and modern feel.
*   **Palette**: High-contrast monochrome base with subtle semantic colors.
*   **Motion**: Purposeful animations (slide-ins, fades) guide user attention without distraction.

---

*Hatim El Hassak — Rudratek Frontend Assignment*

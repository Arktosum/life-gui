# Finance Tracker

A mobile‑first, responsive Progressive Web App (PWA) for tracking personal finances, budgets, and expenses. Built with modern web‑development best practices to deliver a native‑like experience in any browser.

## Key Features

- **Expense & Income Management**  
  Add, edit, and categorize transactions in real time with offline support through service workers.

- **Budgeting & Alerts**  
  Create budget goals and receive push notifications when you approach limits.

- **Reports & Charts**  
  Visualize spending trends with interactive line, bar, and pie charts.

- **Authentication & Security**  
  Secure login via OAuth2/OpenID Connect (Google/Facebook) with JSON Web Tokens (JWTs).

- **Offline‑First PWA**  
  App Shell architecture and caching for seamless offline usage and instant load times.

- **Multi‑Platform UI**  
  Native‑style components on iOS and Android via a web‑based UI toolkit.

## Tech Stack

| Layer              | Technology                              | Reference                                          |
|--------------------|-----------------------------------------|----------------------------------------------------|
| **Frontend**       | Next.js (SSR/ISR, PWA)                  | https://nextjs.org/docs                            |
|                    | Tailwind CSS (utility‑first styling)    | https://tailwindcss.com/docs                       |
|                    | Framework7 (iOS/Material UI components) | https://framework7.io/docs                         |
|                    | Ionic (React Web Components)            | https://ionicframework.com/docs                    |
| **Backend**        | NestJS (TypeScript, scalable API)       | https://docs.nestjs.com                            |
|                    | Firebase (Auth, Firestore, Functions)   | https://firebase.google.com/docs                   |
|                    | Supabase (PostgreSQL, Realtime)         | https://supabase.com/docs                          |
| **Auth & Security**| Auth0 (OAuth2, OpenID Connect)          | https://auth0.com/docs                             |
| **Charts & UI**    | Recharts (React SVG charts)             | https://recharts.org/docs                          |
|                    | Chart.js (canvas-based charts)          | https://www.chartjs.org/docs                       |
| **Deployment**     | Vercel (Frontend hosting, edge)         | https://vercel.com/docs                            |
|                    | Docker / AWS Lambda / Firebase Hosting  | —                                                  |

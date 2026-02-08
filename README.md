# 🧭 Booking Automation [Project ID: P-21]

A full-stack dealer info-checker application that provides an intuitive interface for customers to get prequalified, request quotes, submit trade-in values, complete credit applications, and interact with dealers—with responsive web and mobile experiences.

---

## 📚 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Contact](#contact)

---

## 🧩 About

This project provides a unified customer-facing portal for automotive dealers. It solves the need for a single, embeddable application where customers can complete prequalification, get quotes, submit trade-in details, fill out full credit applications, book appointments, message dealers, check application status, and manage references and documents—all keyed by dealer. The app detects mobile vs. desktop and can render different UIs, and uses IP-based geolocation where needed. The key goals are a fast, modern frontend (Vite + React) and a simple Node/Express API that can be deployed in production to serve the built client.

---

## ✨ Features

- **Get Prequalified** – Customer prequalification flow with landing and form views
- **Get Quote** – Request a quote from the dealer
- **Trade-In Value** – Submit trade-in details and upload trade-in images
- **Full Credit Application** – Complete credit application with landing and form flows
- **Appointment** – Schedule appointments with the dealer
- **Message Dealer** – Send messages to the dealer
- **Check Application** – Check status of submitted applications
- **Reference & Documents** – Reference links and document access by dealer/customer slug
- **Identity Verification** – Verification flow for dealer/customer
- **Device & Agent Detection** – Backend detection of mobile vs. web for tailored UX
- **Geolocation** – IP-based geo lookup for device/location context

---

## 🧠 Tech Stack

| Category    | Technologies |
|------------|--------------|
| **Languages** | JavaScript (Node.js), JSX |
| **Frameworks** | React 18, Express.js, Vite |
| **UI & Styling** | Material UI (MUI), Emotion, Tailwind CSS |
| **State & Routing** | Redux Toolkit, React Router v6 |
| **Backend** | Node.js, Express, CORS, dotenv |
| **Tools** | geoip-lite, axios, react-datepicker, concurrently, nodemon |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Winner960111/book-vite-react.git

# Navigate to the project directory
cd book-vite-react

# Install root dependencies (server + tooling)
npm install

# Install client dependencies
cd client && npm install && cd ..
```

---

## 🚀 Usage

**Development (server + client preview together):**

```bash
npm run dev
```

This starts the Express server and the Vite preview (built client). Then open your browser and go to:

👉 [http://localhost:443](http://localhost:443) (or the `PORT` set in your environment)

**Development (client only, with hot reload):**

```bash
# Terminal 1 – backend
npm run server

# Terminal 2 – client (from project root)
npm run client
# or from client folder: npm run dev
```

Then open:

👉 [http://localhost:5173](http://localhost:5173) (Vite default) for the client, and ensure the API base URL in the client points to your server (`http://localhost:443`).

**Production:**

```bash
# Build the client
cd client && npm run build && cd ..

# Start the server (serves client from client/dist)
npm start
```

---

## 🧾 Configuration

Create a `.env` file in the project root with:

```env
PORT=443
NODE_ENV=development
```

Optional (if you add more services later):

```env
# API_KEY=your_api_key_here
# DB_URL=your_database_url_here
```

The client may use its own env (e.g. `client/.env`) for variables like `VITE_API_BASE_URL` if you define them in the Vite app.

---

## 🖼 Screenshots

<img src="./client/public/Annotation 2023-12-25 044704.png" alt="booking">

---

## 📜 API Documentation

The project exposes a small API under `/api`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/detect-agent` | Returns `"mobile"` or `"web"` based on request User-Agent. Used to choose mobile vs. web UI. |
| **POST** | `/api/deviceInfo` | Body: `{ "ip": "client.ip.address" }`. Returns GeoIP data for the given IP. |

---

## 📬 Contact

- **Author:** HaoMing Lin
- **Email:** haoming960111@gmail.com
- **GitHub:** [@yourgithub](https://github.com/Winner960111)

---

## 🌟 Acknowledgements

- [Vite](https://vitejs.dev/) and [React](https://react.dev/) for the frontend tooling and framework
- [Material UI](https://mui.com/) and [Tailwind CSS](https://tailwindcss.com/) for UI and styling
- [Express](https://expressjs.com/) and [geoip-lite](https://github.com/geoip-lite/node-geoip-lite) for the backend and IP geolocation

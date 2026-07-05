# Flipkart Clone

A full-stack clone of [Flipkart](https://www.flipkart.com/) built with the MERN stack (MongoDB, Express, React, Node.js) and Material UI. It includes product browsing, product details, a shopping cart, and user signup/login.

## Features

- Home page with a rotating banner, product carousels, and category navigation
- Product detail view
- Shopping cart with add/remove items and order total
- User signup and login, backed by hashed passwords and JWT session tokens
- Responsive UI built with Material UI (MUI)
- Client-side state management with Redux (thunk middleware)

## Tech Stack

**Frontend**
- React 18 (Create React App)
- Material UI (MUI) v5
- Redux + Redux Thunk
- React Router v6
- Axios
- react-multi-carousel

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JSON Web Tokens (jsonwebtoken) for session tokens, bcryptjs for password hashing
- dotenv, cors, body-parser

## Project Structure

```
Flipkart-Clone/
├── backend/
│   ├── constants/          # Seed data for the database (e.g. product.js)
│   ├── controller/         # Route handlers (product-controller.js, user-controller.js)
│   ├── database/           # MongoDB connection setup (db.js)
│   ├── middleware/         # JWT verification middleware (auth.js)
│   ├── model/              # Mongoose schemas (productSchema.js, userSchema.js)
│   ├── routes/              # Express route definitions (route.js)
│   ├── default.js          # Seeds the database with default product data on startup
│   └── index.js             # App entry point
│
└── frontend/
    ├── public/               # Static assets and index.html
    └── src/
        ├── Components/
        │   ├── Cart/         # Cart page and its subcomponents
        │   ├── Header/       # App header, search, and account menu
        │   ├── Home/         # Home page and its subcomponents (banner, slides, nav bar)
        │   ├── ItemDetails/  # Product detail page
        │   ├── Login/        # Login/signup dialog
        │   └── NotFound.jsx  # 404 page
        ├── constants/        # Static UI data (nav links, banner images) and the API base URL
        ├── context/          # React context providers (login/account state)
        ├── redux/            # Redux store, actions, reducers, and constants
        ├── service/          # API layer (axios calls to the backend)
        ├── templates/        # MUI theme provider
        └── utils/            # Small shared helper functions
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+ and npm
- A MongoDB database (e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
JWT_SECRET=a_long_random_string
```

> The connection string itself is defined in `backend/database/db.js`. Update it if you're pointing to a different cluster.
> `JWT_SECRET` is used to sign the session tokens issued on login/signup — use a long, random value and keep it out of version control.

Start the server (runs on `http://localhost:8000` and seeds default product data on every start):

```bash
npm start
```

### 2. Frontend setup

```bash
cd frontend
npm install
npm start
```

The app runs on `http://localhost:3000` and by default expects the backend at `http://localhost:8000`. To point it at a different backend, set `REACT_APP_API_URL` in a `.env` file inside `frontend/`:

```
REACT_APP_API_URL=http://localhost:8000
```

The base URL is centralized in `frontend/src/constants/api.js`, consumed by the shared axios instance in `frontend/src/service/api.js`, which the Redux `productActions`/`cartActions` reuse rather than creating their own axios calls.

## API Endpoints

| Method | Endpoint            | Description                                          |
|--------|---------------------|-------------------------------------------------------|
| POST   | `/signup`            | Register a new user, returns a JWT + username          |
| POST   | `/login`             | Authenticate a user, returns a JWT + username          |
| GET    | `/products`          | Get all products                                       |
| GET    | `/product/:id`       | Get a single product by id                             |
| GET    | `/profile`           | Get the logged-in user's profile — requires `Authorization: Bearer <token>` |

## Available Scripts

**Backend** (`backend/`)
- `npm start` — start the API server with nodemon

**Frontend** (`frontend/`)
- `npm start` — run the app in development mode
- `npm run build` — build the app for production
- `npm test` — run the test suite

## Authentication

- Passwords are hashed with bcrypt before being stored (see the `pre('save')` hook in `backend/model/userSchema.js`).
- On successful login/signup, the backend issues a JWT signed with `JWT_SECRET` (7-day expiry).
- `backend/middleware/auth.js` verifies that token on protected routes (currently `GET /profile`) and rejects requests with a missing/invalid/expired token.
- The frontend stores the returned token and username in `localStorage` via `frontend/src/context/ContextProvider.jsx`, so a session survives a page refresh until logout.
- An axios instance in `frontend/src/service/api.js` automatically attaches `Authorization: Bearer <token>` to every outgoing request, and is reused by the Redux product/cart actions so all API calls share the same base URL and auth handling.
- On app load, `ContextProvider` calls `GET /profile` to validate any stored token and logs the user out automatically if it's no longer valid.


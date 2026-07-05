# Flipkart Clone

A full-stack clone of [Flipkart](https://www.flipkart.com/) built with the MERN stack (MongoDB, Express, React, Node.js) and Material UI. It includes product browsing, product details, a shopping cart, and user signup/login.

## Features

- Home page with a rotating banner, product carousels, and category navigation
- Product detail view
- Shopping cart with add/remove items and order total
- User signup and login
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
- dotenv, cors, body-parser

## Project Structure

```
Flipkart-Clone/
├── backend/
│   ├── constants/          # Seed data for the database (e.g. product.js)
│   ├── controller/         # Route handlers (product-controller.js, user-controller.js)
│   ├── database/           # MongoDB connection setup (db.js)
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
        ├── constants/        # Static UI data (nav links, banner images)
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

Create a `.env` file inside `backend/` with your MongoDB credentials:

```
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
```

> The connection string itself is defined in `backend/database/db.js`. Update it if you're pointing to a different cluster.

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

The app runs on `http://localhost:3000` and expects the backend to be running on `http://localhost:8000` (see `frontend/src/service/api.js` and `frontend/src/redux/actions/productActions.js`).

## API Endpoints

| Method | Endpoint            | Description                |
|--------|---------------------|----------------------------|
| POST   | `/signup`            | Register a new user        |
| POST   | `/login`             | Authenticate a user        |
| GET    | `/products`          | Get all products           |
| GET    | `/product/:id`       | Get a single product by id |

## Available Scripts

**Backend** (`backend/`)
- `npm start` — start the API server with nodemon

**Frontend** (`frontend/`)
- `npm start` — run the app in development mode
- `npm run build` — build the app for production
- `npm test` — run the test suite

## Known Limitations

- The backend has no authentication tokens/sessions — login only checks credentials and does not issue a session.
- The API base URL (`http://localhost:8000`) is hardcoded on the frontend rather than read from an environment variable.

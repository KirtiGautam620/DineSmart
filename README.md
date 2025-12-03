# DineSmart

DineSmart is a modern food recipe application built with React Native (Expo) for the frontend and Node.js with Prisma for the backend. 

## Features

- **User Authentication**: Secure login and signup using Clerk Expo.
- **Menu Management**: View detailed food items with images and descriptions.
- **Favorites**: Save favorite restaurants and dishes for quick access.
- **Responsive Design**: Optimized for mobile devices with a clean, intuitive UI.
- **Backend API**: Robust backend with Prisma ORM for database management and cron jobs for automated tasks.

## Tech Stack

### Frontend
- React Native
- Expo
- React Navigation
- React Native Paper (UI Components)
- React Native Vector Icons

### Backend
- Node.js
- Express.js
- Prisma (ORM)
- MySQL (Database)
- Node-Cron (Scheduled Tasks)
- Axios (HTTP Client)

## Demo Video

Check out the demo video to see DineSmart in action:  
[Demo Video](https://drive.google.com/file/d/1q8nryA_rBeJDXrrN7ZySy5AfPfplXL3H/view?usp=sharing)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- MySQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd DineSmart
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Set up your MySQL database and update connection details in prisma/schema.prisma
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   # Update any necessary configuration (e.g., API endpoints)
   npm start
   ```

### Running the App
- For iOS: `npm run ios`
- For Android: `npm run android`
- For Web: `npm run web`

## Project Structure

```
DineSmart/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── server.js
│       └── cron.js
├── frontend/
│   ├── assets/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   └── utils/
│   ├── App.js
│   └── package.json
└── README.md
```

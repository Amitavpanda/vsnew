# MERN Stack Demo Project

A simple Task Manager application built with the MERN stack (MongoDB, Express, React, Node.js) for testing and demonstrating VS Code features.

## 📋 Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Responsive UI with modern design
- ✅ RESTful API backend
- ✅ In-memory fallback when MongoDB is unavailable
- ✅ CORS enabled for cross-origin requests

## 🏗️ Project Structure

```
vsnew/
├── backend/              # Node.js + Express backend
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   └── server.js    # Express server entry point
│   ├── package.json
│   └── .env.example
├── frontend/            # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── App.css      # Styles
│   │   └── index.js     # React entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - app works without it using in-memory storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vsnew
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables (Optional)**
   ```bash
   cd ../backend
   cp .env.example .env
   # Edit .env file with your MongoDB URI if you have MongoDB installed
   ```

### Running the Application

#### Option 1: Run Both Servers Separately

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

#### Option 2: Development Mode with Auto-Reload

1. **Backend with nodemon**
   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend with React hot reload**
   ```bash
   cd frontend
   npm start
   ```

### Using the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You'll see the Task Manager interface
3. Add new tasks using the form at the top
4. Click on a task to toggle its completion status
5. Click the trash icon to delete a task

## 📡 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Health Check
- `GET /api/health` - Check API status

## 🧪 Testing VS Code Features

This project is ideal for testing various VS Code features:

### 1. **IntelliSense & Auto-completion**
- Try editing `backend/src/controllers/taskController.js`
- Type `req.` or `res.` to see IntelliSense suggestions

### 2. **Debugging**
- Set breakpoints in `backend/src/server.js`
- Use VS Code's debugger to step through code

### 3. **Git Integration**
- Make changes to any file
- Use VS Code's Source Control panel to commit changes

### 4. **Terminal Integration**
- Open integrated terminal (Ctrl+`)
- Run backend and frontend in split terminals

### 5. **Extensions Testing**
- Install ESLint, Prettier, or other extensions
- Test formatting and linting features

### 6. **Search & Replace**
- Try finding all instances of "Task"
- Test multi-cursor editing

### 7. **React Development**
- Edit `frontend/src/App.js` and see hot reload
- Test component navigation and refactoring

## 🛠️ Development Tips

- The backend uses **in-memory storage** as a fallback, so it works without MongoDB
- Hot reload is enabled for both frontend and backend (with nodemon)
- CORS is configured to allow requests from the React frontend
- The app is intentionally simple for easy demonstration and testing

## 📝 Notes

- This is a **demo project** intended for testing and learning purposes
- Security features are minimal - not suitable for production use
- MongoDB connection is optional - app works with in-memory storage

## 🤝 Contributing

Feel free to modify and extend this project for your testing needs!

## 📄 License

MIT
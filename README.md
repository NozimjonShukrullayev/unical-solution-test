# 🧱 Drag & Drop Block Builder

This project is a simple drag-and-drop interface that allows users to add and manage blocks on a canvas. Each block can contain an image or a static chart, and users can move, resize, or delete blocks. The application is built with React and modern frontend tools, and state is persisted using LocalStorage.

## ✨ Features

- 📦 Drag and drop blocks in the main area
- 🖼 Add and replace images inside blocks
- 📊 Add charts inside blocks
- 📐 Resize blocks freely without overlapping
- ❌ Delete individual blocks
- 💾 All actions are saved using LocalStorage
- 🔔 Notifications using React Toastify

## ⚙️ Technologies Used

- React
- [react-grid-layout]([https://github.com/clauderic/dnd-kit](https://www.npmjs.com/package/react-grid-layout/v/0.6.1)) – drag and drop library
- React-Resizable – for resizing blocks
- React Toastify – for user-friendly notifications
- LocalStorage – for persistent state
- Tailwind CSS – for styling (if applicable)

## 🚀 Getting Started

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/NozimjonShukrullayev/unical-solution-test.git

# Navigate into the project directory
cd unical-solution-test

# Install dependencies
npm install

# Start the development server
npm start

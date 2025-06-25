# 🎬 movies-app-react

A sleek and blazing-fast movie search app built with **Vite + React**. Search movies via **TMDB API**, track the most searched ones with **Appwrite**, and enjoy responsive UI with **Tailwind CSS**. Debouncing handled via `react-use` to keep API hits in check.

## 🚀 Tech Stack

- ⚡ **Vite** — lightning-fast dev server & build tool  
- ⚛️ **React** — frontend framework  
- 🌀 **react-use** — debounce hook to avoid spamming the API  
- 🎞️ **TMDB API** — fetch movie data  
- 🧠 **Appwrite** — store most searched movies  
- 💅 **Tailwind CSS** — utility-first styling  

## 🔍 Features

- 🔎 **Debounced Search** using `useDebounce` from `react-use`  
- 🔥 **Trending Searches** tracked in Appwrite  
- 🎨 **Clean UI** with Tailwind  
- ⚡ Super fast performance with Vite  

## 🧪 Getting Started

### Prerequisites

- Node.js >= 18  
- TMDB API Key  
- Appwrite project set up

### Install

```bash
git clone https://github.com/your-username/movieradar.git
cd movieradar
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_DATABASE_ID=your_appwrite_database_id
VITE_COLLECTION_ID=your_appwrite_collection_id
```

### Run Locally

```bash
npm run dev
```

## 📦 Build

```bash
npm run build
```


# Portfolio CMS & Personal Website

A modern, high-performance personal portfolio website with a fully integrated Content Management System (CMS). Built with **React** and **Go**, designed for developers who want a premium showcase for their work.

## 🚀 Features

### 🎨 Public Portfolio

- **Modern Design**: Built with Tailwind CSS and Framer Motion for smooth animations.
- **Project Showcase**: Display your work with rich details, galleries, and outcomes.
- **Diary/Blog**: Share your thoughts with a built-in markdown-supported blog.
- **Professional Resume**: A dynamically generated resume section grouping experience and skills.
- **Social Integration**: Dynamic social media links managed via CMS.

### ⚡ Admin Dashboard (CMS)

- **Secure Authentication**: JWT-based login system.
- **Dashboard Overview**: Real-time statistics of your content.
- **Project Management**: Create, edit, and organize projects with a rich-text editor (Tiptap).
- **Diary Management**: Manage public/private entries.
- **Skill & Experience Control**: Update your resume details directly from the UI without code changes.
- **Social Link Management**: Add, edit, and toggle social media profiles with instant public updates.
- **Sidebar Layout**: A responsive experience optimized for desktop management.

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React Router v7](https://reactrouter.com/) (Framework Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Bundler**: [Vite](https://vitejs.dev/)

### Backend

- **Language**: [Go (Golang)](https://go.dev/)
- **Web Framework**: [CloudWeGo Hertz](https://www.cloudwego.io/docs/hertz/)
- **ORM**: [GORM](https://gorm.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18+)
- **Go** (v1.25+)
- **PostgreSQL** running locally

### 1. Database Setup

Create a PostgreSQL database (e.g., `portfolio_db`). The backend will automatically migrate the schema on first run.

### 2. Backend Setup

Navigate to the backend directory and start the server:

```bash
cd backend

# Install dependencies
go mod tidy

# Run the server (default port: 8888)
go run ./cmd/api/main.go
```

**Note**: Update `backend/config/config.yaml` or environment variables if your DB credentials differ.

### 3. Frontend Setup

Open a new terminal and start the React application:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your portfolio!
Visit `http://localhost:5173/cms` to access the Admin Dashboard.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

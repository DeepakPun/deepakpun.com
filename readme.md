# Deepak Pun - Portfolio Website 🚀

A modern, multi-service portfolio website showcasing my projects and skills as a Full-Stack Developer.

## 🌐 Live Website

<!-- **Main Portfolio:** [deepakpun.com](www.deepakpun.com) -->
**Main Portfolio:** <a href="http://www.deepakpun.com" target="_blank">deepakpun.com</a>

## 🏗️ Architecture

This portfolio consists of multiple services running in Docker containers:

### 🎯 Services

| Service             | Port | Description               | Technology            |
| ------------------- | ---- | ------------------------- | --------------------- |
| **Landing Page**    | 80   | Main portfolio website    | HTML, CSS, JavaScript |
| **UI Showcase**     | 3000 | Interactive UI components | React, Next.js        |
| **API Service**     | 3001 | Backend API endpoints     | Node.js, Express      |
| **Full-Stack Demo** | 3002 | Complete web application  | MERN Stack            |

### 🔧 Infrastructure

- **Hosting:** DigitalOcean Droplet (Ubuntu 22.04)
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Reverse Proxy:** Nginx
- **SSL:** Let's Encrypt (Certbot)

## 🚀 Features

- ✅ **Responsive Design** - Works on all devices
- ✅ **Modern UI/UX** - Clean, professional interface
- ✅ **Fast Loading** - Optimized performance
- ✅ **SEO Optimized** - Search engine friendly
- ✅ **Automated Deployment** - CI/CD pipeline
- ✅ **SSL Secured** - HTTPS encryption
- ✅ **Multi-Service Architecture** - Microservices approach

## 🛠️ Tech Stack

### Frontend

- **HTML5, CSS3, JavaScript**
- **React.js & Next.js**
- **Responsive Design**
- **Modern CSS Grid & Flexbox**

### Backend

- **Node.js & Express.js**
- **RESTful APIs**
- **MongoDB Integration**
- **Authentication & Security**

### DevOps

- **Docker & Docker Compose**
- **GitHub Actions CI/CD**
- **Nginx Reverse Proxy**
- **DigitalOcean Cloud Hosting**

## 📁 Project Structure

### Root Directory
- **README.md** - Project documentation
- **compose.yaml** - Docker Compose configuration
- **.gitignore** - Git ignore rules

### GitHub Actions (.github/workflows/)
- **deploy-portfolio.yml** - Main deployment workflow
- **test-and-build.yml** - Testing workflow  
- **manual-deploy.yml** - Manual deployment

### Landing Page (landing-page/)
- **index.html** - Homepage
- **styles/style.css** - Main stylesheet
- **scripts/main.js** - JavaScript functionality
- **Dockerfile** - Landing page container

### UI Showcase (ui/)
- **src/components/** - React components
- **src/pages/** - Page components
- **src/styles/** - Component styles
- **package.json** - Dependencies
- **next.config.js** - Next.js configuration
- **Dockerfile** - UI service container

### API Service (api/)
- **server.js** - Express server
- **routes/projects.js** - Projects API
- **routes/contact.js** - Contact form API
- **routes/health.js** - Health check
- **middleware/** - Custom middleware
- **package.json** - Dependencies
- **Dockerfile** - API service container

### Full-Stack Demo (full-stack/)
- **Node,Express,Mongo,EJS app**
- **Dockerfile** - Full-stack container

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeepakPun/deepakpun.com.git
   cd deepakpun.com
   ```

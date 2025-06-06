# ⚙️ EngineerFlow

EngineerFlow is a web application that manage engineering team assignments across projects. Monitor each engineer’s workload, track project involvement, and determine their availability for upcoming tasks.

---

## 🔑 Demo Login Credentials

### 👨‍💼 Manager Account
- **Email:** rajadavid03@gmail.com  
- **Password:** 1234

### 👷 Engineer Account
- **Email:** rja69100@gmail.com  
- **Password:** 1234

---

## 🚀 Features

### 🔐 Authentication & User Roles
- **Login System** with role-based access
- **Roles:**
  - **Manager:** Assign engineers, manage teams
  - **Engineer:** View personal assignments

### 📊 Dashboard Views
- **Manager Dashboard:** Team overview, workload analytics
- **Engineer Dashboard:** Personal assignments & future work


---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | React + TypeScript             |
| UI Library   | TailwindCSS                    |
| Forms        | React Hook Form                |
| State Mgmt   | Zustand                        |
| Backend      | Node.js with Express           |
| Database     | MongoDB                        |
| Auth         | JWT-based authentication       |
| API          | RESTful API                    |

---

## 📂 Folder Structure

engineering-resource-management/
├── client/                  
│   ├── public/             
│   └── src/                 
│       ├── components/      
│       ├── pages/          
│       ├── hooks/           
│       ├── store/           
│       ├── types/           
│       ├── utils/          
│       └── main.tsx         
├── server/                  
│   ├── config/         
│   ├── controllers/         
│   ├── models/              
│   ├── routes/                         
│   └── index.js             
├── README.md
           

## 🔧 Setup

### Prerequisites

- Node.js (v16+)
- MongoDB
- Required env file data
- npm

### Installation

```bash
git clone https://github.com/Raja28/Engineering-Resource-Management-System.git
npm i concurrently
npm install
npm run dev
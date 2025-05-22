<h1 align="center">🍣 Sushi Management Store</h1>

<p align="center">
  A full-stack multi-role sushi restaurant management platform — from customer experience to company-wide administration.
</p>
<div align="center">
  <img src="./Front-end/src/assets/background-website.png" alt="Sushi Management Store Banner" style="width:100%; max-width:800px;" />
</div>
<div align="center">
  <img src="https://img.shields.io/badge/ReactJS-18.x-blue?logo=react" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-teal?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=node.js" />
  <img src="https://img.shields.io/badge/SQL%20Server-2019-red?logo=microsoftsqlserver" />
</div>

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage Guide](#-usage-guide)
- [Contributing](#contributing)
- [Contact](#contact)
- [Usage Guide](#usage-guide)

---

## 📖 About the Project

**Sushi Management Store** is a full-stack restaurant management system designed for a sushi restaurant chain. It supports multiple user roles, including customers, employees, branch managers, and company managers — providing seamless operations, from ordering and invoicing to feedback and reporting.

---

## 🚀 Tech Stack

- **Frontend**: ReactJS, TailwindCSS, html2pdf.js  
- **Backend**: NodeJS (ExpressJS)  
- **Database**: Microsoft SQL Server  
- **Other Tools**: GitHub, Figma, VS Code

---

## ✅ Features

### 👤 Customer
- 🏠 Home: View featured dishes & promotions
- 🍣 Menu: Browse sushi menu with prices
- 📅 Booking: Reserve tables at preferred branches
- ℹ️ Introduce: Learn about store values
- 💬 Contact: Submit feedback or inquiries

### 🧑‍🍳 Employee
- 🏠 Dashboard: Access employee homepage
- 📝 Menu Management: Update menu items
- 📦 Orders: Fulfill customer orders
- 🧾 Invoices: Generate order invoices
- 📖 Guide: Learn store workflow

### 🧑‍💼 Branch Manager
- 🏠 Dashboard: Branch overview
- 📝 Menu: Control branch-specific dishes
- 👥 Customers: View user interactions
- 👩‍💼 Employees: Manage employee info
- 💬 Feedback: Handle customer opinions
- 📊 Reports: Generate branch reports

### 🏢 Company Manager
- 🏠 Dashboard: Global overview
- 📋 Menu: Control master menu
- 👥 Customers: Centralized customer data
- 🧑‍💼 Employees: Manage cross-branch staff
- 🏬 Branches: Administer all branches
- 💬 Feedback: Handle system-wide feedback
- 📊 Reports: Analyze system performance

---

## 🛠️ Installation

```bash
# Clone the project
git clone https://github.com/OriginalNVK/SushiSystemStoreManagement.git
cd SushiSystemStoreManagement

# Install Frontend
cd Front-end
npm install
npm install html2pdf.js
cd ..

# Install Backend
npm install
```

---

## 📝 Usage Guide

### 1. Start the Application

- **Backend:**
  1. Open a terminal in the `Back-end` folder.
  2. Run `npm install` (if not done before).
  3. Configure your database connection in `.env` (see `sample.env`).
  4. Run `node index.js` or `npm start` to start the backend server (default: http://localhost:3000).

- **Frontend:**
  1. Open a terminal in the `Front-end` folder.
  2. Run `npm install` (if not done before).
  3. Run `npm run dev` to start the frontend (default: http://localhost:5173).

### 2. User Roles & Main Features

- **Customer:**
  - Book tables and order dishes online, view menu, send feedback.
  - Register or log in to use all features.

- **Employee:**
  - Log in to confirm orders, generate invoices, and manage the menu.

- **Branch Manager:**
  - Manage employees, customers, menu, and view branch reports.

- **Company Manager:**
  - Manage the entire system, branches, employees, customers, and view overall reports.

### 3. Booking & Order Flow

- **Booking/Ordering:**
  1. Customers select branch, date, time, number of guests, and dishes.
  2. Click "Reserve Now" to submit the booking request.
  3. Orders will appear in the management page for staff to confirm.

- **Order Confirmation:**
  1. Employees log in and go to the Order Online/Offline page.
  2. Select a pending order and click "Confirm Order" to confirm and generate an invoice.

### 4. Notes

- Make sure SQL Server is running and all scripts in `Back-end/db/` have been imported.
- If you encounter connection errors, check your `.env` file and SQL Server configuration.
- To add sample data, use the scripts in the `db` folder.

---

## 🤝 Contributing

- Original NVK: Front-end + Support back-end
- Dang Huy:
- Viet Hoang:
- Viet Hung:
- Thanh Huy:

## Contact

For further inquiries or contributions:

Project Lead: Nhom13

GitHub Repository: https://github.com/OriginalNVK/SushiSystemStoreManagement.git

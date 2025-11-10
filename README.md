# 🧮 Stocky-API

**Stocky-API** is a simple Node.js + Express backend application that simulates a **user stock reward system**.  
It allows users to earn, store, and track their stock-based rewards, view daily and historical earnings, and calculate their overall portfolio value — all in real time using timezone-aware timestamps (IST).

---

## 🚀 Features

- 🎁 **Reward Management** — Add or update rewarded stocks for each user.  
- 📅 **Today's Rewards** — Fetch today's rewarded stocks for a specific user.  
- 💰 **Historical Rewards** — Calculate total INR value of past rewards (excluding today).  
- 📊 **Portfolio Stats** — Get total shares rewarded today and total INR value of the user's portfolio.  
- 🧾 **Portfolio Details** — View the value of each stock symbol in the user’s portfolio.  
- 👥 **User List** — Get all users with their stock rewards.

---

## 🧠 Tech Stack

- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **Moment-Timezone** – For managing and comparing timestamps in IST  

---

## 📂 Project Structure

```
stocky-api/
│
├── routes/
│   └── stockRouter.js        # Handles all reward and stats routes
│
├── Reward/
│   └── reward.js             # Stores reward data (in-memory)
│
├── server.js                 # Main entry point (Express app)
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/stocky-api.git
cd stocky-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the server
```bash
node server.js
```

The server will start on:  
👉 `http://localhost:3000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|:------:|:----------|:-------------|
| **POST** | `/reward` | Add or update rewarded stocks for a user |
| **GET** | `/today-stocks/:userId` | Get today's rewarded stocks for a user |
| **GET** | `/historical-inr/:userId` | Get total INR value of all past rewards |
| **GET** | `/stats/:userId` | Get today's total shares and portfolio INR value |
| **GET** | `/portfolio/:userId` | Get detailed stock value per symbol |
| **GET** | `/userlist` | View all users and their rewards |

---

## 🧾 Example Request

### ➕ Add a Reward
```bash
POST /reward
Content-Type: application/json
```
**Body:**
```json
{
  "userId": "U001",
  "stockSymbol": "TCS",
  "quantity": 5
}
```

**Response:**
```json
{
  "message": "Reward recorded",
  "userreward": [
    {
      "userId": "U001",
      "stockSymbol": "TCS",
      "quantity": 5,
      "single_stock_price": 240,
      "timestamp": "2025-11-10T12:45:23+05:30"
    }
  ]
}
```

---

## 🕓 Timezone Handling
All timestamps are stored in **Asia/Kolkata (IST)** using [`moment-timezone`](https://momentjs.com/timezone/).

---

## 🧑‍💻 Author
**Abhishek Mishra**  
Software Consultant at DarkHorse Digital Solution  
📧 [ysabhishekmishra@gmail.com](mailto:ysabhishekmishra@gmail.com)  
🌐 [Portfolio](https://ysabhishekmishra.netlify.app)  
💼 [LinkedIn](https://www.linkedin.com/in/abhishek-mishra-016b75218)

---

## 🏁 License
This project is licensed under the **MIT License** – feel free to use and modify it.

---

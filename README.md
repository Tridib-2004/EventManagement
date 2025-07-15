# 🎉 Event Management REST API

A RESTful API for managing events and user registrations, built with **Node.js**, **Express**, and **PostgreSQL**.

---

## 🚀 Features

- Create & view events
- User registration for events
- Prevent duplicate or past-event registrations
- Cancel user registration
- List upcoming events with custom sorting
- Get event statistics

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (Node PostgreSQL client)
- dotenv

---

## ⚙️ Setup Instructions

1. **Clone this repository**
   ```bash
   git clone https://github.com/your-username/event-management-api.git
   cd event-management-api
   Install dependencies

bash
Copy
Edit
npm install
2.Configure environment
Create a .env file in the root with:
PORT=5000
DB_USER=postgres
DB_PASSWORD=tridib8101
DB_HOST=localhost
DB_PORT=5432
DB_NAME=eventdb

3.Create tables
node data.js

4.Start the server
node app.js

##Example requests/responses
1.Create User
POST /users
{
  "name": "Alice",
  "email": "alice@example.com"
}
Response:
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
2.Events
$$Create Event
POST /events
{
  "title": "Node.js Workshop",
  "date": "2025-07-30T15:00:00Z",
  "location": "Kolkata",
  "capacity": 300
}
Response:
{
  "eventId": 1
}
3.Get Event Details (with registered users)
GET /events/:id

Response:
{
  "id": 1,
  "title": "Node.js Workshop",
  "date": "2025-07-30T15:00:00Z",
  "location": "Kolkata",
  "capacity": 300,
  "created_at": "2025-07-15T10:00:00Z",
  "registered_users": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    }
  ]
}

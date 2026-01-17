# Weather API with Redis Caching

A simple and efficient **Weather API** built using **Node.js**, **Express**, **Redis**, and a **3rd-party weather service (Visual Crossing API)**.  
This project demonstrates how to work with external APIs, caching, environment variables, and backend best practices.

---

## Features

- Fetches **real-time weather data** for a given city
- Uses **Redis in-memory caching** to reduce API calls
- Cache expiration set to **12 hours**
- Uses **environment variables** for security
- Includes **rate limiting** to prevent abuse
- Beginner-friendly backend project

---

## Tech Stack

- Node.js
- Express.js
- Redis
- Axios
- dotenv
- express-rate-limit
- Visual Crossing Weather API

---

## Project Structure

weatherapi/
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
├── README.md


> `.env` and `node_modules` are intentionally not pushed to GitHub.

---

## Setup Instructions (Run Locally)

### 1. Clone the repository:
```bash
git clone https://github.com/Jaiprathap26/weatherapi.git
cd weatherapi

2. Install dependencies:
```bash
npm install

3. Setup environment variables:
Create a .env file in the root directory:

PORT=3000
WEATHER_API_KEY=YOUR_VISUAL_CROSSING_API_KEY

Get a free API key from:
https://www.visualcrossing.com/weather-api

4. Make sure Redis is running:

Test Redis:
```bash
redis-cli ping

Expected output:
PONG

5. Start the server:
node index.js

Output:
Redis connected
Server running on port 3000

6.API Usage:

Get Weather by City:
```bash
GET /weather?city=Chennai

Example Request:
http://localhost:3000/weather?city=Chennai

Example Response (API call):
{
  "source": "api",
  "data": {
    "city": "Chennai",
    "temperature": 30.5,
    "condition": "Clear"
  }
}

Example Response (Cached):
{
  "source": "cache",
  "data": {
    "city": "Chennai",
    "temperature": 30.5,
    "condition": "Clear"
  }
}


How Caching Works:

1. User requests weather for a city
2. Server checks Redis cache
3. If data exists → returns cached response
4. If not → fetches from Visual Crossing API
5. Saves data in Redis with 12-hour TTL
6. Returns response to user
This improves performance and reduces external API usage.

Security & Best Practices:

1. API keys stored in .env file
2. .env and node_modules ignored using .gitignore
3. Rate limiting enabled (100 requests / 15 minutes per IP)
4. Error handling for invalid input and API failures


Rate Limiting:
100 requests per 15 minutes per IP

the project URL:
http://localhost:3000/weather.


Weather API with Redis Caching

A simple and efficient Weather API built using Node.js, Express, Redis, and a 3rd-party weather service (Visual Crossing API).
This project demonstrates how to work with external APIs, caching, environment variables, and basic backend best practices.

Features:

1.Fetches real-time weather data for a given city
2.Uses Redis in-memory caching to reduce API calls
3.Cache expiration set to 12 hours
4.Uses environment variables for security
5.Includes rate limiting to prevent abuse
6.Beginner-friendly and well-structured backend project

Tech Stack:

1.Node.js
2.Express.js
3.Redis
4.Axios
5.dotenv
6.express-rate-limit
7.Visual Crossing Weather API

weatherapi/
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
.env and node_modules are intentionally not pushed to GitHub.

Setup Instructions (Run Locally)

1.Clone the repository:
git clone https://github.com/Jaiprathap26/weatherapi.git
cd weatherapi

2.Install dependencies:
npm install

3.Setup environment variables:
Create a .env file in the root directory:

PORT=3000
WEATHER_API_KEY=YOUR_VISUAL_CROSSING_API_KEY

You can get a free API key from:
https://www.visualcrossing.com/weather-api

4.Make sure Redis is running:

Test Redis:
redis-cli ping
Expected output:
PONG

5.Start the server:

node index.js
Output:
Redis connected
Server running on port 3000

6.API Usage:

GET /weather?city=Chennai

Example Request:

http://localhost:3000/weather?city=Chennai

Example Response (API call)

{
  "source": "api",
  "data": {
    "city": "Chennai",
    "temperature": 30.5,
    "condition": "Clear"
  }
}

Example Response (Cached)

{
  "source": "cache",
  "data": {
    "city": "Chennai",
    "temperature": 30.5,
    "condition": "Clear"
  }
}

How Caching Works:

1.User requests weather for a city
2.Server checks Redis cache
3.If data exists → returns cached response
4.If not → fetches from Visual Crossing API
5.Saves data in Redis with 12-hour TTL
6.Returns response to user
This improves performance and reduces external API usage.

Security & Best Practices:

1.API keys stored in .env file
2..env and node_modules ignored using .gitignore
3.Rate limiting enabled (100 requests / 15 minutes per IP)
4.Error handling for invalid input and API failures

Rate Limiting:

The API uses rate limiting to prevent abuse:
100 requests per 15 minutes per IP







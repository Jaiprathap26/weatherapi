require("dotenv").config();

const express = require("express");
const app = express();

const PORT =process.env.PORT || 3000;

const redis = require("redis");

const redisClient = redis.createClient({
  url: "redis://localhost:6379"
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log("Redis connected"))
  .catch((err) => console.error("Redis connection error:", err));


//Root route
app.get("/", (req, res) => {
    res.send("Weather API is running");
});

const axios = require("axios");

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({
      error: "City query parameter is required"
    });
  }

  try {
    // 1️⃣ Check Redis cache
    const cachedData = await redisClient.get(city);

    if (cachedData) {
      return res.json({
        source: "cache",
        data: JSON.parse(cachedData)
      });
    }

    // 2️⃣ Call Weather API
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.WEATHER_API_KEY}`;
    const response = await axios.get(url);

    const weatherData = {
      city,
      temperature: response.data.currentConditions.temp,
      condition: response.data.currentConditions.conditions
    };

    // 3️⃣ Save result in Redis (12 hours)
    await redisClient.set(city, JSON.stringify(weatherData), {
      EX: 60 * 60 * 12
    });

    res.json({
      source: "api",
      data: weatherData
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Failed to fetch weather data"
    });
  }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



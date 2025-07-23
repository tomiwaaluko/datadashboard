import { useParams, Link } from "react-router-dom";
import { weatherData } from "../data/weatherData";

const getConditionEmoji = (condition) => {
  const emojiMap = {
    Sunny: "☀️",
    Cloudy: "☁️",
    Rainy: "🌧️",
    "Partly Cloudy": "⛅",
    Humid: "💧",
    Hot: "🔥",
    Snowy: "❄️",
    Tropical: "🌴",
    Clear: "🌤️",
    Overcast: "☁️",
    Desert: "🏜️",
    Cool: "🍂",
    Mild: "🌸",
    Windy: "💨",
  };
  return emojiMap[condition] || "🌡️";
};

const getUVLevel = (uvIndex) => {
  if (uvIndex <= 2) return { level: "Low", color: "#2ecc71" };
  if (uvIndex <= 5) return { level: "Moderate", color: "#f39c12" };
  if (uvIndex <= 7) return { level: "High", color: "#e67e22" };
  if (uvIndex <= 10) return { level: "Very High", color: "#e74c3c" };
  return { level: "Extreme", color: "#8e44ad" };
};

function DetailView() {
  const { id } = useParams();
  const cityData = weatherData.find((city) => city.id === parseInt(id));

  if (!cityData) {
    return (
      <div className="detail-container">
        <div className="detail-header">
          <Link to="/" className="back-button">
            ← Back to Dashboard
          </Link>
        </div>
        <div className="city-not-found">
          <h2>City not found</h2>
          <p>The weather data for this city could not be found.</p>
        </div>
      </div>
    );
  }

  const uvLevel = getUVLevel(cityData.uvIndex);

  return (
    <div className="detail-container">
      <div className="detail-header">
        <Link to="/" className="back-button">
          ← Back to Dashboard
        </Link>
        <div className="city-title">
          <h1>{cityData.name}</h1>
          <span className="region">{cityData.region}</span>
        </div>
      </div>

      <div className="detail-content">
        <div className="weather-hero">
          <div className="main-weather">
            <div className="condition-emoji">
              {getConditionEmoji(cityData.condition)}
            </div>
            <div className="temperature-display">
              <span className="main-temp">{cityData.temperature}°C</span>
              <span className="feels-like">
                Feels like {cityData.feelsLike}°C
              </span>
            </div>
            <div className="condition-text">{cityData.condition}</div>
          </div>
          <div className="weather-description">
            <p>{cityData.description}</p>
          </div>
        </div>

        <div className="weather-details-grid">
          <div className="detail-card">
            <div className="detail-icon">💧</div>
            <div className="detail-info">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{cityData.humidity}%</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">💨</div>
            <div className="detail-info">
              <span className="detail-label">Wind Speed</span>
              <span className="detail-value">{cityData.windSpeed} km/h</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">📊</div>
            <div className="detail-info">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{cityData.pressure} hPa</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">👁️</div>
            <div className="detail-info">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{cityData.visibility} km</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">🌅</div>
            <div className="detail-info">
              <span className="detail-label">Sunrise</span>
              <span className="detail-value">{cityData.sunrise}</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">🌇</div>
            <div className="detail-info">
              <span className="detail-label">Sunset</span>
              <span className="detail-value">{cityData.sunset}</span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">☀️</div>
            <div className="detail-info">
              <span className="detail-label">UV Index</span>
              <span
                className="detail-value uv-index"
                style={{ color: uvLevel.color }}
              >
                {cityData.uvIndex} ({uvLevel.level})
              </span>
            </div>
          </div>
        </div>

        <div className="additional-info">
          <h3>Weather Analysis</h3>
          <div className="analysis-grid">
            <div className="analysis-item">
              <h4>Comfort Level</h4>
              <p>
                {cityData.temperature >= 20 && cityData.temperature <= 25
                  ? "Perfect temperature for outdoor activities"
                  : cityData.temperature < 10
                  ? "Cold weather - dress warmly"
                  : cityData.temperature > 30
                  ? "Hot weather - stay hydrated"
                  : "Pleasant weather conditions"}
              </p>
            </div>

            <div className="analysis-item">
              <h4>Wind Conditions</h4>
              <p>
                {cityData.windSpeed < 10
                  ? "Light breeze - calm conditions"
                  : cityData.windSpeed < 20
                  ? "Moderate wind - pleasant for most activities"
                  : "Strong winds - be cautious outdoors"}
              </p>
            </div>

            <div className="analysis-item">
              <h4>Humidity Assessment</h4>
              <p>
                {cityData.humidity < 40
                  ? "Low humidity - dry conditions"
                  : cityData.humidity < 60
                  ? "Comfortable humidity levels"
                  : cityData.humidity < 80
                  ? "High humidity - may feel muggy"
                  : "Very high humidity - uncomfortable conditions"}
              </p>
            </div>
          </div>
        </div>

        <div className="weather-metrics">
          <h3>Detailed Metrics</h3>
          <div className="metrics-table">
            <div className="metric-row">
              <span className="metric-label">Current Temperature</span>
              <span className="metric-value">{cityData.temperature}°C</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Feels Like</span>
              <span className="metric-value">{cityData.feelsLike}°C</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Atmospheric Pressure</span>
              <span className="metric-value">{cityData.pressure} hPa</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Relative Humidity</span>
              <span className="metric-value">{cityData.humidity}%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Wind Speed</span>
              <span className="metric-value">{cityData.windSpeed} km/h</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Visibility Range</span>
              <span className="metric-value">{cityData.visibility} km</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">UV Index</span>
              <span className="metric-value" style={{ color: uvLevel.color }}>
                {cityData.uvIndex} ({uvLevel.level})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailView;

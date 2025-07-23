import { useState } from "react";
import { Link } from "react-router-dom";
import { weatherData } from "../data/weatherData";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Simulate API delay
    setTimeout(() => {
      const results = weatherData.filter(
        (city) =>
          city.name.toLowerCase().includes(query.toLowerCase()) ||
          city.region.toLowerCase().includes(query.toLowerCase()) ||
          city.condition.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>🔍 Search Weather Data</h1>
        <p>Find weather information for cities around the world</p>
      </div>

      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by city name, region, or weather condition..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input-large"
          />
          <div className="search-suggestions">
            <span>Try searching for: </span>
            <button
              onClick={() => handleSearch("Europe")}
              className="suggestion-btn"
            >
              Europe
            </button>
            <button
              onClick={() => handleSearch("Sunny")}
              className="suggestion-btn"
            >
              Sunny
            </button>
            <button
              onClick={() => handleSearch("Tokyo")}
              className="suggestion-btn"
            >
              Tokyo
            </button>
          </div>
        </div>

        {isSearching && (
          <div className="search-loading">
            <div className="loading-spinner"></div>
            <p>Searching...</p>
          </div>
        )}

        {!isSearching && searchQuery && (
          <div className="search-results">
            <h3>
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""}
              found for "{searchQuery}"
            </h3>

            {searchResults.length === 0 ? (
              <div className="no-results">
                <p>No cities match your search. Try different keywords.</p>
              </div>
            ) : (
              <div className="results-grid">
                {searchResults.map((city) => (
                  <Link
                    key={city.id}
                    to={`/detail/${city.id}`}
                    className="search-result-card"
                  >
                    <div className="result-header">
                      <h4>{city.name}</h4>
                      <span className="result-region">{city.region}</span>
                    </div>
                    <div className="result-content">
                      <div className="result-temp">{city.temperature}°C</div>
                      <div className="result-condition">{city.condition}</div>
                    </div>
                    <div className="result-details">
                      <span>Humidity: {city.humidity}%</span>
                      <span>Wind: {city.windSpeed} km/h</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {!searchQuery && !isSearching && (
          <div className="search-placeholder">
            <div className="placeholder-content">
              <h3>🌍 Explore Global Weather</h3>
              <p>
                Start typing to search through our database of{" "}
                {weatherData.length} cities worldwide. You can search by:
              </p>
              <ul>
                <li>🏙️ City name (e.g., "New York", "Tokyo")</li>
                <li>🌍 Region (e.g., "Europe", "Asia")</li>
                <li>🌤️ Weather condition (e.g., "Sunny", "Rainy")</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

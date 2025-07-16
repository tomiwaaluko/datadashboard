import { useState, useEffect } from "react";
import "./App.css";

// Sample weather data with more comprehensive information
const weatherData = [
  {
    id: 1,
    name: "New York",
    temperature: 22,
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    region: "North America",
    condition: "Sunny",
    visibility: 10,
  },
  {
    id: 2,
    name: "London",
    temperature: 15,
    humidity: 78,
    windSpeed: 8,
    pressure: 1020,
    region: "Europe",
    condition: "Cloudy",
    visibility: 8,
  },
  {
    id: 3,
    name: "Tokyo",
    temperature: 28,
    humidity: 70,
    windSpeed: 15,
    pressure: 1010,
    region: "Asia",
    condition: "Rainy",
    visibility: 6,
  },
  {
    id: 4,
    name: "Sydney",
    temperature: 20,
    humidity: 60,
    windSpeed: 18,
    pressure: 1015,
    region: "Australia",
    condition: "Partly Cloudy",
    visibility: 9,
  },
  {
    id: 5,
    name: "Paris",
    temperature: 18,
    humidity: 72,
    windSpeed: 10,
    pressure: 1018,
    region: "Europe",
    condition: "Sunny",
    visibility: 12,
  },
  {
    id: 6,
    name: "Mumbai",
    temperature: 32,
    humidity: 85,
    windSpeed: 6,
    pressure: 1008,
    region: "Asia",
    condition: "Humid",
    visibility: 5,
  },
  {
    id: 7,
    name: "Cairo",
    temperature: 35,
    humidity: 45,
    windSpeed: 14,
    pressure: 1012,
    region: "Africa",
    condition: "Hot",
    visibility: 15,
  },
  {
    id: 8,
    name: "Moscow",
    temperature: -5,
    humidity: 68,
    windSpeed: 22,
    pressure: 1025,
    region: "Europe",
    condition: "Snowy",
    visibility: 3,
  },
  {
    id: 9,
    name: "Rio de Janeiro",
    temperature: 26,
    humidity: 75,
    windSpeed: 9,
    pressure: 1011,
    region: "South America",
    condition: "Tropical",
    visibility: 11,
  },
  {
    id: 10,
    name: "Los Angeles",
    temperature: 24,
    humidity: 55,
    windSpeed: 11,
    pressure: 1016,
    region: "North America",
    condition: "Clear",
    visibility: 14,
  },
  {
    id: 11,
    name: "Berlin",
    temperature: 12,
    humidity: 80,
    windSpeed: 7,
    pressure: 1022,
    region: "Europe",
    condition: "Overcast",
    visibility: 7,
  },
  {
    id: 12,
    name: "Dubai",
    temperature: 38,
    humidity: 40,
    windSpeed: 16,
    pressure: 1009,
    region: "Asia",
    condition: "Desert",
    visibility: 20,
  },
  {
    id: 13,
    name: "Toronto",
    temperature: 8,
    humidity: 62,
    windSpeed: 13,
    pressure: 1019,
    region: "North America",
    condition: "Cool",
    visibility: 9,
  },
  {
    id: 14,
    name: "Seoul",
    temperature: 16,
    humidity: 73,
    windSpeed: 12,
    pressure: 1014,
    region: "Asia",
    condition: "Mild",
    visibility: 8,
  },
  {
    id: 15,
    name: "Cape Town",
    temperature: 19,
    humidity: 58,
    windSpeed: 20,
    pressure: 1017,
    region: "Africa",
    condition: "Windy",
    visibility: 13,
  },
];

// Simple Chart Component
const SimpleChart = ({ data, title, dataKey, color = "#667eea" }) => {
  const maxValue = Math.max(...data.map((item) => item[dataKey]));
  const minValue = Math.min(...data.map((item) => item[dataKey]));
  const range = maxValue - minValue;

  return (
    <div className="chart-container">
      <h4 className="chart-title">{title}</h4>
      <div className="chart">
        {data.slice(0, 10).map((item) => {
          const height =
            range > 0 ? ((item[dataKey] - minValue) / range) * 100 : 50;
          return (
            <div key={item.id} className="chart-bar-container">
              <div
                className="chart-bar"
                style={{
                  height: `${Math.max(height, 5)}%`,
                  backgroundColor: color,
                  opacity: 0.8,
                }}
              />
              <div className="chart-label">{item.name.split(" ")[0]}</div>
              <div className="chart-value">{item[dataKey]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Export functionality
const exportToCSV = (data, filename = "weather-data") => {
  const headers = [
    "City",
    "Temperature (°C)",
    "Humidity (%)",
    "Wind Speed (km/h)",
    "Pressure (hPa)",
    "Region",
    "Condition",
    "Visibility (km)",
  ];
  const csvContent = [
    headers.join(","),
    ...data.map((item) =>
      [
        item.name,
        item.temperature,
        item.humidity,
        item.windSpeed,
        item.pressure,
        item.region,
        item.condition,
        item.visibility,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [temperatureRange, setTemperatureRange] = useState({
    min: -50,
    max: 50,
  });
  const [selectedRegion, setSelectedRegion] = useState("");
  const [windSpeedRange, setWindSpeedRange] = useState({ min: 0, max: 100 });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showCharts, setShowCharts] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(weatherData);
        setLoading(false);
      } catch (error) {
        setError(`Failed to fetch weather data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // weatherData is static constant, so no need to include in dependencies

  // Filter and sort data
  const filteredData = data
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.condition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTemperature =
        item.temperature >= temperatureRange.min &&
        item.temperature <= temperatureRange.max;
      const matchesRegion = !selectedRegion || item.region === selectedRegion;
      const matchesWindSpeed =
        item.windSpeed >= windSpeedRange.min &&
        item.windSpeed <= windSpeedRange.max;
      const matchesConditions =
        selectedConditions.length === 0 ||
        selectedConditions.includes(item.condition);

      return (
        matchesSearch &&
        matchesTemperature &&
        matchesRegion &&
        matchesWindSpeed &&
        matchesConditions
      );
    })
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  // Calculate statistics
  const totalItems = data.length;
  const filteredItems = filteredData.length;
  const avgTemperature =
    data.length > 0
      ? data.reduce((sum, item) => sum + item.temperature, 0) / data.length
      : 0;
  const avgHumidity =
    data.length > 0
      ? data.reduce((sum, item) => sum + item.humidity, 0) / data.length
      : 0;
  const avgWindSpeed =
    data.length > 0
      ? data.reduce((sum, item) => sum + item.windSpeed, 0) / data.length
      : 0;
  const maxTemperature =
    data.length > 0 ? Math.max(...data.map((item) => item.temperature)) : 0;
  const minTemperature =
    data.length > 0 ? Math.min(...data.map((item) => item.temperature)) : 0;
  const mostCommonCondition = data.reduce((acc, item) => {
    acc[item.condition] = (acc[item.condition] || 0) + 1;
    return acc;
  }, {});
  const topCondition = Object.entries(mostCommonCondition).sort(
    ([, a], [, b]) => b - a
  )[0] || ["N/A", 0];

  const uniqueRegions = [...new Set(data.map((item) => item.region))];
  const uniqueConditions = [...new Set(data.map((item) => item.condition))];

  const handleConditionChange = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setTemperatureRange({ min: -50, max: 50 });
    setSelectedRegion("");
    setWindSpeedRange({ min: 0, max: 100 });
    setSelectedConditions([]);
    setSortBy("name");
    setSortOrder("asc");
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🌤️ Global Weather Dashboard</h1>
        <p>Real-time weather data from around the world</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Cities</h3>
          <div className="stat-value">{totalItems}</div>
        </div>
        <div className="stat-card">
          <h3>Filtered Results</h3>
          <div className="stat-value">{filteredItems}</div>
        </div>
        <div className="stat-card">
          <h3>Avg Temperature</h3>
          <div className="stat-value">{avgTemperature.toFixed(1)}°C</div>
        </div>
        <div className="stat-card">
          <h3>Avg Humidity</h3>
          <div className="stat-value">{avgHumidity.toFixed(1)}%</div>
        </div>
        <div className="stat-card">
          <h3>Avg Wind Speed</h3>
          <div className="stat-value">{avgWindSpeed.toFixed(1)} km/h</div>
        </div>
        <div className="stat-card">
          <h3>Temperature Range</h3>
          <div className="stat-value">
            {minTemperature}°C to {maxTemperature}°C
          </div>
        </div>
        <div className="stat-card">
          <h3>Most Common Condition</h3>
          <div className="stat-value">
            {topCondition[0]} ({topCondition[1]})
          </div>
        </div>
      </div>

      <div className="controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search cities or weather conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="control-buttons">
            <button onClick={clearAllFilters} className="clear-btn">
              Clear All Filters
            </button>
            <button
              onClick={() => setShowCharts(!showCharts)}
              className="chart-btn"
            >
              {showCharts ? "Hide Charts" : "Show Charts"}
            </button>
            <button
              onClick={() => exportToCSV(filteredData)}
              className="export-btn"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Region:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="filter-select"
            >
              <option value="">All Regions</option>
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Weather Conditions:</label>
            <div className="checkbox-group">
              {uniqueConditions.map((condition) => (
                <label key={condition} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(condition)}
                    onChange={() => handleConditionChange(condition)}
                    className="checkbox-input"
                  />
                  {condition}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>
              Temperature Range: {temperatureRange.min}°C to{" "}
              {temperatureRange.max}°C
            </label>
            <div className="range-inputs">
              <input
                type="range"
                min="-50"
                max="50"
                value={temperatureRange.min}
                onChange={(e) =>
                  setTemperatureRange({
                    ...temperatureRange,
                    min: parseInt(e.target.value),
                  })
                }
                className="range-slider"
              />
              <input
                type="range"
                min="-50"
                max="50"
                value={temperatureRange.max}
                onChange={(e) =>
                  setTemperatureRange({
                    ...temperatureRange,
                    max: parseInt(e.target.value),
                  })
                }
                className="range-slider"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>
              Wind Speed Range: {windSpeedRange.min} to {windSpeedRange.max}{" "}
              km/h
            </label>
            <div className="range-inputs">
              <input
                type="range"
                min="0"
                max="100"
                value={windSpeedRange.min}
                onChange={(e) =>
                  setWindSpeedRange({
                    ...windSpeedRange,
                    min: parseInt(e.target.value),
                  })
                }
                className="range-slider"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={windSpeedRange.max}
                onChange={(e) =>
                  setWindSpeedRange({
                    ...windSpeedRange,
                    max: parseInt(e.target.value),
                  })
                }
                className="range-slider"
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">City Name</option>
              <option value="temperature">Temperature</option>
              <option value="humidity">Humidity</option>
              <option value="windSpeed">Wind Speed</option>
              <option value="pressure">Pressure</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {showCharts && (
        <div className="charts-section">
          <div className="charts-grid">
            <SimpleChart
              data={filteredData}
              title="Temperature Distribution"
              dataKey="temperature"
              color="#ff6b6b"
            />
            <SimpleChart
              data={filteredData}
              title="Humidity Levels"
              dataKey="humidity"
              color="#4ecdc4"
            />
            <SimpleChart
              data={filteredData}
              title="Wind Speed"
              dataKey="windSpeed"
              color="#45b7d1"
            />
            <SimpleChart
              data={filteredData}
              title="Pressure Readings"
              dataKey="pressure"
              color="#96ceb4"
            />
          </div>
        </div>
      )}

      <div className="data-grid">
        {filteredData.map((item) => (
          <div key={item.id} className="data-card">
            <div className="card-header">
              <h3>{item.name}</h3>
              <span className="region-badge">{item.region}</span>
            </div>
            <div className="card-content">
              <div className="main-info">
                <div className="temperature">{item.temperature}°C</div>
                <div className="condition">{item.condition}</div>
              </div>
              <div className="details">
                <div className="detail-item">
                  <span className="label">Humidity:</span>
                  <span className="value">{item.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="label">Wind Speed:</span>
                  <span className="value">{item.windSpeed} km/h</span>
                </div>
                <div className="detail-item">
                  <span className="label">Pressure:</span>
                  <span className="value">{item.pressure} hPa</span>
                </div>
                <div className="detail-item">
                  <span className="label">Visibility:</span>
                  <span className="value">{item.visibility} km</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="no-results">
          <p>
            No cities match your current filters. Try adjusting your search
            criteria.
          </p>
        </div>
      )}

      <div className="charts-section">
        <h2>Weather Data Charts</h2>
        <div className="chart-controls">
          <button
            onClick={() => setShowCharts(!showCharts)}
            className="toggle-charts"
          >
            {showCharts ? "Hide Charts" : "Show Charts"}
          </button>
          <button
            onClick={() => exportToCSV(filteredData)}
            className="export-btn"
          >
            Export to CSV
          </button>
        </div>

        {showCharts && (
          <div className="charts-container">
            <SimpleChart
              data={filteredData}
              title="Temperature by City"
              dataKey="temperature"
            />
            <SimpleChart
              data={filteredData}
              title="Humidity by City"
              dataKey="humidity"
              color="#4caf50"
            />
            <SimpleChart
              data={filteredData}
              title="Wind Speed by City"
              dataKey="windSpeed"
              color="#ff9800"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { weatherData } from "../data/weatherData";

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

function Dashboard() {
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
    <div className="dashboard-container">
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

      <div className="charts-section">
        <h3 className="section-title">Data Visualizations</h3>
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

      <div className="data-grid">
        {filteredData.map((item) => (
          <Link
            key={item.id}
            to={`/detail/${item.id}`}
            className="data-card-link"
          >
            <div className="data-card">
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
              <div className="click-indicator">Click for more details →</div>
            </div>
          </Link>
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
    </div>
  );
}

export default Dashboard;

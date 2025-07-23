function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>ℹ️ About AstroDash</h1>
        <p>Your comprehensive global weather dashboard</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>🎯 Project Overview</h2>
          <p>
            AstroDash is a dynamic data dashboard that fetches weather data and
            provides advanced filtering, sorting, and visualization
            capabilities. Built with React and React Router, it demonstrates
            modern web development practices and interactive data presentation.
          </p>
        </div>

        <div className="about-section">
          <h2>✨ Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Interactive Dashboard</h3>
              <p>
                View comprehensive weather data from 15+ cities worldwide with
                real-time filtering and sorting capabilities.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>
                Search cities by name, region, or weather condition with instant
                results and suggestions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Data Visualization</h3>
              <p>
                Toggle between different chart views to visualize temperature,
                humidity, wind speed, and pressure data.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Detailed Views</h3>
              <p>
                Click on any city to access detailed weather information
                including UV index, sunrise/sunset times, and analysis.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>
                Optimized for all devices with a mobile-first approach ensuring
                great user experience everywhere.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📁</div>
              <h3>Data Export</h3>
              <p>
                Export filtered weather data as CSV files for further analysis
                and reporting.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>🛠️ Technologies Used</h2>
          <div className="tech-stack">
            <div className="tech-category">
              <h4>Frontend Framework</h4>
              <ul>
                <li>React 19.1.0</li>
                <li>React Router DOM</li>
                <li>JavaScript ES6+</li>
              </ul>
            </div>

            <div className="tech-category">
              <h4>Routing & Navigation</h4>
              <ul>
                <li>React Router for client-side routing</li>
                <li>Dynamic route parameters</li>
                <li>useParams hook for URL parameter extraction</li>
              </ul>
            </div>

            <div className="tech-category">
              <h4>State Management</h4>
              <ul>
                <li>React Hooks (useState, useEffect)</li>
                <li>Component-level state management</li>
                <li>Asynchronous data fetching</li>
              </ul>
            </div>

            <div className="tech-category">
              <h4>Build Tools</h4>
              <ul>
                <li>Vite for fast development</li>
                <li>ESLint for code quality</li>
                <li>Modern JavaScript bundling</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>📊 Data & Statistics</h2>
          <div className="stats-overview">
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">Continents</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12</div>
              <div className="stat-label">Weather Conditions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Data Points per City</div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>🎓 Learning Objectives</h2>
          <div className="objectives-list">
            <div className="objective">
              <span className="objective-icon">✅</span>
              <span>
                Use React Router to build navigation around the application
              </span>
            </div>
            <div className="objective">
              <span className="objective-icon">✅</span>
              <span>Use Link to dynamically generate a list of routes</span>
            </div>
            <div className="objective">
              <span className="objective-icon">✅</span>
              <span>Use useParams() hook to extract parameters from a URL</span>
            </div>
            <div className="objective">
              <span className="objective-icon">✅</span>
              <span>
                Install and integrate an npm library into an existing React app
              </span>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>👨‍💻 Developer</h2>
          <div className="developer-info">
            <p>
              <strong>Created by:</strong> Olatomiwa Aluko
              <br />
              <strong>Course:</strong> Web Development Project 5<br />
              <strong>Time Spent:</strong> 6+ hours
              <br />
              <strong>License:</strong> Apache License 2.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

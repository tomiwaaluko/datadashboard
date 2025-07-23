import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import DetailView from "./components/DetailView";
import Search from "./components/Search";
import About from "./components/About";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <header className="header">
          <h1>🌤️ Global Weather Dashboard</h1>
          <p>Real-time weather data from around the world</p>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/detail/:id" element={<DetailView />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

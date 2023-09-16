import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import ApprovePage from "./Pages/ApprovePage";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/approve" element={<ApprovePage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import ApprovePage from "./Pages/ApprovePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/overview" element={<HomePage />} /> */}
          <Route path="/create" element={<CreatePage />} />
          <Route path="/approve" element={<ApprovePage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;

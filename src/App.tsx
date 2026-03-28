import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import './App.css'
import ItineraryPage from "./pages/ItineraryPage";
import DiningPage from "./pages/DiningPage";
import InfoPage from "./pages/InfoPage";
import ToolsPage from "./pages/ToolsPage";


function App() {
  return (
    <HashRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/itinerary" replace />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/tools" element={<ToolsPage />} />
        </Routes>
      </AppLayout>
    </HashRouter>
  );
}

export default App;

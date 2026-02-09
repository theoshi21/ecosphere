import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { EnergyAnalysis } from './pages/EnergyAnalysis';
import { WasteCarbonAnalysis } from './pages/WasteCarbonAnalysis';
import { ClimateAwareness } from './pages/ClimateAwareness';
import { sampleEnergyData } from './data/sampleEnergyData';
import { sampleWasteData } from './data/sampleWasteData';
import { sampleClimateData } from './data/sampleClimateData';
import { sampleAcousticData } from './data/sampleAcousticData';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <OverviewDashboard 
                  energyData={sampleEnergyData}
                  wasteData={sampleWasteData}
                  climateData={sampleClimateData}
                />
              } 
            />
            <Route 
              path="/energy" 
              element={<EnergyAnalysis energyData={sampleEnergyData} />} 
            />
            <Route 
              path="/waste-carbon" 
              element={<WasteCarbonAnalysis wasteData={sampleWasteData} />} 
            />
            <Route 
              path="/climate" 
              element={
                <ClimateAwareness 
                  climateData={sampleClimateData} 
                  acousticData={sampleAcousticData}
                />
              } 
            />
            <Route 
              path="*" 
              element={
                <div className="not-found">
                  <h1>404 - Page Not Found</h1>
                  <p>The page you are looking for does not exist.</p>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useState } from 'react';
import { OverviewDashboard } from './OverviewDashboard';
import { EnergyAnalysis } from './EnergyAnalysis';
import { WasteCarbonAnalysis } from './WasteCarbonAnalysis';
import { ClimateAwareness } from './ClimateAwareness';
import { sampleEnergyData } from '../data/sampleEnergyData';
import { sampleWasteData } from '../data/sampleWasteData';
import { sampleClimateData } from '../data/sampleClimateData';

/**
 * Demo component to showcase all page components
 */
export function PagesDemo() {
  const [currentPage, setCurrentPage] = useState<
    'overview' | 'energy' | 'waste' | 'climate'
  >('overview');

  return (
    <div>
      <nav style={{ padding: '1rem', background: '#f5f5f5', marginBottom: '1rem' }}>
        <button
          onClick={() => setCurrentPage('overview')}
          style={{
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            fontWeight: currentPage === 'overview' ? 'bold' : 'normal',
          }}
        >
          Overview
        </button>
        <button
          onClick={() => setCurrentPage('energy')}
          style={{
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            fontWeight: currentPage === 'energy' ? 'bold' : 'normal',
          }}
        >
          Energy Analysis
        </button>
        <button
          onClick={() => setCurrentPage('waste')}
          style={{
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            fontWeight: currentPage === 'waste' ? 'bold' : 'normal',
          }}
        >
          Waste & Carbon
        </button>
        <button
          onClick={() => setCurrentPage('climate')}
          style={{
            padding: '0.5rem 1rem',
            fontWeight: currentPage === 'climate' ? 'bold' : 'normal',
          }}
        >
          Climate Awareness
        </button>
      </nav>

      {currentPage === 'overview' && (
        <OverviewDashboard
          energyData={sampleEnergyData}
          wasteData={sampleWasteData}
          climateData={sampleClimateData}
        />
      )}

      {currentPage === 'energy' && <EnergyAnalysis energyData={sampleEnergyData} />}

      {currentPage === 'waste' && (
        <WasteCarbonAnalysis wasteData={sampleWasteData} />
      )}

      {currentPage === 'climate' && (
        <ClimateAwareness climateData={sampleClimateData} />
      )}
    </div>
  );
}

import { EnergyModule } from './EnergyModule';
import { sampleEnergyData } from '../data/sampleEnergyData';

/**
 * Demo component to showcase the EnergyModule with sample data
 */
export function EnergyModuleDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Energy Module Demo</h1>
      <EnergyModule data={sampleEnergyData} />
    </div>
  );
}

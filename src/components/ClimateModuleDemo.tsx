import { ClimateModule } from './ClimateModule';
import { sampleClimateData } from '../data/sampleClimateData';
import { sampleAcousticData } from '../data/sampleAcousticData';

/**
 * Demo component to showcase the Climate_Module with sample data
 */
export function ClimateModuleDemo() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '24px', color: '#2E7D32' }}>
        Climate Module Demo
      </h1>
      <ClimateModule data={sampleClimateData} acousticData={sampleAcousticData} />
    </div>
  );
}

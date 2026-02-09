import { CarbonEstimator } from './CarbonEstimator';
import { sampleWasteData } from '../data/sampleWasteData';

/**
 * Demo component to showcase the CarbonEstimator component
 */
export function CarbonEstimatorDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Carbon Estimator Demo</h1>
      <CarbonEstimator data={sampleWasteData} />
    </div>
  );
}

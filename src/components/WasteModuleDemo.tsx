import { WasteModule } from './WasteModule';
import { sampleWasteData } from '../data/sampleWasteData';

/**
 * Demo component to showcase the WasteModule with sample data
 */
export function WasteModuleDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Waste Module Demo</h1>
      <WasteModule data={sampleWasteData} />
    </div>
  );
}

import { useMemo } from 'react';
import type { WasteData } from '../types';
import { estimateCarbonFootprint } from '../utils/calculations';
import './CarbonEstimator.css';

interface CarbonEstimatorProps {
  data: WasteData[];
}

/**
 * Carbon Estimator component that displays estimated carbon footprint
 * Calculates carbon footprint from waste data using fixed conversion factors
 */
export function CarbonEstimator({ data }: CarbonEstimatorProps) {
  // Calculate carbon footprint
  const carbonFootprint = useMemo(() => {
    return estimateCarbonFootprint(data);
  }, [data]);

  // Format carbon footprint with appropriate units
  const formattedCarbon = useMemo(() => {
    if (carbonFootprint < 1000) {
      return {
        value: carbonFootprint.toFixed(1),
        unit: (
          <>
            kg CO<sub>2</sub>e
          </>
        ),
      };
    } else {
      return {
        value: (carbonFootprint / 1000).toFixed(2),
        unit: (
          <>
            tonnes CO<sub>2</sub>e
          </>
        ),
      };
    }
  }, [carbonFootprint]);

  return (
    <div className="carbon-estimator">
      <div className="module-header">
        <h2>Carbon Footprint Estimate</h2>
      </div>

      <div className="carbon-display">
        <div className="carbon-value">
          {formattedCarbon.value} <span className="unit">{formattedCarbon.unit}</span>
        </div>
      </div>
    </div>
  );
}

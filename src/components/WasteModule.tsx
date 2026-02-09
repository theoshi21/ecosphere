import { useMemo } from 'react';
import type { WasteData } from '../types';
import { PieChart } from './PieChart';
import { generateWasteCompositionInsight } from '../utils/insights';
import './WasteModule.css';

interface WasteModuleProps {
  data: WasteData[];
}

/**
 * Waste Module component that displays waste composition visualizations and insights
 * Includes pie chart for waste composition and total waste summary
 */
export function WasteModule({ data }: WasteModuleProps) {
  // Prepare data for pie chart (waste composition by type)
  const pieChartData = useMemo(() => {
    const wasteByType: Record<string, number> = {};

    data.forEach((entry) => {
      if (!wasteByType[entry.type]) {
        wasteByType[entry.type] = 0;
      }
      wasteByType[entry.type] += entry.amount;
    });

    return Object.entries(wasteByType).map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  // Calculate total waste
  const totalWaste = useMemo(() => {
    return data.reduce((sum, entry) => sum + entry.amount, 0);
  }, [data]);

  // Generate insight about waste composition
  const insight = useMemo(() => {
    return generateWasteCompositionInsight(data);
  }, [data]);

  return (
    <div className="waste-module">
      <div className="module-header">
        <h2>Waste Management</h2>
      </div>

      <div className="insight-text">
        <p>{insight}</p>
      </div>

      <div className="summary-card">
        <h3>Total Waste Generated</h3>
        <div className="summary-value">
          {totalWaste.toFixed(0)} <span className="unit">kg</span>
        </div>
      </div>

      <div className="chart-section">
        <h3>Waste Composition</h3>
        <PieChart
          data={pieChartData}
          colors={['#4CAF50', '#FFC107', '#9E9E9E', '#F44336']}
          tooltipFormatter={(value) => `${value.toFixed(0)} kg`}
        />
      </div>
    </div>
  );
}

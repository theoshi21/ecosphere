import { useMemo } from 'react';
import type { EnergyData } from '../types';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { generateEnergyTrendInsight } from '../utils/insights';
import './EnergyModule.css';

interface EnergyModuleProps {
  data: EnergyData[];
}

/**
 * Energy Module component that displays energy consumption visualizations and insights
 * Includes line chart for trends over time and bar chart for monthly comparison
 */
export function EnergyModule({ data }: EnergyModuleProps) {
  // Prepare data for line chart (energy over time)
  const lineChartData = useMemo(() => {
    return data.map((entry) => ({
      date: entry.date,
      consumption: entry.consumption,
    }));
  }, [data]);

  // Prepare data for bar chart (monthly comparison)
  const barChartData = useMemo(() => {
    const monthlyData: Record<string, number> = {};

    data.forEach((entry) => {
      const month = entry.date.substring(0, 7); // Extract YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month] += entry.consumption;
    });

    return Object.entries(monthlyData).map(([month, consumption]) => ({
      month,
      consumption,
    }));
  }, [data]);

  // Generate insight by comparing first half and second half of data
  const insight = useMemo(() => {
    if (data.length < 2) {
      return 'Insufficient data for trend analysis.';
    }

    const midpoint = Math.floor(data.length / 2);
    const previousPeriod = data.slice(0, midpoint);
    const currentPeriod = data.slice(midpoint);

    return generateEnergyTrendInsight(currentPeriod, previousPeriod);
  }, [data]);

  return (
    <div className="energy-module">
      <div className="module-header">
        <h2>Energy Consumption</h2>
      </div>

      <div className="insight-text">
        <p>{insight}</p>
      </div>

      <div className="chart-section">
        <h3>Energy Over Time</h3>
        <LineChart
          data={lineChartData}
          xAxisKey="date"
          yAxisKey="consumption"
          lineColor="#2E7D32"
          tooltipFormatter={(value) => `${value.toFixed(0)} kWh`}
          yAxisLabel="Consumption (kWh)"
        />
      </div>

      <div className="chart-section">
        <h3>Monthly Comparison</h3>
        <BarChart
          data={barChartData}
          xAxisKey="month"
          yAxisKey="consumption"
          barColor="#66BB6A"
          tooltipFormatter={(value) => `${value.toFixed(0)} kWh`}
          yAxisLabel="Consumption (kWh)"
        />
      </div>
    </div>
  );
}

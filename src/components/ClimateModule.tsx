import { useMemo } from 'react';
import type { ClimateData, AcousticData } from '../types';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import { classifyHeatRisk, classifyAcousticLevel } from '../utils/calculations';
import './ClimateModule.css';

interface ClimateModuleProps {
  data: ClimateData[];
  acousticData?: AcousticData[];
}

/**
 * Climate Module component that displays climate indicators and visualizations
 * Includes temperature trends, optional rainfall data, heat risk classification, and optional acoustic data
 */
export function ClimateModule({ data, acousticData }: ClimateModuleProps) {
  // Prepare data for temperature line chart
  const temperatureChartData = useMemo(() => {
    return data.map((entry) => ({
      date: entry.date,
      temperature: entry.temperature,
    }));
  }, [data]);

  // Prepare data for rainfall bar chart (optional)
  const rainfallChartData = useMemo(() => {
    return data
      .filter((entry) => entry.rainfall !== undefined && entry.rainfall !== null)
      .map((entry) => ({
        date: entry.date,
        rainfall: entry.rainfall as number,
      }));
  }, [data]);

  // Calculate heat risk classification
  const heatRisk = useMemo(() => {
    return classifyHeatRisk(data);
  }, [data]);

  // Determine if we have rainfall data to display
  const hasRainfallData = rainfallChartData.length > 0;

  // Calculate acoustic metrics if acoustic data is provided
  const acousticMetrics = useMemo(() => {
    if (!acousticData || acousticData.length === 0) {
      return null;
    }

    // Calculate average decibel level
    let totalDecibels = 0;
    let validCount = 0;

    for (const data of acousticData) {
      if (typeof data.decibelLevel === 'number' && !isNaN(data.decibelLevel)) {
        totalDecibels += data.decibelLevel;
        validCount++;
      }
    }

    if (validCount === 0) {
      return null;
    }

    const averageDecibels = totalDecibels / validCount;
    const classification = classifyAcousticLevel(acousticData);

    return {
      averageDecibels,
      classification,
    };
  }, [acousticData]);

  return (
    <div className="climate-module">
      <div className="module-header">
        <h2>Climate Awareness</h2>
      </div>
      <div className="heat-risk-card">
        <h3>Heat Risk Classification</h3>
        <div className={`heat-risk-value heat-risk-${heatRisk.toLowerCase()}`}>
          {heatRisk}
        </div>
      </div>

      <div className="chart-section">
        <h3>Temperature Trends</h3>
        <LineChart
          data={temperatureChartData}
          xAxisKey="date"
          yAxisKey="temperature"
          lineColor="#FF6F00"
          tooltipFormatter={(value) => `${value.toFixed(1)}°C`}
          yAxisLabel="Temperature (°C)"
        />
      </div>

      {hasRainfallData && (
        <div className="chart-section">
          <h3>Rainfall</h3>
          <BarChart
            data={rainfallChartData}
            xAxisKey="date"
            yAxisKey="rainfall"
            barColor="#1976D2"
            tooltipFormatter={(value) => `${value.toFixed(1)} mm`}
            yAxisLabel="Rainfall (mm)"
          />
        </div>
      )}

      {acousticMetrics && (
        <div className="acoustic-section">
          <div className="acoustic-header">
            <h3>Acoustic Awareness</h3>
          </div>
          <div className="acoustic-metrics">
            <div className="acoustic-metric-card">
              <h4>Average Decibel Level</h4>
              <div className="acoustic-value">
                {acousticMetrics.averageDecibels.toFixed(1)} dB
              </div>
            </div>
            <div className="acoustic-metric-card">
              <h4>Acoustic Level Classification</h4>
              <div className={`acoustic-classification acoustic-${acousticMetrics.classification.toLowerCase()}`}>
                {acousticMetrics.classification}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

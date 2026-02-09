import { useMemo } from 'react';
import type { EnergyData, WasteData, ClimateData, SummaryMetrics } from '../types';
import { LineChart } from '../components/LineChart';
import {
  calculatePercentageChange,
  estimateCarbonFootprint,
  classifyHeatRisk,
  identifyDominantWasteCategory,
} from '../utils/calculations';
import './OverviewDashboard.css';

interface OverviewDashboardProps {
  energyData: EnergyData[];
  wasteData: WasteData[];
  climateData: ClimateData[];
}

/**
 * Overview Dashboard page component
 * Displays summary cards and combined trend visualization for all metrics
 */
export function OverviewDashboard({
  energyData,
  wasteData,
  climateData,
}: OverviewDashboardProps) {
  // Calculate summary metrics
  const summaryMetrics = useMemo((): SummaryMetrics => {
    // Total energy consumption
    const totalEnergy = energyData.reduce(
      (sum, entry) => sum + entry.consumption,
      0
    );

    // Total waste generated
    const totalWaste = wasteData.reduce((sum, entry) => sum + entry.amount, 0);

    // Carbon footprint estimate
    const carbonFootprint = estimateCarbonFootprint(wasteData);

    // Heat risk classification
    const heatRisk = classifyHeatRisk(climateData);

    // Energy trend (compare first half vs second half)
    let energyTrend = 0;
    if (energyData.length >= 2) {
      const midpoint = Math.floor(energyData.length / 2);
      const previousPeriod = energyData.slice(0, midpoint);
      const currentPeriod = energyData.slice(midpoint);

      const previousTotal = previousPeriod.reduce(
        (sum, entry) => sum + entry.consumption,
        0
      );
      const currentTotal = currentPeriod.reduce(
        (sum, entry) => sum + entry.consumption,
        0
      );

      energyTrend = calculatePercentageChange(previousTotal, currentTotal);
    }

    // Dominant waste type
    const dominantWasteType = identifyDominantWasteCategory(wasteData);

    return {
      totalEnergy,
      totalWaste,
      carbonFootprint,
      heatRisk,
      energyTrend,
      dominantWasteType,
    };
  }, [energyData, wasteData, climateData]);

  // Prepare combined trend data for visualization
  const combinedTrendData = useMemo(() => {
    // Group energy data by month
    const monthlyEnergy: Record<string, number> = {};
    energyData.forEach((entry) => {
      const month = entry.date.substring(0, 7); // Extract YYYY-MM
      if (!monthlyEnergy[month]) {
        monthlyEnergy[month] = 0;
      }
      monthlyEnergy[month] += entry.consumption;
    });

    // Group waste data by month
    const monthlyWaste: Record<string, number> = {};
    wasteData.forEach((entry) => {
      const month = entry.date.substring(0, 7);
      if (!monthlyWaste[month]) {
        monthlyWaste[month] = 0;
      }
      monthlyWaste[month] += entry.amount;
    });

    // Combine into single dataset
    const allMonths = new Set([
      ...Object.keys(monthlyEnergy),
      ...Object.keys(monthlyWaste),
    ]);

    return Array.from(allMonths)
      .sort()
      .map((month) => ({
        month,
        energy: monthlyEnergy[month] || 0,
        waste: monthlyWaste[month] || 0,
      }));
  }, [energyData, wasteData]);

  // Format carbon footprint for display
  const formattedCarbon = useMemo(() => {
    if (summaryMetrics.carbonFootprint < 1000) {
      return `${summaryMetrics.carbonFootprint.toFixed(1)} kg CO2e`;
    } else {
      return `${(summaryMetrics.carbonFootprint / 1000).toFixed(2)} tonnes CO2e`;
    }
  }, [summaryMetrics.carbonFootprint]);

  return (
    <div className="overview-dashboard">
      <div className="page-header">
        <h1>EcoSphere+ Campus Edition</h1>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Energy</h3>
          <div className="summary-value">
            {summaryMetrics.totalEnergy.toFixed(0)}{' '}
            <span className="unit">kWh</span>
          </div>
          <div className="summary-trend">
            {summaryMetrics.energyTrend > 0 ? '↑' : '↓'}{' '}
            {Math.abs(summaryMetrics.energyTrend).toFixed(1)}%
          </div>
        </div>

        <div className="summary-card">
          <h3>Total Waste</h3>
          <div className="summary-value">
            {summaryMetrics.totalWaste.toFixed(0)}{' '}
            <span className="unit">kg</span>
          </div>
          <div className="summary-detail">
            Dominant: {summaryMetrics.dominantWasteType}
          </div>
        </div>

        <div className="summary-card">
          <h3>Carbon Footprint</h3>
          <div className="summary-value">{formattedCarbon}</div>
          <div className="summary-disclaimer">Estimated</div>
        </div>

        <div className="summary-card">
          <h3>Heat Risk</h3>
          <div
            className={`summary-value heat-risk-${summaryMetrics.heatRisk.toLowerCase()}`}
          >
            {summaryMetrics.heatRisk}
          </div>
          <div className="summary-disclaimer">For awareness</div>
        </div>
      </div>

      <div className="combined-trends">
        <h2>Combined Trends</h2>
        <LineChart
          data={combinedTrendData}
          xAxisKey="month"
          yAxisKey="energy"
          lineColor="#2E7D32"
          tooltipFormatter={(value) => `${value.toFixed(0)} kWh`}
          yAxisLabel="Energy (kWh) / Waste (kg)"
        />
      </div>
    </div>
  );
}

/**
 * Data type definitions for EcoSphere+ Campus Edition Dashboard
 */

/**
 * Energy consumption data for a specific date
 * @property date - ISO 8601 date string (YYYY-MM-DD)
 * @property consumption - Energy consumption in kWh
 * @property category - Optional building category (e.g., "Academic", "Residential", "Administrative")
 */
export interface EnergyData {
  date: string;
  consumption: number;
  category?: string;
}

/**
 * Waste generation data for a specific date
 * @property date - ISO 8601 date string (YYYY-MM-DD)
 * @property type - Type of waste (e.g., "Recyclable", "Compostable", "Landfill")
 * @property amount - Amount of waste in kilograms
 */
export interface WasteData {
  date: string;
  type: string;
  amount: number;
}

/**
 * Climate data for a specific date
 * @property date - ISO 8601 date string (YYYY-MM-DD)
 * @property temperature - Temperature in degrees Celsius
 * @property rainfall - Optional rainfall in millimeters
 */
export interface ClimateData {
  date: string;
  temperature: number;
  rainfall?: number;
}

/**
 * Acoustic data for a specific date
 * @property date - ISO 8601 date string (YYYY-MM-DD)
 * @property decibelLevel - Average decibel level (dB)
 */
export interface AcousticData {
  date: string;
  decibelLevel: number;
}

/**
 * Time range filter for data queries
 * @property startDate - Start date in ISO 8601 format (YYYY-MM-DD)
 * @property endDate - End date in ISO 8601 format (YYYY-MM-DD)
 */
export interface TimeRange {
  startDate: string;
  endDate: string;
}

/**
 * Filter state for dashboard data filtering
 * @property timeRange - Optional time range filter
 * @property category - Optional category filter for energy data
 * @property wasteType - Optional waste type filter for waste data
 */
export interface FilterState {
  timeRange?: TimeRange;
  category?: string;
  wasteType?: string;
}

/**
 * Summary metrics for the overview dashboard
 * @property totalEnergy - Total energy consumption in kWh
 * @property totalWaste - Total waste generated in kg
 * @property carbonFootprint - Estimated carbon footprint in kg CO2e
 * @property heatRisk - Heat risk classification ("Low", "Moderate", "High")
 * @property energyTrend - Percentage change in energy consumption
 * @property dominantWasteType - Most common waste type
 */
export interface SummaryMetrics {
  totalEnergy: number;
  totalWaste: number;
  carbonFootprint: number;
  heatRisk: string;
  energyTrend: number;
  dominantWasteType: string;
}

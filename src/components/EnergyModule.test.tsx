import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EnergyModule } from './EnergyModule';
import type { EnergyData } from '../types';

describe('EnergyModule', () => {
  const sampleData: EnergyData[] = [
    { date: '2025-01-01', consumption: 1000, category: 'Academic' },
    { date: '2025-01-15', consumption: 1100, category: 'Residential' },
    { date: '2025-02-01', consumption: 1200, category: 'Academic' },
    { date: '2025-02-15', consumption: 1300, category: 'Administrative' },
  ];

  it('renders the module with title', () => {
    render(<EnergyModule data={sampleData} />);
    expect(screen.getByText('Energy Consumption')).toBeInTheDocument();
  });

  it('displays the prototype label', () => {
    render(<EnergyModule data={sampleData} />);
    expect(screen.getByText('Prototype / Demonstration Data')).toBeInTheDocument();
  });

  it('displays insight text', () => {
    render(<EnergyModule data={sampleData} />);
    const insightElement = screen.getByText(/increased by|decreased by|remained stable/i);
    expect(insightElement).toBeInTheDocument();
  });

  it('renders chart section titles', () => {
    render(<EnergyModule data={sampleData} />);
    expect(screen.getByText('Energy Over Time')).toBeInTheDocument();
    expect(screen.getByText('Monthly Comparison')).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    render(<EnergyModule data={[]} />);
    expect(screen.getByText('Energy Consumption')).toBeInTheDocument();
    expect(screen.getByText('Insufficient data for trend analysis.')).toBeInTheDocument();
  });
});

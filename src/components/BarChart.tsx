import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface BarChartProps {
  data: Array<{ [key: string]: string | number }>;
  xAxisKey: string;
  yAxisKey: string;
  barColor?: string;
  tooltipFormatter?: (value: number) => string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export function BarChart({
  data,
  xAxisKey,
  yAxisKey,
  barColor = '#66BB6A',
  tooltipFormatter,
  xAxisLabel,
  yAxisLabel,
}: BarChartProps) {
  const defaultTooltipFormatter = (value: number) => value.toFixed(2);
  const formatter = tooltipFormatter || defaultTooltipFormatter;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          dataKey={xAxisKey}
          label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined}
          stroke="#757575"
        />
        <YAxis
          label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
          stroke="#757575"
        />
        <Tooltip
          formatter={(value) => (typeof value === 'number' ? formatter(value) : value)}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
          }}
        />
        <Legend />
        <Bar dataKey={yAxisKey} fill={barColor} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

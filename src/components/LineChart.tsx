import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface LineChartProps {
  data: Array<{ [key: string]: string | number }>;
  xAxisKey: string;
  yAxisKey: string;
  lineColor?: string;
  tooltipFormatter?: (value: number) => string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export function LineChart({
  data,
  xAxisKey,
  yAxisKey,
  lineColor = '#2E7D32',
  tooltipFormatter,
  xAxisLabel,
  yAxisLabel,
}: LineChartProps) {
  const defaultTooltipFormatter = (value: number) => value.toFixed(2);
  const formatter = tooltipFormatter || defaultTooltipFormatter;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart
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
        <Line
          type="monotone"
          dataKey={yAxisKey}
          stroke={lineColor}
          strokeWidth={2}
          dot={{ fill: lineColor, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

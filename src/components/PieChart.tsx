import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  tooltipFormatter?: (value: number) => string;
}

const DEFAULT_COLORS = ['#F44336', '#FFC107', '#4CAF50', '#9E9E9E'];

export function PieChart({
  data,
  colors = DEFAULT_COLORS,
  tooltipFormatter,
}: PieChartProps) {
  const defaultTooltipFormatter = (value: number) => value.toFixed(2);
  const formatter = tooltipFormatter || defaultTooltipFormatter;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => (typeof value === 'number' ? formatter(value) : value)}
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
          }}
        />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

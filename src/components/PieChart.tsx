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
    <ResponsiveContainer width="100%" height={350}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          labelLine={true}
          label={({ name, percent }) => {
            const percentage = ((percent ?? 0) * 100).toFixed(0);
            return percentage !== '0' ? `${name}: ${percentage}%` : '';
          }}
          outerRadius={90}
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
        <Legend 
          verticalAlign="bottom" 
          height={36}
          wrapperStyle={{ paddingTop: '20px' }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

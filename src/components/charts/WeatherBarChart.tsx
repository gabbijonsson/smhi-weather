import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

type WeatherBarChartProps<T> = {
  data: Array<T>;
  yAxisLabel: string;
  xAxisKey: keyof T;
  yAxisKey: keyof T;
  barColor: string;
  domain: [number, number];
};

export default function WeatherBarChart<T>({
  data,
  yAxisLabel,
  xAxisKey,
  yAxisKey,
  barColor,
  domain,
}: WeatherBarChartProps<T>) {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey as string} />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideBottomLeft",
              offset: 15,
            }}
            domain={domain}
          />
          <Tooltip />
          <Bar dataKey={yAxisKey as string} fill={barColor} name={yAxisLabel} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

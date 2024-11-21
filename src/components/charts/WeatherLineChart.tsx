import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

type WeatherLineChartProps<T> = {
  data: Array<T>;
  chartConfig: ChartConfig;
  yAxisLabel: string;
  xAxisKey: keyof T;
  yAxisKey: keyof T;
  legend: string;
  domain: [number, number];
};

export default function WeatherLineChart<T>({
  data,
  chartConfig,
  yAxisLabel,
  xAxisKey,
  yAxisKey,
  legend,
  domain,
}: WeatherLineChartProps<T>) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 0,
          right: 24,
        }}
      >
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey={xAxisKey as string}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval="preserveStartEnd"
        />
        <YAxis
          label={{
            value: yAxisLabel,
            angle: -90,
            position: "insideBottomLeft",
            offset: 15,
          }}
          domain={domain}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Tooltip />
        <Legend />
        <Line
          dataKey={yAxisKey as string}
          type="natural"
          stroke="var(--color-value)"
          strokeWidth={2}
          dot={false}
          name={legend}
        />
      </LineChart>
    </ChartContainer>
  );
}

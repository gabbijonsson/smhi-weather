import { Wind } from "lucide-react";
import { ChartConfig, ChartContainer } from "../ui/chart";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Tooltip,
  Legend,
} from "recharts";
import WeatherCard from "./WeatherCard";
import { useCity } from "@/CityDataContext";
import useWeather from "@/hooks/useWeather";

const chartConfig = {
  wind: {
    label: "Wind",
    color: "hsl(var(--chart-1))",
  },
  gust: {
    label: "Gust",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function WindCard() {
  const { selectedCityLocation } = useCity();
  // TODO: Handle errors
  const { windSpeed, gust, error, isLoading } =
    useWeather(selectedCityLocation);

  const data = windSpeed?.map((wind) => {
    const gustEntry = gust?.find((g) => g.time === wind.time);
    return {
      time: wind.time,
      windSpeed: wind.windSpeed,
      gustSpeed: gustEntry ? gustEntry.gustSpeed : null,
    };
  });

  return (
    <WeatherCard
      loading={isLoading}
      cardTitle="Wind"
      Icon={() => <Wind className="h-4 w-4 text-muted-foreground" />}
    >
      {/* TODO: Check if we have data and show a "no data"-card if not */}
      <ChartContainer config={chartConfig}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="windSpeed"
            stroke="#8884d8"
            name="Wind Speed (km/h)"
          />
          <Line
            type="monotone"
            dataKey="gustSpeed"
            stroke="#82ca9d"
            name="Wind Gust (km/h)"
          />
        </LineChart>
      </ChartContainer>
    </WeatherCard>
  );
}
